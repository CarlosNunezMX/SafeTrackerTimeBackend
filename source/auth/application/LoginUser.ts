import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import { TokenUsage } from "../../shared/infrastructure/JwtAdapter";
import type IUserRepository from "../../user/domain/IUserRepository";
import UserInvalidPasswordError from "../../user/domain/UserInvalidPasswordError";
import type PasswordHasher from "../../user/infrastructure/PasswordHasher";
import UserValidationError from "../../user/validators/UserValidationError";

export default class LoginUserService implements IService<string, [string, string]> {
  constructor(
    private repository: IUserRepository,
    private hasher: PasswordHasher,
    private jwtSerivce: JwtAdapter,
    private responseWrapper: typeof ResponseWrapper
  ) { };

  private isAvailable(date: Date): boolean {
    const now = Date.now();
    const dif = now - date.getTime();
    const fiveDays = 1000 * 60 * 60 * 24 * 5;

    return dif < fiveDays;
  }
  public async service(args: [string, string]): Promise<IServiceResponse<string>> {
    try {
      const [email, password] = args;
      const user = await this.repository.getByEmail(email);
      const isPasswordValid = this.hasher.testPassword(password, user.password);
      if (!user.verified)
        if (!this.isAvailable(user.createdAt))
          throw new UserValidationError("El usuario no se ha verificado! La cuenta se ha desactivado.");
      if (!isPasswordValid)
        throw new UserInvalidPasswordError();
      const token = await this.jwtSerivce.encode(user, TokenUsage.AUTH);
      return {
        code: 200,
        res: new this.responseWrapper(true, token)
      }
    } catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    }
  }
};
