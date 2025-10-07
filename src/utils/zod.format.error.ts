import { ZodError } from "zod";

interface FormattedError {
  key: string;
  message: string[];
}

export function FormatZodErrors(error: ZodError): FormattedError[] {
  const formatted = error.format();
  const errors: FormattedError[] = [];

  function traverse(obj: any, path: (string | number)[] = []) {
    if (Array.isArray(obj?._errors) && obj._errors.length > 0) {
      errors.push({
        key: path.map(formatPath).join("."),
        message: obj._errors,
      });
    }

    for (const [key, val] of Object.entries(obj)) {
      if (key === "_errors") continue;

      if (Array.isArray(val)) {
        val.forEach((item, index) => {
          traverse(item, [...path, key, index]);
        });
      } else if (typeof val === "object" && val !== null) {
        traverse(val, [...path, key]);
      }
    }
  }

  function formatPath(part: string | number): string {
    return typeof part === "number" ? `[${part}]` : part;
  }

  traverse(formatted);

  return errors;
}
