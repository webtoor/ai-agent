import { IAgentService } from "./contract";
import { Context } from "hono";
import { AppCtxResponse, ResponseBuilder } from "../applications/response";
import * as logger from "../utils/logger";
import { Config } from "../config";
import { PgDatabase } from "../infrastructure/database";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import * as schema from "../schema";
import { StatusCodes } from "http-status-codes";
import { AgentAskRequest } from "../presentations/agent";
import { sql } from "drizzle-orm";
import { AgentPayload, setAgentStrategy } from "../agents/strategies/agent";
import { AgentType } from "../constants/agent";

export class AgentService implements IAgentService {
  constructor(private cfg: Config, private db: PgDatabase) {}
  async chat(ctx: Context, params: AgentAskRequest): Promise<AppCtxResponse> {
    let fields = new logger.Fields(
      logger.EventName("AgentService.chat"),
      logger.Any("param.question", params.question)
    );
    try {
      const openaiEmbed = new OpenAIEmbeddings({
        openAIApiKey: this.cfg.OpenAI.API_KEY,
        model: this.cfg.LangChain.EMBEDDING_MODEL,
      });

      const queryEmbedding: number[] = await openaiEmbed.embedQuery(
        params.question
      );

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

      const context = similarDocs
        .map((doc) => doc.chunk_content)
        .join("\n\n---\n\n");

      const strategy = setAgentStrategy(AgentType.CUSTOMER_SERVICE);

      const payload: AgentPayload = {
        question: params.question,
        tone: "friendly",
        personality: "friendly",
        content: context,
      };

      const prompt = await strategy.handle(payload);

      const openaiChat = new ChatOpenAI({
        apiKey: this.cfg.OpenAI.API_KEY,
        model: this.cfg.LangChain.MODEL,
        maxCompletionTokens: this.cfg.OpenAI.MAX_TOKEN_OUTPUT,
      });

      const response = await openaiChat.invoke([
        new SystemMessage(prompt),
        new HumanMessage(params.question),
      ]);

      logger.Info("answer successfully", fields);

      return new ResponseBuilder()
        .withCode(StatusCodes.OK)
        .withMessage("Success")
        .withData({
          answer: response.content,
        })
        .build();
    } catch (error) {
      logger.Error(`error: ${error}`, fields);
      throw error;
    }
  }
}
