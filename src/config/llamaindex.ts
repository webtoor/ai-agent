import { getEnvVar } from "../utils/common";

export interface ILlamaIndex {
  API_KEY: string;
}

export const LlamaIndex = {
  API_KEY: getEnvVar("LLAMAINDEX_API_KEY", "default_llamaindex_api_key"),
};
