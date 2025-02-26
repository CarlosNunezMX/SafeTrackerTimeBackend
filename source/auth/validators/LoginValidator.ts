import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import UserInvalidPasswordError from "../../user/domain/UserInvalidPasswordError";
import EmailValidator from "./EmailValidator";

export default class LoginValidator {
  static validate(email: string, password: string): boolean {
    if (!email || !password)
      throw new InvalidRequestBodyError("Los campos email y contraseña no pueden estar vacíos");

    if (!EmailValidator.validate(email))
      throw new InvalidRequestBodyError("El campo email es invalido");

    if (password.length <= 8)
      throw new UserInvalidPasswordError();
    return true;
  }
}
