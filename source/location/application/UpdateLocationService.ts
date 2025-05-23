import type { IService, IServiceResponse } from "../../shared/domain/IService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";
import type ILocationRepository from "../domain/ILocationRepository";
import type Location from "../domain/Location";
import type LocationDTO from "../infrastructure/LocationDTO";

export default class UpdateLocationService implements IService<Location, [LocationDTO, string]> {
  constructor(
    private repo: ILocationRepository,
    private responseWrapper: typeof ResponseWrapper
  ) { };

  public async service([location, userID]: [LocationDTO, string]): Promise<IServiceResponse<string> | IServiceResponse<Location>> {
    try {
      const updatedLocation = await this.repo.updateLocation(location, userID);
      return {
        code: 200,
        res: new this.responseWrapper(true, updatedLocation)
      }
    } catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    }
  }
}
