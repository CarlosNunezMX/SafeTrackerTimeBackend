import type UserDTO from "./UserDTO";

export default class PasswordHasher {
  public hash(user: Partial<UserDTO>): Partial<UserDTO>;
  public hash(user: UserDTO) {
    user.password = Bun.password.hashSync(user.password!);
    return user;
  }

  public testPassword(password: string, hashedPassword: string): boolean {
    return Bun.password.verifySync(password, hashedPassword);
  }
}
