import pino from "pino";
import { getCallerInfo } from "./common";

const logger = pino({
  level: Bun.env.LOG_LEVEL,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
});

type Field = { key: string; value: any };

const EventKey = "event";

export class Fields {
  public fields: Field[] = [];
  constructor(...initialFields: Field[]) {
    this.fields.push(...initialFields);
  }

  append(field: Field): void {
    this.fields.push(field);
  }

  extract(): Record<string, any> {
    const obj: Record<string, any> = {};
    for (const f of this.fields) {
      obj[f.key] = f.value;
    }
    return obj;
  }

  toJSON(): Record<string, any> {
    return {
      [EventKey]: this.extract(),
    };
  }
}

export function EventName(value: any): Field {
  return Any("name", value);
}

export function Any(key: string, value: any): Field {
  return { key, value };
}

function addFields(f: Record<string, any>): Record<string, any> {
  const caller = getCallerInfo();
  return {
    ...caller,
    ...f,
    service: Bun.env.APP_NAME || "undefined",
    env: Bun.env.APP_ENVIRONMENT || "undefined",
  };
}

// Logging function
export function Info(msg: string, fields: Fields) {
  logger.info(addFields(fields.toJSON()), msg);
}

export function Warn(msg: string, fields: Fields) {
  logger.warn(addFields(fields.toJSON()), msg);
}

export function Error(msg: string, fields: Fields) {
  logger.error(addFields(fields.toJSON()), msg);
}
