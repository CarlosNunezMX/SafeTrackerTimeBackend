import User from "../../user/domain/user.ts";
import type IUserRepository from "../../user/domain/IUserRepository";
import type PasswordHasher from "../../user/infrastructure/PasswordHasher";
import type UserDTO from "../../user/infrastructure/UserDTO.ts";

export default class RegisterUser {
  constructor(
    private repository: IUserRepository,
    private passwordHashService: PasswordHasher
  ) { };

  public async registerUser(user: UserDTO): Promise<User> {
    const createdUser = await this.repository.createUser(this.passwordHashService.hash(user));
    return createdUser;
  };
}
