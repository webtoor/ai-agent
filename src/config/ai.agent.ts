import { getEnvVar } from "../utils/common";

export interface IAIAgent {
  TONE: string;
  PERSONALITY: string;
}

export const AIAgent = {
  TONE: getEnvVar("AI_AGENT_TONE", "empathetic"),
  PERSONALITY: getEnvVar("AI_AGENT_PERSONALITY", "friendly"),
};
