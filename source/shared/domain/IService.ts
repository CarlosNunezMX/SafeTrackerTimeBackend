import type { ContentfulStatusCode } from "hono/utils/http-status";
import type { ResponseWrapper } from "./ResponseWrapper"

export interface IServiceResponse<T> {
  res: ResponseWrapper<T>;
  code: ContentfulStatusCode;
}

/**
 * T: Return to controller
 * I: Arguments for execution of service function
 * */
export interface IService<T, I> {
  service(args: I): Promise<IServiceResponse<T> | IServiceResponse<string>>;
};
