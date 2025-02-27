import type IUserRepository from "../domain/IUserRepository";
import type User from "../domain/user";
import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import UserNotFoundError from "../domain/UserNotFoundError";

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
      if (error instanceof UserNotFoundError)
        return {
          code: 404,
          res: new this.responseWrapper(false, error.message)
        };

      return {
        code: 500,
        res: new this.responseWrapper(false, (error as Error).message)
      }
    };
  }
};
