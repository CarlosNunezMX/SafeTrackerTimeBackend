import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import LocationDTO from "../infrastructure/LocationDTO";

export default class UpdateLocationValidator {
  static validate(location: Partial<LocationDTO>): boolean {
    if (!location.x || !location.y)
      throw new InvalidRequestBodyError("Se requiere la coordenada \"x\" y \"y\"");

    return true;
  }
};
