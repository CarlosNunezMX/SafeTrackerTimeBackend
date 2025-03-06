import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";
import type ILocationRepository from "../domain/ILocationRepository";
import type Location from "../domain/Location";

export default class GetLocationService implements IService<Location, string> {
  constructor(
    private repo: ILocationRepository,
    private responseWrapper: typeof ResponseWrapper
  ) { };
  public async service(args: string): Promise<IServiceResponse<string> | IServiceResponse<Location>> {
    try {
      const location = await this.repo.getLocation(args);
      return {
        code: 200,
        res: new this.responseWrapper(true, location)
      }
    } catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    }
  }
}
