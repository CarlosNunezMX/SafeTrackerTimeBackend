import { Hono } from "hono";
import GetLocationController from "../controller/getLocation";
import Constants from "../../shared/infrastructure/Constants";
import GetLocationService from "../application/GetLocationService";
import { ResponseWrapper } from "../../shared/domain/ResponseWrapper";

const getLocationService = new GetLocationService(
  Constants.LocationRepository,
  ResponseWrapper
);

const getLocationController = new GetLocationController(
  Constants.jwtService,
  getLocationService,
)
const locationRouter = new Hono();
locationRouter.route("/", getLocationController.Router);

export default locationRouter;
