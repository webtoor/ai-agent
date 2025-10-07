import { Config } from "../config";
import { Database } from "../infrastructure/database";
import { AgentService } from "../services/agent";
import { IAgentService, IDocumentService } from "../services/contract";
import { DocumentService } from "../services/document";

let instance: Deps | null = null;

export interface Deps {
  documentService: IDocumentService;
  agentService: IAgentService;
}

export function initDependencies(cfg: Config): Deps {
  if (instance) return instance;

  const db = new Database(cfg).getInstance();

  const documentService = new DocumentService(cfg, db);
  const agentService = new AgentService(cfg, db);

  return {
    documentService,
    agentService,
  };
}
