import { Hono } from "hono";
import type SendEmailService from "../application/sendEmail";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";

export default class EmailSendController {
  constructor(
    private emailService: SendEmailService,
    private jwtService: JwtAdapter
  ) {
    this.route();
  };
  public Router = new Hono();
  private route() {
    this.Router.put("/", this.jwtService.middleware, async c => {
      const { id } = c.get("jwtPayload");
      const response = await this.emailService.service(id);
      return c.json(response.res, response.code);
    })
  }
};
