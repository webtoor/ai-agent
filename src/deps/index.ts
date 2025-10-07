import { Config } from "../config";
import { Database } from "../infrastructure/database";
import { IDocumentService } from "../services/contract";
import { DocumentService } from "../services/document";

let instance: Deps | null = null;

export interface Deps {
  documentService: IDocumentService;
}

export function initDependencies(cfg: Config): Deps {
  if (instance) return instance;

  const db = new Database(cfg).getInstance();

  const documentService = new DocumentService(cfg, db);

  return {
    documentService,
  };
}
