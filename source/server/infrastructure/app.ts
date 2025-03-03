import AppServer from "./server"
import envCheck, { Env } from "./envCheck.ts"

envCheck();
Env.loadEnv()
new AppServer().listen();
