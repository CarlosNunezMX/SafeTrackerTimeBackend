import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import UnknownError from "../../shared/domain/UnknownError";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type IUserRepository from "../../user/domain/IUserRepository";
import UserNotFoundError from "../../user/domain/UserNotFoundError";
import UserValidationError from "../../user/validators/UserValidationError";
import type IEmailClient from "../domain/EmailClient";
import type EmailDetails from "../domain/EmailDetails";
import type { IValidateEmailProps } from "../infrastructure/ValidateEmailBuilder";
import type ValidateEmailBuilder from "../infrastructure/ValidateEmailBuilder";

const validationTime = 5 * 1000 * 60 * 60 * 24; // Five days


export default class SendEmailService implements IService<string, string> {
  constructor(
    private jwtService: JwtAdapter,
    private userRepo: IUserRepository,
    private responseWrapper: typeof ResponseWrapper,
    private emailSender: IEmailClient,
    private deteailsBuilder: typeof EmailDetails,
    private host: string,
    private emailBuilder: typeof ValidateEmailBuilder 
  ) { };

  
  async service(args: string): Promise<IServiceResponse<string> | IServiceResponse<string>> {
    try {
      const hasUser = await this.userRepo.exists({
        id: args
      })
      if (!hasUser)
        throw new UserNotFoundError();
      const user = await this.userRepo.getUserDetails(args);
      if (user.verified)
        throw new UserValidationError("El email ya ha sido verificado!");
      if (user.hasEmailSent)
        throw new UserValidationError("El email ya se ha enviado!");
      // Send email
      const token = await this.jwtService.encode(user, { invalid_at: Date.now() + validationTime })
      
      const emailSubject = new this.deteailsBuilder(user.email, "Verifica tu email", user.userName.firstName);
      const builder = new this.emailBuilder({
        name: user.userName.firstName,
        url: this.host,
        token 
      })
      
      this.emailSender.sendEmail<IValidateEmailProps>(emailSubject, builder);
      // Edit in database
      await this.userRepo.updateUser({
        hasEmailSent: true
      }, args);
      // All ok!
      return {
        code: 200,
        res: new this.responseWrapper(true, "Email enviado correctamente!")
      }
    } catch (error) {
      console.log(error);
      if (error instanceof UserNotFoundError)
        return {
          code: 404,
          res: new this.responseWrapper(false, error.message)
        };

      if (error instanceof UnknownError)
        return {
          code: 500,
          res: new this.responseWrapper(false, error.message)
        }

      if (error instanceof UserValidationError)
        return {
          code: 400,
          res: new this.responseWrapper(false, error.message)
        }
      if (error instanceof Error)
        return {
          code: 500,
          res: new this.responseWrapper(false, error.message)
        }
      return {
        code: 500,
        res: new this.responseWrapper(false, "Error desconocido")
      }
    }
  }
};
