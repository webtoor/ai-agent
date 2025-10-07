import { getEnvVar, getEnvVarNumber } from "../utils/common";

export interface IOpenAI {
  API_KEY: string;
  MAX_TOKEN_OUTPUT: number;
}

export const OpenAI = {
  API_KEY: getEnvVar("OPENAI_API_KEY", "default_openai_api_key"),
  MAX_TOKEN_OUTPUT: getEnvVarNumber("OPENAI_MAX_TOKEN_OUTPUT", 100),
};
