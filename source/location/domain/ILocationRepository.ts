import type Location from "./Location";

export default interface ILocationRepository {
  getLocation(userID: string): Promise<Location>;
  updateLocation(location: Location, userID: string): Promise<Location>;
};
