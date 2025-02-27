import { Hono } from "hono";
import GetLocationController from "../controller/getLocation";
import Constants from "../../shared/infrastructure/Constants";
import GetLocationService from "../application/GetLocationService";
import { ResponseWrapper } from "../../shared/domain/ResponseWrapper";
import UpdateLocationService from "../application/UpdateLocationService";
import UpdateLocationController from "../controller/updateLocation";
import UpdateLocationValidator from "../validators/UpdateLocationValidator";

const locationRouter = new Hono();

const getLocationService = new GetLocationService(
  Constants.LocationRepository,
  ResponseWrapper
);

const getLocationController = new GetLocationController(
  Constants.jwtService,
  getLocationService,
)

const updateService = new UpdateLocationService(
  Constants.LocationRepository,
  ResponseWrapper
);

const updateController = new UpdateLocationController(
  Constants.jwtService,
  UpdateLocationValidator,
  ResponseWrapper,
  updateService
)

locationRouter.route("/", getLocationController.Router);
locationRouter.route("/", updateController.Router)

export default locationRouter;
