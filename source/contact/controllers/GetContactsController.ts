import { Hono } from "hono/tiny";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import type GetContactsService from "../application/GetContactsService";

export default class GetContactController {
  public Router = new Hono();
  constructor(
    private jwtService: JwtAdapter,
    private responseWrapper: typeof ResponseWrapper,
    private GetContactsService: GetContactsService
  ) {
    this.route();
  };
  private route() {
    this.Router.get("/", this.jwtService.middleware, async c => {
      const { id } = c.get("jwtPayload")
      try {
        const contacts = await this.GetContactsService.getContacts(id);
        return c.json(new this.responseWrapper(true, contacts));
      } catch (error) {
        return c.json(new this.responseWrapper(false, (error as Error).message), 500);
      }
    })
  }
}
