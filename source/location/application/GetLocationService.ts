import type { IService, IServiceResponse } from "../../shared/domain/IService";
import NotAuthorizedError from "../../shared/domain/NotAuthroized";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import CatchResponseError from "../../shared/infrastructure/catchError";
import type IUserRepository from "../../user/domain/IUserRepository";
import type ILocationRepository from "../domain/ILocationRepository";
import type Location from "../domain/Location";

interface GetLocationControllerProps {
  userID?: string;
  reqID: string;
}


export default class GetLocationService implements IService<Location, GetLocationControllerProps> {
  constructor(
    private repo: ILocationRepository,
    private responseWrapper: typeof ResponseWrapper,
    private userRepo: IUserRepository
  ) { };
  public async service(args: GetLocationControllerProps): Promise<IServiceResponse<string> | IServiceResponse<Location>> {
    try {
      const reqUser = await this.userRepo.getUserDetails(args.reqID);
      if(!args.userID)
        args.userID = reqUser.id;
      console.log(args)
      if (args.reqID !== args.userID) {
        if (reqUser.rank !== "Admin")
          throw new NotAuthorizedError();
      }
      const location = await this.repo.getLocation(args.userID);

      return {
        code: 200,
        res: new this.responseWrapper(true, location)
      }
    } catch (error) {
      return CatchResponseError(this.responseWrapper, error);
    }
  }
}
