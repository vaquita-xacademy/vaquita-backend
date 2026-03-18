import { env } from "process";

export const jwtConfig = {
    access_secret: env.JWT_SECRET ?? "",
    access_expire: env.JWT_EXPIRES_IN ?? "8h",
};