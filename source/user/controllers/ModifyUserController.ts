import { Hono } from "hono";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import type UpdateUserValidator from "../validators/UpdateUser";
import type UserUpdateService from "../application/UpdateService";

import UserDTO from "../infrastructure/UserDTO";
import { validator } from "hono/validator";

export default class ModifyUserController {
  public Router = new Hono();
  constructor(
    private jwtService: JwtAdapter,
    private responseWrapper: typeof ResponseWrapper,
    private validationService: typeof UpdateUserValidator,
    private modifyService: UserUpdateService
  ) {
    this.route();
  };
  private route() {
    this.Router.patch("/", this.jwtService.middleware, validator("json", (val: Partial<UserDTO>, c) => {
      try {
        this.validationService.validate(val);
        return new UserDTO(
          val.email!,
          val.phone!,
          val.firstName!,
          val.lastName!,
          val.password!
        );
      } catch (err) {
        return c.json(new this.responseWrapper(false, (err as Error).message), 400);
      }
    }), async c => {
      const dto = c.req.valid("json");
      const { id } = c.get("jwtPayload")
      const res = await this.modifyService.service([dto, id]);
      // @ts-ignore
      return c.json(res.res, res.code);
    })
  }
};
