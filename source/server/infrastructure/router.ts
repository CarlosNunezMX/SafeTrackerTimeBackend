import { Hono } from "hono";
import authRouter from "../../auth/infrastructure/router.ts"
import UserRouter from "../../user/infrastructure/router.ts";
import ContactRouter from "../../contact/infrastructure/router.ts";

const ApiRouter = new Hono();
ApiRouter.route("/auth", authRouter);
ApiRouter.route("/users", UserRouter);
ApiRouter.route("/contacts", ContactRouter)

export default ApiRouter;

