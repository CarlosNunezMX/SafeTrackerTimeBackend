import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";
import { TokenUsage } from "../../shared/infrastructure/JwtAdapter";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type IUserRepository from "../../user/domain/IUserRepository";
import UserNotFoundError from "../../user/domain/UserNotFoundError";
import type PasswordHasher from "../../user/infrastructure/PasswordHasher";
interface ChangePasswordServiceProps {
    token: string;
    password: string;
};
export default class ChangePasswordService implements IService<string, ChangePasswordServiceProps>{
    constructor(
        private repo: IUserRepository,
        private jwtService: JwtAdapter,
        private passwordHashService: PasswordHasher,
        private wrapper: typeof ResponseWrapper
    ){};
    async service(args: ChangePasswordServiceProps): Promise<IServiceResponse<string>> {
        try {
            const {id, usage} = await this.jwtService.decode(args.token);
            if(usage !== TokenUsage.RECOVER_PASSWORD)
                throw new InvalidRequestBodyError("El link es invalido!");
            
            const exists = this.repo.exists({id});
            if(!exists)
                throw new UserNotFoundError();
            const hashedUserPassword = this.passwordHashService.hash({password: args.password});
            this.repo.updateUser({password: hashedUserPassword.password}, id);
            return {
                code: 200,
                res: new this.wrapper(true, "La contraseña se ha cambiado con exito!")
            };
        }catch(error){
            return CatchResponseError(this.wrapper, error);
        }
    }
};