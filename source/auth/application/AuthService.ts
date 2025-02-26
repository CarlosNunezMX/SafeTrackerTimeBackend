import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type LoginUserService from "../../user/application/LoginUser";
import type RegisterUser from "../../user/application/RegisterUser";
import type UserDTO from "../../user/infrastructure/UserDTO";

export default class AuthService {
  constructor(
    private RegisterService: RegisterUser,
    private LoginService: LoginUserService,
    private tokenService: JwtAdapter
  ) { };
  public async register(user: UserDTO): Promise<ResponseWrapper<string>> {
    const createdUser = await this.RegisterService.registerUser(user);
    return {
      ok: true,
      data: await this.tokenService.encode(createdUser)
    };
  }

}
