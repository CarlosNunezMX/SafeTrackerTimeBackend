import InvalidContactError from "../domain/InvalidContactError";
import type ContactDTO from "./ContactDTO";
import PhoneValidator from "./PhoneValidator";

export default class UpdateValidator {
  static validate(dto: Partial<ContactDTO>): boolean {
    if (!dto.phone && !dto.name)
      throw new InvalidContactError("Se require al menos un campo a modificar!");
    if (dto.name && dto.name.length == 0)
      throw new InvalidContactError("El campo nombre esta vacío!");
    if (dto.phone && !PhoneValidator.validate(dto.phone))
      throw new InvalidContactError("El campo telefono esta vacío o es invalido!");
    return true;
  };
}
