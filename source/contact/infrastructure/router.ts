import { Hono } from "hono";
import CreateContactController from "../controllers/CreateContactController.ts"
import Constants from "../../shared/infrastructure/Constants";
import GetContactController from "../controllers/GetContactsController.ts";
import { ResponseWrapper } from "../../shared/domain/ResponseWrapper.ts";
import GetContactsService from "../application/GetContactsService.ts";
import CreateContactService from "../application/CreateContactService.ts";
import CreateContactBodyChecker from "./CreateContactBodyChecker.ts";
import UpdateContactController from "../controllers/UpdateContactController.ts";
import UpdateValidator from "./UpdateValidator.ts";
import UpdateContactService from "../application/UpdateContactService.ts";

const createContactService = new CreateContactService(
  Constants.ContactsRepository,
  ResponseWrapper);

const createContactController = new CreateContactController(
  Constants.jwtService,
  createContactService,
  CreateContactBodyChecker,
  ResponseWrapper
)

const getContactService = new GetContactsService(
  Constants.ContactsRepository,
  ResponseWrapper
);

const getContactsController = new GetContactController(
  Constants.jwtService,
  getContactService
);

const updateService = new UpdateContactService(
  Constants.ContactsRepository,
  ResponseWrapper
);

const updateContactController = new UpdateContactController(
  Constants.jwtService,
  ResponseWrapper,
  UpdateValidator,
  updateService
);

const ContactRouter = new Hono();
ContactRouter.route("/", createContactController.Router);
ContactRouter.route("/", getContactsController.Router)
ContactRouter.route("/", updateContactController.Router)

export default ContactRouter;

