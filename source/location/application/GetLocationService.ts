import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import type ILocationRepository from "../domain/ILocationRepository";
import type Location from "../domain/Location";
import LocationNotExists from "../domain/LocationError";

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
      if (error instanceof LocationNotExists)
        return {
          code: 404,
          res: new this.responseWrapper(false, error.message)
        };
      console.log(error);
      return {
        code: 500,
        res: new this.responseWrapper(false, (error as Error).message)
      }
    }
  }
}
