import { Hono } from "hono";
import ValidateUserRegister from "../validators/ValidateUserRegister.ts";
import { ResponseWrapper } from "../../shared/domain/ResponseWrapper.ts";
import RegisterController from "../controllers/RegisterController.ts";


// Services
import AuthService from "../application/AuthService.ts";
import RegisterUser from "../../user/application/RegisterUser.ts";
import LoginUserService from "../../user/application/LoginUser.ts";
import Constants from "../../shared/infrastructure/Constants.ts";
import LoginController from "../controllers/LoginController.ts";
import LoginValidator from "../validators/LoginValidator.ts";



// instances
const LoginService = new LoginUserService(Constants.prismaRepository, Constants.passwordHasher, Constants.jwtService);
const RegisterService = new RegisterUser(Constants.prismaRepository, Constants.passwordHasher);

const AuthRouter = new Hono();


const registerController = new RegisterController(
  ValidateUserRegister,
  ResponseWrapper,
  new AuthService(RegisterService, LoginService, Constants.jwtService)
);

const loginService = new LoginUserService(
  Constants.prismaRepository,
  Constants.passwordHasher,
  Constants.jwtService
)

const loginController = new LoginController(
  Constants.jwtService,
  loginService,
  LoginValidator,
  ResponseWrapper
)


AuthRouter.route("/register", registerController.Router);
AuthRouter.route("/login", loginController.Router);

export default AuthRouter;
