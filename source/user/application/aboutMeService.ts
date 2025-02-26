import type IUserRepository from "../domain/IUserRepository";
import type User from "../domain/user";

export default class AboutMeService {
  constructor(
    public repository: IUserRepository
  ) { };

  public async aboutMe(id: string): Promise<User> {
    const user = await this.repository.getUserDetails(id);
    user.password = "";
    return user;
  }
};
