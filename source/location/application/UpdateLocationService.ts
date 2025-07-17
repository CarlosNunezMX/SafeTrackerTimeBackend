import type { IService, IServiceResponse } from "@shared/domain/IService";
import type { ResponseWrapper } from "@shared/domain/ResponseWrapper";
import CatchResponseError from "@shared/infrastructure/catchError";
import type ILocationRepository from "../domain/ILocationRepository";
import Location from "../domain/Location";
import type { UpdateLocationInput } from "../controller/update_input.dto";

export default class UpdateLocationService implements IService<Location, [UpdateLocationInput, string]> {
  constructor(
    private repo: ILocationRepository,
    private responseWrapper: typeof ResponseWrapper
  ) { };

  public async service([location, userID]: [UpdateLocationInput, string]): Promise<IServiceResponse<string> | IServiceResponse<Location>> {
    try {
      const lastLocation = await this.repo.getLocation(userID);
      const newObject = new Location(
        lastLocation.id,
        location.x,
        location.y,
        new Date(Date.now()),
        userID
      )
      const updatedLocation = await this.repo.updateLocation(newObject, userID);
      return {
        code: 200,
        res: new this.responseWrapper(true, updatedLocation)
      }
    } catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    }
  }
}
