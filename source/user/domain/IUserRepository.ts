import type UserDTO from "../infrastructure/UserDTO.ts";
import type User from "./user";
import type UserName from "./userName";

export default interface IUserRepository {
  createUser(user: UserDTO): Promise<User>;
  getUserDetails(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getUsers(): Promise<User[]>;
  updateUser(user: Partial<UserDTO>, userID: string): Promise<User>;
}
