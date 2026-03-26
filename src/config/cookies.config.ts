import { env } from "process";

const isProduction = env.NODE_ENV === "production";

export default {
    secret: env.COOKIE_SECRET ?? "",
    cookieOptions: {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        signed: true,
    } as const
};