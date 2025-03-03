import type UserName from "../domain/userName";
import UserValidationError from "./UserValidationError";

export default class UsernameValidator {
  private static SymbolsRegex = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/g);
  public static validate(user: Partial<UserName>) {
    console.log(user)
    if (user.firstName && user.firstName.length < 4)
      throw new UserValidationError("El campo nombre es muy corto");
    if (user.lastName && user.lastName.length < 3)
      throw new UserValidationError("El campo apellido es muy corto");
    if (user.firstName && !this.SymbolsRegex.test(user.firstName))
      throw new UserValidationError("El campo nombre es invalido.")
    if (user.lastName && !this.SymbolsRegex.test(user.lastName))
      throw new UserValidationError("El campo apellido es invalido.")
  }

}
