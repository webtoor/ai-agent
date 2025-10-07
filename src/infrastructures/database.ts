import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Config } from "../config";
import * as schema from "../../database/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export class Database {
  constructor(private cfg: Config) {}
  private static instance: NodePgDatabase | null = null;

  public getInstance(): NodePgDatabase {
    if (!Database.instance) {
      const pool = new Pool({
        connectionString:
          `postgresql://${this.cfg.Database.USER}:${this.cfg.Database.PASSWORD}` +
          `@${this.cfg.Database.HOST}:${this.cfg.Database.PORT}/${this.cfg.Database.NAME}` +
          `?sslmode=disable&connect_timeout=${this.cfg.Database.TIMEOUT}`,
      });

      Database.instance = drizzle(pool, { schema, logger: this.cfg.AppDebug });
    }

    return Database.instance;
  }
}

export type PgDatabase = NodePgDatabase<typeof schema>;
