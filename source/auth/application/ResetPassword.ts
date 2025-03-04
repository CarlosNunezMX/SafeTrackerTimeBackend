import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";

export default class ResetPasswordService implements IService<string, string> {
  constructor(
    private jwtService: JwtAdapter,

  ) { };
  public async service(args: string): Promise<IServiceResponse<string>> {

  }
};
