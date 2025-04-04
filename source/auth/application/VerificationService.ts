import { JwtTokenInvalid } from "hono/utils/jwt/types";
import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import UserValidationError from "../../user/validators/UserValidationError";
import type IUserRepository from "../../user/domain/IUserRepository";
import UserNotFoundError from "../../user/domain/UserNotFoundError";
import type User from "../../user/domain/user";
interface expectedToken {
  id: string,
  date: number,
  invalid_at: number
};

export default class VerificationService implements IService<User, string> {
  constructor(
    private jwtService: JwtAdapter,
    private responseWrapper: typeof ResponseWrapper,
    private repo: IUserRepository
  ) { };
  private isAllowed(date: number) {
    const now = Date.now();
    return date >= now;
  }
  public async service(args: string): Promise<IServiceResponse<User> | IServiceResponse<string>> {
    try {
      const user = await this.jwtService.decode<expectedToken>(args);
      if (!this.isAllowed(user.invalid_at))
        throw new UserValidationError("El link es invalido");
      const validUser = await this.repo.updateUser({
        verifed: true
      }, user.id);
      return {
        res: new this.responseWrapper(true, validUser),
        code: 200
      };
    } catch (error) {
      if (error instanceof UserValidationError)
        return {
          res: new this.responseWrapper(false, error.message),
          code: 400
        }
      if (error instanceof JwtTokenInvalid)
        return {
          res: new this.responseWrapper(false, "El token es invalido"),
          code: 400
        }
      if (error instanceof UserNotFoundError)
        return {
          res: new this.responseWrapper(false, error.message),
          code: 404
        }
      console.error(error);
      return {
        res: new this.responseWrapper(false, "Error desconocido!"),
        code: 500
      }
    };
  }
};
