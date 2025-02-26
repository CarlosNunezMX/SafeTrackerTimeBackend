import type { ResponseWrapper } from "./ResponseWrapper"

export interface IServiceResponse<T> {
  res: ResponseWrapper<T>;
  code: number;
}

export interface IService<T, I> {
  service(args: I): Promise<IServiceResponse<T> | IServiceResponse<string>>;
};
