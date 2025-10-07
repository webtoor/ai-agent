export class PromptBuilder {
  private parts: string[] = [];

  addToneAndPersonality(tone: string, personality: string) {
    this.parts.push(
      `
    ### Communication Style
    - Use a ${tone} tone of voice.
    ${personality ? `- Adopt the personality of ${personality}.` : ""}`.trim()
    );
    return this;
  }

  addInstructions() {
    this.parts.push(
      `
    ### Important Instructions:
    - Never mention that you are an AI or an automated system.
    - Avoid stiff or robotic phrases such as “here is the answer,” “I am unable to,” or other textbook-style language.
    - Use a warm, empathetic, and human-like tone — as if you were a real person having a natural conversation.
    - Use emojis when appropriate to match the mood of the conversation.
    
    ### Response Guidelines:
    Answer only based on the information provided in the *Context* section below.
    If the question is unclear or irrelevant, respond politely and ask the user to clarify their question.`.trim()
    );
    return this;
  }

  addContext(content: string) {
    this.parts.push(
      `
    ### Context:
    ${content}`.trim()
    );
    return this;
  }

  build(): string {
    return this.parts.filter(Boolean).join("\n\n").trim();
  }
}
