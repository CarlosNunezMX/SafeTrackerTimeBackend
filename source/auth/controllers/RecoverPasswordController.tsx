import { Hono } from "hono";
import { validator } from "hono/validator";
import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import RecoverPasswordView from "../../views/recoverpassword";
import type RecoverPasswordFormService from "../application/ResetPasswordFormService";

export default class RecoverPasswordController {
    constructor(
        private ResetPasswordViewService: RecoverPasswordFormService
    ) {
        this.enroute();
    }
    public Router = new Hono();
    private enroute() {
        this.Router.get("/", validator("query", (val, c) => {
            const { token } = val;
            try {
                if (Array.isArray(token))
                    throw new InvalidRequestBodyError("Solo se puede procesar un token!")
                if (!token)
                    throw new InvalidRequestBodyError("Se requiere un token!");
                return token;
            } catch (error) {
                return c.html(<RecoverPasswordView error={(error as Error).message} />);
            }
        }), async c => {
            const token = c.req.valid("query")!;
            const response = await this.ResetPasswordViewService.service(token);

            if (response.code !== 200)
                return c.html(<RecoverPasswordView error={response.res.data} />, response.code);
            else return c.html(<RecoverPasswordView token={token} />);
        })
    }
};