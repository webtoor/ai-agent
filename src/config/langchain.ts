import { getEnvVar } from "../utils/common";

export interface ILangChain {
  MODEL: string;
}

export const LangChain = {
  MODEL: getEnvVar("LANGCHAIN_MODEL", "default_model"),
};
