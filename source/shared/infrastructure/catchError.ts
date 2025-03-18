import type { Context } from "hono";
import type { IServiceResponse } from "../domain/IService";
import InvalidContactError from "../../contact/domain/InvalidContactError";
import type { ResponseWrapper } from "../domain/ResponseWrapper";
import UnknownError from "../domain/UnknownError";
import UserNotFoundError from "../../user/domain/UserNotFoundError";
import ContactNotFoundError from "../../contact/domain/ContactNotFoundError";
import UserValidationError from "../../user/validators/UserValidationError";
import LocationNotExists from "../../location/domain/LocationError";
import UserExistsError from "../../user/domain/UserExistsError";
import UserInvalidPasswordError from "../../user/domain/UserInvalidPasswordError";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/client";
import { JwtTokenExpired, JwtTokenInvalid } from "hono/utils/jwt/types";

export default function CatchResponseError(wrapper: typeof  ResponseWrapper, error: unknown): IServiceResponse<string>{
    if(error instanceof UnknownError || error instanceof InvalidContactError)
        return { res: new wrapper(false, error.message), code: 500 }
    if(error instanceof UserNotFoundError || error instanceof LocationNotExists || error instanceof ContactNotFoundError)
        return { res: new wrapper(false, error.message), code: 404 };
    if(
        error instanceof UserValidationError || 
        error instanceof InvalidContactError || 
        error instanceof UserExistsError     || 
        error instanceof UserInvalidPasswordError)
        return {res: new wrapper(false, error.message),code: 400};

    if(error instanceof PrismaClientUnknownRequestError){
        console.log(error);
        return {res: new wrapper(false, "Error en base de datos"), code: 500}; 
    }
    if(error instanceof JwtTokenInvalid || error instanceof JwtTokenExpired)
        return {res: new wrapper(false, "El token es invalido"), code: 401};
    console.log(error);
    return { res: new wrapper(false, "Error desconocido!"), code: 500 }
}