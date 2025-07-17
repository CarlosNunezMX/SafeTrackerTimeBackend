import { Hono } from "hono";

import UserController from "../controllers/UserController";
import ModifyUserController from "../controllers/ModifyUserController";

import UserUpdateService from "../application/UpdateService";
import AboutMeService from "../application/aboutMeService";

import UpdateUserValidator from "../validators/UpdateUser";

import Constants from "@shared/infrastructure/Constants";
import { ResponseWrapper } from "@shared/domain/ResponseWrapper";

const UserRouter = new Hono();

// services instances 
const aboutMeService = new AboutMeService(
  Constants.UserRepository,
  ResponseWrapper
)

const modifySerivice = new UserUpdateService(
  Constants.UserRepository,
  ResponseWrapper
);

// controllers 
const aboutMeController = new UserController(Constants.jwtService, aboutMeService);
const updateUserController = new ModifyUserController(
  Constants.jwtService,
  ResponseWrapper,
  UpdateUserValidator,
  modifySerivice
)

//Attach to main router 
UserRouter.route("/", aboutMeController.Router);
UserRouter.route("/", updateUserController.Router)
export default UserRouter;


