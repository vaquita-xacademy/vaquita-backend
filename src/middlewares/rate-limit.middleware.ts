import { rateLimit } from "express-rate-limit";

export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Demasiados intentos. Intenta de nuevo en 15 minutos." },
});
