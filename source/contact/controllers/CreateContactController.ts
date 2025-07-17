import { Hono } from "hono";
import { validator } from "hono/validator";

import type CreateContactService from "../application/CreateContactService";
import ContactDTO from "../infrastructure/ContactDTO";
import type CreateContactBodyChecker from "../infrastructure/CreateContactBodyChecker";
import InvalidContactError from "../domain/InvalidContactError";

import type JwtAdapter from "@shared/infrastructure/JwtAdapter";
import type { ResponseWrapper } from "@shared/domain/ResponseWrapper";

export default class CreateContactController {
  public Router = new Hono();
  constructor(
    private jwtService: JwtAdapter,
    private createContactService: CreateContactService,
    private phoneValidator: typeof CreateContactBodyChecker,
    private responseWrapper: typeof ResponseWrapper
  ) {
    this.route();
  };
  private route() {
    this.Router.post("/", this.jwtService.middleware,
      validator("json", (value, c) => {
        const { id } = c.get("jwtPayload")
        const { name, phone } = value;
        try {
          const dto = new ContactDTO(phone, name, id);
          this.phoneValidator.check(dto);
          return dto;
        }
        catch (err) {
          if (err instanceof InvalidContactError)
            return c.json(
              new this.responseWrapper(false, err.message),
              400
            )
          return c.json(
            new this.responseWrapper(false, (err as Error).message),
            500
          )
        }
      })
      , async c => {
        const dto = c.req.valid("json")
        const contacts = await this.createContactService.service(dto);
        return c.json(contacts.res, contacts.code);
      })
  }
};
