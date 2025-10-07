import { getEnvVar } from "../utils/common";

export interface ILangChain {
  MODEL: string;
  EMBEDDING_MODEL: string;
}

export const LangChain = {
  MODEL: getEnvVar("LANGCHAIN_MODEL", "default_model"),
  EMBEDDING_MODEL: getEnvVar(
    "LANGCHAIN_EMBEDDING_MODEL",
    "default_embedding_model"
  ),
};
