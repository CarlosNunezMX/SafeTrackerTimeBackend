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
import EmailSendController from "../controllers/EmailSend.ts";
import SendEmailService from "../application/sendEmail.ts";
import EmailDetails from "../domain/EmailDetails.ts";
import VerificationController from "../controllers/VerificationController.tsx";
import VerificationService from "../application/VerificationService.ts";
import ValidateEmailBuilder from "./ValidateEmailBuilder.tsx";



// instances
const LoginService = new LoginUserService(Constants.UserRepository, Constants.passwordHasher, Constants.jwtService, ResponseWrapper);
const RegisterService = new RegisterUser(Constants.UserRepository, Constants.passwordHasher, ResponseWrapper, Constants.jwtService);

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
const sendEmailService = new SendEmailService(
  Constants.jwtService,
  Constants.UserRepository,
  ResponseWrapper,
  Constants.emailClient,
  EmailDetails,
  Constants.Env.HOST,
  ValidateEmailBuilder
)
const emailController = new EmailSendController(
  sendEmailService,
  Constants.jwtService
)
const verifyService = new VerificationService(
  Constants.jwtService,
  ResponseWrapper,
  Constants.UserRepository,
);
const verifyController = new VerificationController(
  verifyService
);

AuthRouter.route("/register", registerController.Router);
AuthRouter.route("/login", loginController.Router);
AuthRouter.route("/verify", emailController.Router)
AuthRouter.route("/verify", verifyController.Router)
export default AuthRouter;
