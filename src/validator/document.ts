import { z, ZodType } from "zod";

export class DocumentValidation {
  static Create(): ZodType {
    return z.object({
      file: z
        .instanceof(File, {
          message: "File is required",
        })
        .refine((file) => file.type === "application/pdf", {
          message: "Must be a PDF",
          path: ["file"],
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File size must be less than 5 MB",
          path: ["file"],
        }),
    });
  }
}
