import { Hono } from "hono";
import VerifiedView from "../../views/verified";
import User from "../../user/domain/user";
import type VerificationService from "../application/VerificationService";
import { validator } from "hono/validator";
import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import VerfiedView from "../../views/verified";

export default class VerificationController {
  constructor(
    private validationService: VerificationService
  ) {
    this.route()
  };

  public Router = new Hono();

  private route() {
    this.Router.get("/", validator("query", (val, c) => {
      try {
        if (!val.token)
          throw new InvalidRequestBodyError("Se requiere un token para validar");
        if (Array.isArray(val.token))
          throw new InvalidRequestBodyError("Solo se puede validar un token a la vez");
        return { token: val.token };
      } catch (err) {
        return c.html(<VerfiedView error={(err as Error).message} />)
      }
    }), async c => {
      const { token } = c.req.valid("query")!;
      const response = await this.validationService.service(token)
      return c.html(<VerfiedView user={response.res.data instanceof User ? response.res.data : undefined} error={typeof response.res.data === "string" ? response.res.data : undefined} />, response.code)
    })
  };
};
