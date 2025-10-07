import { IDocumentService } from "./contract";
import { Context } from "hono";
import { AppCtxResponse, ResponseBuilder } from "../applications/response";
import { UploadDocumentRequest } from "../presentations/document";
import * as logger from "../utils/logger";
import { Config } from "../config";
import { PgDatabase } from "../infrastructure/database";
import { LlamaParseReader } from "llama-cloud-services";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import * as schema from "../schema";
import { StatusCodes } from "http-status-codes";

export class DocumentService implements IDocumentService {
  constructor(private cfg: Config, private db: PgDatabase) {}
  async upload(
    ctx: Context,
    params: UploadDocumentRequest
  ): Promise<AppCtxResponse> {
    let fields = new logger.Fields(logger.EventName("DocumentService.upload"));
    try {
      await this.db.delete(schema.documents);
      const buffer = Buffer.from(await params.file.arrayBuffer());

      const parser = new LlamaParseReader({
        apiKey: this.cfg.LlamaIndex.API_KEY,
        resultType: "markdown",
        verbose: true,
      });

      const data = await parser.loadDataAsContent(buffer);

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const textData = data.map((d) => d.getText());
      const documents = await splitter.createDocuments(textData);

      const texts = documents
        .map((doc) => doc.pageContent.trim())
        .filter(Boolean);

      const embeddings = await new OpenAIEmbeddings({
        openAIApiKey: this.cfg.OpenAI.API_KEY,
        model: this.cfg.LangChain.EMBEDDING_MODEL,
      }).embedDocuments(texts);

      const records = texts.map((text, i) => ({
        chunkIndex: i,
        chunkContent: text,
        embedding: embeddings[i],
      }));

      await this.db.transaction(async (tx) => {
        await tx.insert(schema.documents).values(records);
      });

      logger.Info("documents upload successfully", fields);

      return new ResponseBuilder()
        .withCode(StatusCodes.OK)
        .withMessage("Documents uploaded successfully")
        .build();
    } catch (error) {
      logger.Error(`error: ${error}`, fields);
      throw error;
    }
  }
}
