import type LocationDTO from "../infrastructure/LocationDTO";
import type Location from "./Location";

export default interface ILocationRepository {
  getLocation(userID: string): Promise<Location>;
  updateLocation(location: LocationDTO, userID: string): Promise<Location>;
};
