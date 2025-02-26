import PhoneValidator from "../../contact/infrastructure/PhoneValidator";
import UnknownError from "../../shared/domain/UnknownError";
import UserValidationError from "../../user/validators/UserValidationError";
import EmailValidator from "../validators/EmailValidator";

import type UserDTO from "../../user/infrastructure/UserDTO";

export default class ValidateUserRegister {
  public static validate(user: Partial<UserDTO>) {
    if (!user.email || !EmailValidator.validate(user.email))
      throw new UserValidationError("El campo de email es invalido o nulo!");
    if (!user.password)
      throw new UserValidationError("El campo de contraseña esta vacío!");

    if (user.password!.length <= 8)
      throw new UserValidationError("El campo contraseña debe ser mayor a 8 caracteres");

    if (!user.userName)
      throw new UnknownError("Fallo al leer el UserDTO->userName");

    if (!user.userName.firstName || !user.userName.lastName)
      throw new UserValidationError("El o los campos del usuario estan vacios!");

    if (!user.phone || !PhoneValidator.validate(user.phone))
      throw new UserValidationError("El campo de telefono se encuentra vacio o es invalido!");

    return true;
  }
}
