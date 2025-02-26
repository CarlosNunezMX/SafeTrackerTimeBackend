import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type IUserRepository from "../domain/IUserRepository";
import type User from "../domain/user";
import UserInvalidPasswordError from "../domain/UserInvalidPasswordError";
import type PasswordHasher from "../infrastructure/PasswordHasher";

export default class LoginUserService {
  constructor(
    private repository: IUserRepository,
    private hasher: PasswordHasher,
    private jwtSerivce: JwtAdapter
  ) { };

  public async login(email: string, password: string): Promise<string> {
    const user = await this.repository.getByEmail(email);
    const isPasswordValid = this.hasher.testPassword(password, user.password);
    if (!isPasswordValid)
      throw new UserInvalidPasswordError();
    return await this.jwtSerivce.encode(user);
  }

};
