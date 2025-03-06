import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type IUserRepository from "../../user/domain/IUserRepository";
import UserNotFoundError from "../../user/domain/UserNotFoundError";
import type EmailDetails from "../domain/EmailDetails";
import type EmailClient from "../infrastructure/EmailClient";
import type { RecoverPasswordEmailBuilder } from "../infrastructure/RecoverPasswordEmailBuilder";



export default class ResetPasswordService implements IService<string, string> {
  constructor(
    private jwtService: JwtAdapter,
    private userRepo: IUserRepository,
    private wrapper: typeof ResponseWrapper,
    private details: typeof EmailDetails,
    private recoverBuilder: typeof RecoverPasswordEmailBuilder,
    private host: string,
    private client: EmailClient
  ) { };
  public async service(args: string): Promise<IServiceResponse<string>> {
    try {

      const exists = await this.userRepo.exists({
        email: args
      });
      if (!exists)
        throw new UserNotFoundError();

      const user = await this.userRepo.getByEmail(args);
      const token = await this.jwtService.encode(user, { invalid_at: 1000 * 60 * 5 })

      const senderBuild = new this.details(user.email, "Recupera tu contraseña", user.userName.firstName);
      const recoverBuilder = new this.recoverBuilder({
        name: user.userName.firstName,
        token,
        url: this.host
      })

      await this.client.sendEmail(senderBuild, recoverBuilder);

      return {
        code: 200,
        res: new this.wrapper(true, "El email se envío correctamente")
      };

    } catch (error) {
      return CatchResponseError(this.wrapper, error);
    }
  }
};
