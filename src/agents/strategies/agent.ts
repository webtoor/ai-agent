import { AgentType } from "../../constants/agent";
import { PromptBuilder } from "../builder/prompt";

export interface AgentPayload {
  question: string;
  tone: string;
  personality: string;
  content: string;
}

interface AgentStrategy {
  handle(payload: AgentPayload): Promise<string>;
}

class CustomerServiceStrategy implements AgentStrategy {
  async handle(payload: AgentPayload): Promise<string> {
    const prompt = new PromptBuilder()
      .addToneAndPersonality(payload.tone, payload.personality)
      .addInstructions()
      .addContext(payload.content)
      .build();
    return prompt;
  }
}

const strategyMap: Record<string, AgentStrategy> = {
  [AgentType.CUSTOMER_SERVICE]: new CustomerServiceStrategy(),
};

export function setAgentStrategy(type: string): AgentStrategy {
  const strategy = strategyMap[type];
  if (!strategy) {
    throw new Error(`Unknown agent type: "${type}"`);
  }
  return strategy;
}
