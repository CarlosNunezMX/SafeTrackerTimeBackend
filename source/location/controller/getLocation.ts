import { Hono } from "hono";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type GetLocationService from "../application/GetLocationService";

export default class GetLocationController {
  constructor(
    private jwtService: JwtAdapter,
    private locationService: GetLocationService
  ) {
    this.router();
  };

  public Router = new Hono();

  private router() {
    this.Router.get("/", this.jwtService.middleware, async c => {
      const { id } = c.get("jwtPayload");
      const location = await this.locationService.service(id);
      // @ts-ignore
      return c.json(location.res, location.code)
    })
  };
};
