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
import RecoverPasswordController from "../controllers/RecoverPasswordController.tsx";
import RecoverPasswordFormService from "../application/ResetPasswordFormService.ts";
import ResetPasswordService from "../application/ResetPassword.ts";
import { RecoverPasswordEmailBuilder } from "./RecoverPasswordEmailBuilder.tsx";
import RecoverSendEmailController from "../controllers/RecoverSendEmail.ts";
import ValidateRecoverAndVerification from "../validators/ValidateRecoverAndVerification.ts";
import EmailValidator from "../validators/EmailValidator.ts";
import ChangePasswordService from "../application/ChangePassword.ts";
import SuccessfulChangedPasswordController from "../controllers/SuccessfullChangedPassword.tsx";

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
);

const sendEmailService = new SendEmailService(
  Constants.jwtService,
  Constants.UserRepository,
  ResponseWrapper,
  Constants.emailClient,
  EmailDetails,
  Constants.Env.HOST,
  ValidateEmailBuilder
);

const emailController = new EmailSendController(
  sendEmailService,
  Constants.jwtService
);

const verifyService = new VerificationService(
  Constants.jwtService,
  ResponseWrapper,
  Constants.UserRepository,
);

const verifyController = new VerificationController(
  verifyService
);

const recoverFormService = new RecoverPasswordFormService(
  Constants.jwtService,
  Constants.UserRepository,
  ResponseWrapper
);

const recoverFormController = new RecoverPasswordController(recoverFormService);

const recoverSenderService = new ResetPasswordService(
  Constants.jwtService,
  Constants.UserRepository,
  ResponseWrapper,
  EmailDetails,
  RecoverPasswordEmailBuilder,
  Constants.Env.HOST,
  Constants.emailClient
);

const recoverSenderController = new RecoverSendEmailController(
  ValidateRecoverAndVerification,
  EmailValidator,
  recoverSenderService,
  ResponseWrapper
)
const changedPasswordService = new ChangePasswordService(
  Constants.UserRepository,
  Constants.jwtService,
  Constants.passwordHasher,
  ResponseWrapper
);

const changedPasswordController = new SuccessfulChangedPasswordController(
  changedPasswordService
);

AuthRouter.route("/register", registerController.Router);
AuthRouter.route("/login", loginController.Router);
AuthRouter.route("/verify", emailController.Router);
AuthRouter.route("/verify", verifyController.Router);
AuthRouter.route("/recover", recoverFormController.Router);
AuthRouter.route("/recover", recoverSenderController.Router)
AuthRouter.route("/recover", changedPasswordController.Router);
export default AuthRouter;
