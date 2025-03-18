import { Hono } from "hono";
import { validator } from "hono/validator";
import type EmailValidator from "../validators/EmailValidator";
import type ValidateRecoverAndVerification from "../validators/ValidateRecoverAndVerification";
import CatchResponseError from "../../shared/infrastructure/catchError";
import type { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import type ResetPasswordService from "../application/ResetPassword";

export default class RecoverSendEmailController {
    constructor(
        private validation: typeof ValidateRecoverAndVerification,
        private emailValidator: typeof EmailValidator,
        private service: ResetPasswordService,
        private wrapper: typeof ResponseWrapper
    ) {
        this.enroute();
    };
    public Router = new Hono();
    private enroute() {
        this.Router.put("/", validator("json", (val, c) => {
            try {
                const { email } = val;
                this.validation.validate(email, this.emailValidator);
                return { email };
            } catch (err) {
                const res = CatchResponseError(this.wrapper, err);
                return c.json(res.res, res.code);
            };
        }), async c => {
            const { email } = c.req.valid("json");
            const res = await this.service.service(email);
            return c.json(res.res, res.code);
        })
    };
};