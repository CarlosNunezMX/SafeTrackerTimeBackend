import { Hono } from "hono";
import type ChangePasswordService from "../application/ChangePassword";
import { validator } from "hono/validator";
import InvalidRequestBodyError from "../../shared/domain/InvalidRequestBodyError";
import UserInvalidPasswordError from "../../user/domain/UserInvalidPasswordError";
import ChangedPasswordView from "../../views/ChangedPassword";

export default class SuccessfulChangedPasswordController {
    constructor(
        private changePasswordService: ChangePasswordService,
    ){
        this.enroute();
    };

    public Router = new Hono();
    private enroute(){
       this.Router.post("/", validator("form", (val, c) => {
            console.log({val})
            const {password, token} = val;
            try {
                if(!token)
                    throw new InvalidRequestBodyError("El token es invalido");    
                if(password.length <= 8)
                    throw new UserInvalidPasswordError();
                if(Array.isArray(password) || Array.isArray(token))
                    throw new InvalidRequestBodyError("La solicitud es invalida");
                return {password, token};
            }catch(error){
                return c.html(<ChangedPasswordView error={(error as Error).message}/>, 400) 
            }
       }), async c => {
            const {password, token} = c.req.valid("form")
            const {code, res} = await this.changePasswordService.service({password: password.toString(), token: token.toString()});
            if(code !== 200)
                return c.html(<ChangedPasswordView error={res.data}/>, code);
            return c.html(<ChangedPasswordView/>) 
       }) 
    };
    
};