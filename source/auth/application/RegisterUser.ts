import type IUserRepository from "../../user/domain/IUserRepository";
import type PasswordHasher from "../../user/infrastructure/PasswordHasher";
import type UserDTO from "../../user/infrastructure/UserDTO.ts";
import type { IService, IServiceResponse } from "../../shared/domain/IService.ts";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper.ts";
import UserExistsError from "../../user/domain/UserExistsError.ts";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter.ts";
import CatchResponseError from "../../shared/infrastructure/catchError.ts";
import { TokenUsage } from "../../shared/infrastructure/JwtAdapter.ts";

export default class RegisterUser implements IService<string, UserDTO> {
  constructor(
    private repository: IUserRepository,
    private passwordHashService: PasswordHasher,
    private responseWrapper: typeof ResponseWrapper,
    private jwtService: JwtAdapter
  ) { };


  async service(args: UserDTO): Promise<IServiceResponse<string>> {
    try {
      // check if user exists by email or phone
      const hasUser = await this.repository.exists({
        email: args.email,
        phone: args.phone
      })

      if (hasUser)
        throw new UserExistsError();

      args = (this.passwordHashService.hash(args) as UserDTO)

      const newUser = await this.repository.createUser(args);
      const token = await this.jwtService.encode(newUser, TokenUsage.AUTH);
      return {
        code: 200,
        res: new this.responseWrapper(true, token)
      }
    } catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    }
  }
}
