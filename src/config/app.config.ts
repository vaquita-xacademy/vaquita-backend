import { env } from "process";

export default {
  port: parseInt(env.APP_PORT ?? "3000", 10),
  nodeEnv: env.NODE_ENV ?? "development",
  frontendUrl: env.FRONTEND_URL ?? "",
};
