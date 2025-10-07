import { IAgentService } from "./contract";
import { Context } from "hono";
import { AppCtxResponse, ResponseBuilder } from "../applications/response";
import * as logger from "../utils/logger";
import { Config } from "../config";
import { PgDatabase } from "../infrastructure/database";
import { LlamaParseReader } from "llama-cloud-services";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import * as schema from "../schema";
import { StatusCodes } from "http-status-codes";
import { AgentAskRequest } from "../presentations/agent";
import { sql } from "drizzle-orm";

export class AgentService implements IAgentService {
  constructor(private cfg: Config, private db: PgDatabase) {}
  async chat(ctx: Context, params: AgentAskRequest): Promise<AppCtxResponse> {
    let fields = new logger.Fields(
      logger.EventName("AgentService.chat"),
      logger.Any("param.question", params.question)
    );
    try {
      const openai = new OpenAIEmbeddings({
        openAIApiKey: this.cfg.OpenAI.API_KEY,
        model: "text-embedding-3-small",
      });

      const queryEmbedding: number[] = await openai.embedQuery(params.question);

      const vector: string = `[${queryEmbedding.join(",")}]`;

      const result = await this.db.execute(
        sql`
          SELECT id, chunk_content, embedding <=> ${vector} AS distance
          FROM ${schema.documents}
          ORDER BY distance
          LIMIT 2;
          `
      );

      const similarDocs = result.rows;

      return new ResponseBuilder()
        .withCode(StatusCodes.OK)
        .withMessage("Success")
        .withData({ similarDocs })
        .build();
    } catch (error) {
      logger.Error(`error: ${error}`, fields);
      throw error;
    }
  }
}
