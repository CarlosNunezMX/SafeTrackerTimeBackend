import { Hono } from "hono";
import UserController from "../controllers/UserController";
import Constants from "../../shared/infrastructure/Constants";
import AboutMeService from "../application/aboutMeService";
import { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import ModifyUserController from "../controllers/ModifyUserController";
import UpdateUserValidator from "../validators/UpdateUser";
import UserUpdateService from "../application/UpdateService";

const UserRouter = new Hono();

// services instances 
const aboutMeService = new AboutMeService(
  Constants.prismaRepository
)

const modifySerivice = new UserUpdateService(
  Constants.prismaRepository,
  ResponseWrapper
);

// controllers 
const controller = new UserController(Constants.jwtService, aboutMeService, ResponseWrapper);
const updateUserController = new ModifyUserController(
  Constants.jwtService,
  ResponseWrapper,
  UpdateUserValidator,
  modifySerivice
)

//Attach to main router 
UserRouter.route("/", controller.Router);
UserRouter.route("/", updateUserController.Router)
export default UserRouter;


