import { Hono } from "hono/tiny";
import JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import { validator } from "hono/validator";
import type UpdateValidator from "../infrastructure/UpdateValidator";
import ContactDTO from "../infrastructure/ContactDTO";
import InvalidContactError from "../domain/InvalidContactError";
import type UpdateContactService from "../application/UpdateContactService.ts";

export default class UpdateContactController {
  public Router = new Hono();
  constructor(
    private jwtAuth: JwtAdapter,
    private responseWrapper: typeof ResponseWrapper,
    private updateValidator: typeof UpdateValidator,
    private updateService: UpdateContactService
  ) {
    this.router();
  };
  private router() {
    this.Router.patch("/:id", this.jwtAuth.middleware,
      validator("json", (value, c) => {
        const { phone, name } = value;
        const { id } = c.req.param();

        const dto = new ContactDTO(phone, name, id);
        try {
          this.updateValidator.validate(dto);
          return dto;
        }
        catch (error) {
          if (error instanceof InvalidContactError)
            return c.json(new this.responseWrapper(false, error.message), 400);
          return c.json(new this.responseWrapper(false, (error as Error).message));
        }
      })
      , async c => {
        const dto = c.req.valid("json")!;
        const updatedContacts = await this.updateService.service([dto, dto.userID!]);
        return c.json(
          updatedContacts.res,
          // @ts-ignore
          updatedContacts.code
        )

      })
  }
};
