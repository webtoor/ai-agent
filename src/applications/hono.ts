import type { ErrorHandler } from "hono";
import { ZodError } from "zod";
import { FormatZodErrors } from "../utils/zod.format.error";
import { ResponseBuilder } from "../applications/response";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const errorHandler: ErrorHandler = async (err, ctx) => {
  if (err instanceof ZodError) {
    const formated = FormatZodErrors(err);
    const resp = new ResponseBuilder()
      .withCode(StatusCodes.UNPROCESSABLE_ENTITY)
      .withErrors(formated)
      .withMessage(ReasonPhrases.UNPROCESSABLE_ENTITY)
      .build();
    return ctx.json(resp, StatusCodes.UNPROCESSABLE_ENTITY);
  } else if (
    (err instanceof SyntaxError &&
      err.message.includes("Failed to parse JSON")) ||
    err.message.includes("Unexpected end of JSON input") ||
    err.message.includes("JSON Parse error:")
  ) {
    const resp = new ResponseBuilder()
      .withCode(StatusCodes.BAD_REQUEST)
      .withMessage(
        "Oops! Something went wrong while reading your data. Please check and try again."
      )
      .build();
    return ctx.json(resp, StatusCodes.BAD_REQUEST);
  } else {
    const resp = new ResponseBuilder()
      .withCode(StatusCodes.INTERNAL_SERVER_ERROR)
      .withMessage("Oops! Something went wrong. Please try again.")
      .build();
    return ctx.json(resp, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
