import { Hono } from "hono";
import ValidateUserRegister from "../validators/ValidateUserRegister.ts";
import { ResponseWrapper } from "../../shared/domain/ResponseWrapper.ts";
import RegisterController from "../controllers/RegisterController.ts";


// Services
import RegisterUser from "../application/RegisterUser.ts";
import LoginUserService from "../application/LoginUser.ts";
import Constants from "../../shared/infrastructure/Constants.ts";
import LoginController from "../controllers/LoginController.ts";
import LoginValidator from "../validators/LoginValidator.ts";



// instances
const LoginService = new LoginUserService(Constants.prismaRepository, Constants.passwordHasher, Constants.jwtService, ResponseWrapper);
const RegisterService = new RegisterUser(Constants.prismaRepository, Constants.passwordHasher, ResponseWrapper, Constants.jwtService);

const AuthRouter = new Hono();


const registerController = new RegisterController(
  ValidateUserRegister,
  ResponseWrapper,
  RegisterService
);

const loginController = new LoginController(
  LoginService,
  LoginValidator,
  ResponseWrapper
)


AuthRouter.route("/register", registerController.Router);
AuthRouter.route("/login", loginController.Router);

export default AuthRouter;
