import { Context } from "hono";
import { AppCtxResponse } from "../applications/response";
import { UploadDocumentRequest } from "../presentations/document";

export interface IDocumentService {
  upload(ctx: Context, params: UploadDocumentRequest): Promise<AppCtxResponse>;
}
