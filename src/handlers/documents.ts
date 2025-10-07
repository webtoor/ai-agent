import { Hono } from "hono";
import { IDocumentService } from "../services/contract";
import { StatusCode } from "hono/utils/http-status";
import { UploadDocumentRequest } from "../presentations/document";

export const documentHandler = (documentService: IDocumentService) => {
  const route = new Hono();

  route.post("/", async (ctx) => {
    const params = (await ctx.req.parseBody()) as UploadDocumentRequest;
    const response = await documentService.upload(ctx, params);
    ctx.status(response.code as StatusCode);
    return ctx.json(response);
  });

  return route;
};
