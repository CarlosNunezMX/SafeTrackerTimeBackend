import { Hono } from "hono/tiny";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type LoginUserService from "../../user/application/LoginUser";
import { validator } from "hono/validator";
import type LoginValidator from "../validators/LoginValidator";
import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import UserInvalidPasswordError from "../../user/domain/UserInvalidPasswordError";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";

export default class LoginController {
  constructor(
    private jwtService: JwtAdapter,
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
      try {
        const { email, password } = c.req.valid("json")!;
        const token = await this.loginService.login(email, password);
        return c.json(new this.responseWrapper(true, token));
      } catch (err) {
        return c.json(new this.responseWrapper(false, (err as Error).message), 500)
      }
    });
  }
};
