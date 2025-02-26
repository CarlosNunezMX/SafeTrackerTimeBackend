import UnknownError from "../../shared/domain/UnknownError";
import InvalidContactError from "../domain/InvalidContactError";
import type ContactDTO from "./ContactDTO";
import PhoneValidator from "./PhoneValidator";

export default class CreateContactBodyChecker {

  static check(contact: Partial<ContactDTO>) {
    if (!contact.name)
      throw new InvalidContactError("El nombre esta vacío");
    if (!contact.phone)
      throw new InvalidContactError("El telefono esta vacío");
    if (!PhoneValidator.validate(contact.phone!))
      throw new InvalidContactError("El telefono es invalido!");
    if (!contact.userID)
      throw new UnknownError("Ocurrio un error al recuperar los datos del usuario...");
    return true;
  }
};
