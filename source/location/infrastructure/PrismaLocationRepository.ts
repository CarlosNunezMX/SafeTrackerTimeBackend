import type { PrismaClient } from "@prisma/client";
import type ILocationRepository from "../domain/ILocationRepository";
import Location from "../domain/Location";
import LocationNotExists from "../domain/LocationError"
import type LocationEncryption from "./encrypt";

export default class PrismaLocationRepository implements ILocationRepository {
  constructor(
    private client: PrismaClient,
    private encryptionService: LocationEncryption
  ) { };


  async getLocation(userID: string): Promise<Location> {
    const location = await this.client.location.findFirst({
      where: {
        userID
      }
    });

    if (!location)
      throw new LocationNotExists();

    return this.encryptionService.toClient(location);
  }

  public async updateLocation(location: Location, userID: string): Promise<Location> {
    try {
      const toDB = this.encryptionService.toDatabase(location);
      console.log(userID)
      const newLocation = await this.client.location.update({
        where: {
          userID
        },
        data: {
          date: toDB.date,
          tag: toDB.tag,
          encriptedLocation: toDB.encriptedLocation,
          iv: toDB.iv
        }
      })

      return this.encryptionService.toClient(newLocation);

    } catch (err) {
      return await this.createLocation(location, userID);
    };
  }

  private async createLocation(location: Location, userID: string): Promise<Location> {
    const toDatabase = this.encryptionService.toDatabase(location);
    const newLocation = await this.client.location.create({
      data: {
        encriptedLocation: toDatabase.encriptedLocation,
        iv: toDatabase.iv,
        userID,
        tag: toDatabase.tag,
        date: location.date
      }
    })

    return this.encryptionService.toClient(newLocation);
  };
}

