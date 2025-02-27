import type { ResponseWrapper } from "./ResponseWrapper"

export interface IServiceResponse<T> {
  res: ResponseWrapper<T>;
  code: number;
}

/**
 * T: Return to controller
 * I: Arguments for execution of service function
 * */
export interface IService<T, I> {
  service(args: I): Promise<IServiceResponse<T> | IServiceResponse<string>>;
};
