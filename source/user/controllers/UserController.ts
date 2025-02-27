import { Hono } from "hono/tiny";
import JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type AboutMeService from "../application/aboutMeService";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import UserNotFoundError from "../domain/UserNotFoundError";

export default class UserController {
  public Router = new Hono();
  constructor(
    private jwtAuth: JwtAdapter,
    private aboutMeService: AboutMeService,
  ) {
    this.router();
  };
  private router() {
    this.Router.get("/", this.jwtAuth.middleware, async c => {
      const { id } = c.get("jwtPayload");
      const user = await this.aboutMeService.service(id);
      // @ts-ignore
      return c.json(user.res, user.code);

    })
  }
};
