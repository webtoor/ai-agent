import { PromptBuilder } from "../builder/prompt";

export interface AgentPayload {
  question: string;
  tone: string;
  personality: string;
  content: string;
  retrievedText: string;
}

interface AgentStrategy {
  handle(payload: AgentPayload): Promise<string>;
}

class KnowledgeAgentStrategy implements AgentStrategy {
  async handle(payload: AgentPayload): Promise<string> {
    const prompt = new PromptBuilder()
      .addToneAndPersonality(payload.tone, payload.personality)
      .addInstructions()
      .addContext(payload.content)
      .build();
    return prompt;
  }
}
