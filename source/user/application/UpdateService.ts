import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import type IUserRepository from "../domain/IUserRepository";
import type User from "../domain/user";
import UserNotFoundError from "../domain/UserNotFoundError";
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
      if (error instanceof UserNotFoundError)
        return {
          res: new this.responseWrapper(false, error.message),
          code: 404
        }
      if (error instanceof Error)
        return {
          res: new this.responseWrapper(false, (error as Error).message),
          code: 500
        }
      console.error("[Error desconocido]", error);
      return {
        res: new this.responseWrapper(false, error as string),
        code: 500
      }
    };
  };
};
