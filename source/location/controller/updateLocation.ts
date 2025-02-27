import { Hono } from "hono";
import type JwtAdapter from "../../shared/infrastructure/JwtAdapter";
import { validator } from "hono/validator";
import type LocationDTO from "../infrastructure/LocationDTO";
import type UpdateLocationValidator from "../validators/UpdateLocationValidator";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import type UpdateLocationService from "../application/UpdateLocationService";

export default class UpdateLocationController {
  constructor(
    private jwtService: JwtAdapter,
    private validator: typeof UpdateLocationValidator,
    private responseWrapper: typeof ResponseWrapper,
    private updateService: UpdateLocationService
  ) {
    this.router()
  };
  public Router = new Hono();
  private router() {
    this.Router.patch("/", this.jwtService.middleware, validator("json", (value: LocationDTO, c) => {
      try {
        this.validator.validate(value);
        return value;
      }
      catch (error) {
        if (error instanceof InvalidRequestBodyError)
          return c.json(
            new this.responseWrapper(false, error.message),
            400
          );
      }
    }), async c => {
      const { id } = c.get("jwtPayload");
      const dto = c.req.valid("json")!;
      const newLocation = await this.updateService.service([dto, id]);
      return c.json(newLocation.res, newLocation.code)
    })
  };
}
