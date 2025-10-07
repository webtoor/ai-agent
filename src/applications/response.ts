export type AppCtxResponse = {
  status: boolean;
  code: number;
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
      message: "",
    };
  }

  withCode(code: number): this {
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
