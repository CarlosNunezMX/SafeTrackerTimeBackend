import type { Server } from "bun";
import { Hono } from "hono";
import { logger } from "hono/logger";
import ApiRouter from "./router.ts"
export default class AppServer {
  private port = process.env["PORT"] || 3000;
  private app = new Hono();
  private server?: Server;

  constructor() {
    this.middleware();
  }

  private middleware() {
    this.app.use(logger());
    this.app.route("/api/v1", ApiRouter);
  };

  public listen() {
    this.server = Bun.serve({
      port: Number(this.port),
      fetch: this.app.fetch
    })
    console.log(`⚡ Server listening on ${this.port}!`);
  };
};
