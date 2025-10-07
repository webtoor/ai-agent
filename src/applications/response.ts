import { StatusCodes } from "http-status-codes";

export type AppCtxResponse = {
  status: boolean;
  code: StatusCodes;
  message: string;
  data?: object;
  errors?: any;
};

export class ResponseBuilder {
  private response: AppCtxResponse;
  constructor() {
    this.response = {
      status: false,
      code: 500,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  withCode(code: StatusCodes): this {
    this.response.code = code;
    if (code === 200) {
      this.response.status = true;
    } else {
      this.response.status = false;
    }
    return this;
  }

  withData(data: object): this {
    this.response.data = data;
    return this;
  }

  withMessage(message: string): this {
    this.response.message = message;
    return this;
  }

  withErrors(errors: any): this {
    this.response.errors = errors;
    return this;
  }

  build(): AppCtxResponse {
    return this.response;
  }
}
