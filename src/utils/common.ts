import path from "path";

export function getEnvVar(key: string, defaultValue: string): string {
  const value = process.env[key];
  if (value) return value;
  console.warn(
    `Environment variable ${key} is missing, using default: ${defaultValue}`
  );
  return defaultValue;
}

export function getEnvVarNumber(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (value) return Number(value);
  console.warn(
    `Environment variable ${key} is missing, using default: ${defaultValue}`
  );
  return defaultValue;
}

export function getEnvVarBool(key: string, defaultValue = false): boolean {
  const val = process.env[key]?.toLowerCase();
  if (val === "true") return true;
  if (val === "false") return false;
  return defaultValue;
}

export function getCallerInfo(): {
  file?: string;
  line?: string;
  function?: string;
} {
  const stack = new Error().stack;
  if (!stack) return {};

  const lines = stack.split("\n");

  const callerLine = lines.find(
    (line: any) =>
      !line.includes("logger.ts") &&
      !line.includes("getCallerInfo") &&
      line.trim().startsWith("at ")
  );

  if (!callerLine) return {};

  // Case: with function name
  const withFunc = callerLine.match(/\s+at\s+(.*)\s+\((.*):(\d+):\d+\)/);
  if (withFunc) {
    const [, func, fullPath, line] = withFunc;
    return {
      //function: func,
      file: path.relative(process.cwd(), fullPath),
      line,
    };
  }

  // Case: without function name
  const withoutFunc = callerLine.match(/\s+at\s+(.*):(\d+):\d+/);
  if (withoutFunc) {
    const [, fullPath, line] = withoutFunc;
    return {
      file: path.relative(process.cwd(), fullPath),
      line,
    };
  }

  return {};
}
