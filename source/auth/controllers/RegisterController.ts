import { Hono } from "hono"
import { validator } from "hono/validator";
import { ResponseWrapper } from "../../shared/domain/ResponseWrapper";

import UserDTO from "../../user/infrastructure/UserDTO";
import UserValidationError from "../../user/validators/UserValidationError";

import type ValidateUserRegister from "../validators/ValidateUserRegister";

import type AuthService from "../application/AuthService";
import UnknownError from "../../shared/domain/UnknownError";
export default class RegisterController {
  constructor(
    private validationUserRegisterService: typeof ValidateUserRegister,
    private responseWrapper: typeof ResponseWrapper,
    private authService: AuthService
  ) {
    this.router();
  };
  public readonly Router = new Hono();
  private router() {
    this.Router.post("/",
      validator("json", (value, c) => {
        const dto = new UserDTO(
          value.email,
          value.phone,
          value.firstName,
          value.lastName,
          value.password
        )
        try {
          this.validationUserRegisterService.validate(dto)
          return { dto: dto };
        } catch (err) {
          console.log(err);
          if (err instanceof UserValidationError) {
            return c.json(
              new this.responseWrapper<string>(false, err.message),
              400
            );
          }

          if (err instanceof UnknownError) {
            return c.json(
              new this.responseWrapper<string>(false, err.message),
              500
            )
          }
        }
      })
      , async (c) => {
        const { dto } = c.req.valid("json")!;
        try {
          return c.json(await this.authService.register(dto));
        } catch (error) {
          console.log(error);
          return c.json(
            new this.responseWrapper(false, (error as Error).message),
            500
          )
        }
      })
  }
}
