import { getEnvVar, getEnvVarNumber } from "../utils/common";
import { Database, IDatabase } from "./database";

export interface Config {
  AppName: string;
  AppEnvironment: string;
  AppDebug: boolean;
  AppPort: number;
  AppLogLevel: string;
  Database: IDatabase;
}

export function ReadConfig(): Config {
  return {
    AppName: getEnvVar("APP_NAME", "default_app_name"),
    AppEnvironment: getEnvVar("APP_ENVIRONMENT", "development"),
    AppDebug: Bun.env.APP_DEBUG?.toLocaleLowerCase() === "true",
    AppPort: getEnvVarNumber("APP_PORT", 3000),
    AppLogLevel: getEnvVar("APP_LOG_LEVEL", "info"),
    Database: Database,
  };
}
