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
