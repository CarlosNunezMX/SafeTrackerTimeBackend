import type { PrismaClient } from "@prisma/client";
import type ILocationRepository from "../domain/ILocationRepository";
import Location from "../domain/Location";
import LocationNotExists from "../domain/LocationError"
import type LocationDTO from "./LocationDTO";
export default class PrismaLocationRepository implements ILocationRepository {
  constructor(
    private client: PrismaClient
  ) { };


  async getLocation(userID: string): Promise<Location> {
    const location = await this.client.location.findFirst({
      where: {
        userID
      }
    });

    if (!location)
      throw new LocationNotExists();

    return new Location(
      location.id,
      location.x.toNumber(),
      location.y.toNumber(),
      location.date,
      location.userID
    )
  }

  public async updateLocation(location: LocationDTO, userID: string): Promise<Location> {
    try {
      const newLocation = await this.client.location.update({
        where: {
          userID
        },
        data: {
          date: new Date(Date.now()),
          x: location.x,
          y: location.y
        }
      })
      return new Location(newLocation.id, newLocation.x.toNumber(), newLocation.y.toNumber(), newLocation.date, newLocation.userID);

    } catch (err) {
      return await this.createLocation(location, userID);
    };
  }

  private async createLocation(location: LocationDTO, userID: string): Promise<Location> {
    const newLocation = await this.client.location.create({
      data: {
        x: location.x,
        y: location.y,
        userID
      }
    })


    return new Location(newLocation.id, newLocation.x.toNumber(), newLocation.y.toNumber(), newLocation.date, newLocation.userID);
  };
}

