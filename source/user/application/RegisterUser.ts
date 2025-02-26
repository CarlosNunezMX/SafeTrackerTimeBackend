import type IUserRepository from "../domain/IUserRepository";
import User from "../domain/user.ts";
import type PasswordHasher from "../infrastructure/PasswordHasher";
import type UserDTO from "../infrastructure/UserDTO.ts";

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
