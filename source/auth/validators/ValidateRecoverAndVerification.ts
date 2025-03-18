import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import type EmailValidator from "./EmailValidator";

export default class ValidateRecoverAndVerification {
    
    static validate(email: string, emailVal: typeof EmailValidator){
        if(!email)
            throw new InvalidRequestBodyError("Se requiere el campo email");
        if(!emailVal.validate(email))
            throw new InvalidRequestBodyError("El email es invalido!");
    }
}