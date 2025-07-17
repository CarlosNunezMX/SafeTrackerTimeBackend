import { Hono } from "hono";
import { validator } from "hono/validator";

import UserInvalidPasswordError from "@user/domain/UserInvalidPasswordError";

import InvalidRequestBodyError from "@shared/domain/InvalidRequestBodyError";
import type { ResponseWrapper } from "@shared/domain/ResponseWrapper";

import type LoginUserService from "../application/LoginUser";
import type LoginValidator from "../validators/LoginValidator";

export default class LoginController {
  constructor(
    private loginService: LoginUserService,
    private validator: typeof LoginValidator,
    private responseWrapper: typeof ResponseWrapper
  ) {
    this.route();
  };

  public Router = new Hono();
  private route() {
    this.Router.post("/", validator("json", (value, c) => {
      const { email, password } = value;
      try {
        this.validator.validate(email, password);
        return { email, password };
      } catch (err) {
        if (err instanceof InvalidRequestBodyError || err instanceof UserInvalidPasswordError)
          return c.json(new this.responseWrapper(false, err.message), 400)
        return c.json(new this.responseWrapper(false, (err as Error).message), 500)
      }
    }), async c => {
      const { email, password } = c.req.valid("json")!;
      const token = await this.loginService.service([email, password]);
      return c.json(token.res, token.code);
    });
  }
};
