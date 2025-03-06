import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";
import type IUserRepository from "../domain/IUserRepository";
import type User from "../domain/user";
import type UserDTO from "../infrastructure/UserDTO";

export default class UserUpdateService implements IService<User, [Partial<UserDTO>, string]> {
  constructor(
    private repository: IUserRepository,
    private responseWrapper: typeof ResponseWrapper
  ) { };

  public async service(args: [Partial<UserDTO>, string]): Promise<IServiceResponse<User> | IServiceResponse<string>> {
    try {
      const [user, id] = args;
      const updatedUser = await this.repository.updateUser(user, id);
      return { res: new this.responseWrapper(true, updatedUser), code: 200 };
    }
    catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    };
  };
};
