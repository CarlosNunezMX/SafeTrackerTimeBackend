import type UserDTO from "../infrastructure/UserDTO.ts";
import type User from "./user";

export default interface IUserRepository {
  createUser(user: UserDTO): Promise<User>;
  getUserDetails(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  exists(user: Partial<Pick<User, "email" | "phone" | "id">>): Promise<boolean>
  getUsers(): Promise<User[]>;
  updateUser(user: Partial<UserDTO>, userID: string): Promise<User>;
}
