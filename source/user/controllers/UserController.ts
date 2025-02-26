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
    private responseWrapper: typeof ResponseWrapper
  ) {
    this.router();
  };
  private router() {
    this.Router.get("/", this.jwtAuth.middleware, async c => {
      const { id } = c.get("jwtPayload");
      try {
        const user = await this.aboutMeService.aboutMe(id);
        return c.json(new this.responseWrapper(true, user));
      } catch (error) {
        if (error instanceof UserNotFoundError)
          return c.json(
            new this.responseWrapper(false, error.message),
            404
          )
        return c.json(
          new this.responseWrapper(false, (error as Error).message)
        )
      }

    })
  }
};
