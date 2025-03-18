import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";
import { TokenUsage } from "../../shared/infrastructure/JwtAdapter";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type IUserRepository from "../../user/domain/IUserRepository";
import UserNotFoundError from "../../user/domain/UserNotFoundError";

export default class RecoverPasswordFormService implements IService<string, string> {
    constructor(
        private jwtService: JwtAdapter,
        private repo: IUserRepository,
        private wrapper: typeof ResponseWrapper
    ){};
    async service(args: string): Promise<IServiceResponse<string>> {
        try {
            const {usage,id} = await this.jwtService.decode(args);
            const exists = await this.repo.exists({
                id
            })
            if(!exists)
                throw new UserNotFoundError();
            if(usage !== TokenUsage.RECOVER_PASSWORD)
                throw new InvalidRequestBodyError("El link es invalido")
            return {
                res: new this.wrapper(true, id),
                code: 200
            }
        } catch(err){
            return CatchResponseError(this.wrapper, err);
        };
    }
} 