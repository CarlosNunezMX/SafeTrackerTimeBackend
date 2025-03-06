import type IUserRepository from "../domain/IUserRepository";
import type User from "../domain/user";
import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";

export default class AboutMeService implements IService<User, string> {
  constructor(
    private repository: IUserRepository,
    private responseWrapper: typeof ResponseWrapper
  ) { };

  public async service(id: string): Promise<IServiceResponse<User> | IServiceResponse<string>> {
    try {
      const user = await this.repository.getUserDetails(id);
      user.password = "";
      return {
        res: new this.responseWrapper(true, user),
        code: 200
      };
    } catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    };
  }
};
