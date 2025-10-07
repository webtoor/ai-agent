import { Hono } from "hono";
import { IAgentService } from "../services/contract";
import { StatusCode } from "hono/utils/http-status";
import { AgentAskRequest } from "../presentations/agent";
import { AgentValidation } from "../validator/agent";

export const agentHandler = (agentService: IAgentService) => {
  const route = new Hono();

  route.post("/chat", async (ctx) => {
    const params = (await ctx.req.json()) as AgentAskRequest;
    AgentValidation.Chat().parse(params);
    const response = await agentService.chat(ctx, params);
    ctx.status(response.code as StatusCode);
    return ctx.json(response);
  });

  return route;
};
