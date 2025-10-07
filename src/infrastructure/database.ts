import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Config } from "../config";
import * as schema from "../schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export class Database {
  constructor(private cfg: Config) {}
  private static instance: PgDatabase | null = null;

  public getInstance(): PgDatabase {
    if (!Database.instance) {
      const pool = new Pool({
        connectionString:
          `postgresql://${this.cfg.Database.USER}:${this.cfg.Database.PASSWORD}` +
          `@${this.cfg.Database.HOST}:${this.cfg.Database.PORT}/${this.cfg.Database.NAME}` +
          `?sslmode=disable&connect_timeout=${this.cfg.Database.TIMEOUT}`,
      });

      Database.instance = drizzle(pool, {
        schema,
        logger: this.cfg.Database.DEBUG,
      });
    }

    return Database.instance;
  }
}

export type PgDatabase = NodePgDatabase<typeof schema>;
