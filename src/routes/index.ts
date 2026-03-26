import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import swaggerRoutes from "./swagger-ui.route";

const router = Router();

router.use("/auth", authRoutes)

// Ruta de documentación Swagger
router.use("/docs", swaggerRoutes);

export default router;