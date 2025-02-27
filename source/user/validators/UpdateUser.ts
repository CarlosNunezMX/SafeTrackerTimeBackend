import EmailValidator from "../../auth/validators/EmailValidator";
import PhoneValidator from "../../contact/infrastructure/PhoneValidator";
import UserInvalidPasswordError from "../domain/UserInvalidPasswordError";
import UserValidationError from "./UserValidationError";
import type UserDTO from "../infrastructure/UserDTO";
import UsernameValidator from "./Username";
import UserName from "../domain/userName";

export default class UpdateUserValidator {
  private static checkEmpty(user: Partial<UserDTO>) {
    if (!user.email && !user.firstName
      && !user.lastName && !user.phone && !user.password)
      throw new UserValidationError("No se ha proporcionado un campo para modificar.");


  }
  public static validate(user: Partial<UserDTO>) {
    this.checkEmpty(user);
    if (user.email && !EmailValidator.validate(user.email!))
      throw new UserValidationError("El email esta vacio o es invalido.");
    if (user.phone && !PhoneValidator.validate(user.phone))
      throw new UserValidationError("El telefono esta vacio o es invalido.");
    if (user.firstName || user.lastName)
      UsernameValidator.validate(new UserName(user.firstName!, user.lastName!))
    if (user.password && user.password.length <= 8)
      throw new UserInvalidPasswordError();
  };
}


