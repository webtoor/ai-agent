import { z, ZodType } from "zod";

export class AgentValidation {
  static Chat(): ZodType {
    return z.object({
      question: z
        .string()
        .min(1, { message: "Question is required" })
        .max(50, "Question must be less than 50 characters"),
    });
  }
}
