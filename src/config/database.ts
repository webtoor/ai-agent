import { getEnvVar, getEnvVarBool, getEnvVarNumber } from "../utils/common";

export interface IDatabase {
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD: string;
  NAME: string;
  TIMEOUT: number;
  DEBUG: boolean;
}

export const Database = {
  HOST: getEnvVar("DB_HOST", "localhost"),
  PORT: getEnvVarNumber("DB_PORT", 5432),
  USER: getEnvVar("DB_USER", "default_user"),
  PASSWORD: getEnvVar("DB_PASSWORD", "default_password"),
  NAME: getEnvVar("DB_NAME", "default_db_name"),
  TIMEOUT: getEnvVarNumber("DB_TIMEOUT", 30),
  DEBUG: getEnvVarBool("DB_DEBUG", false),
};
