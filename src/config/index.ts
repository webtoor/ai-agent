import { getEnvVar, getEnvVarNumber } from "../utils/common";
import { IAIAgent, AIAgent } from "./ai.agent";
import { Database, IDatabase } from "./database";
import { ILangChain, LangChain } from "./langchain";
import { ILlamaIndex, LlamaIndex } from "./llamaindex";
import { IOpenAI, OpenAI } from "./openai";

export interface Config {
  AppName: string;
  AppEnvironment: string;
  AppDebug: boolean;
  AppPort: number;
  AppLogLevel: string;
  Database: IDatabase;
  LangChain: ILangChain;
  OpenAI: IOpenAI;
  LlamaIndex: ILlamaIndex;
  AIAgent: IAIAgent;
}

export function ReadConfig(): Config {
  return {
    AppName: getEnvVar("APP_NAME", "default_app_name"),
    AppEnvironment: getEnvVar("APP_ENVIRONMENT", "development"),
    AppDebug: Bun.env.APP_DEBUG?.toLocaleLowerCase() === "true",
    AppPort: getEnvVarNumber("APP_PORT", 3000),
    AppLogLevel: getEnvVar("APP_LOG_LEVEL", "info"),
    Database: Database,
    LangChain: LangChain,
    OpenAI: OpenAI,
    LlamaIndex: LlamaIndex,
    AIAgent: AIAgent,
  };
}
