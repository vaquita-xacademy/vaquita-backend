import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import swaggerRoutes from "./swagger-ui.route";

const router = Router();

// Ruta de documentación Swagger
router.use("/docs", swaggerRoutes);

router.use("/auth", authRoutes)


export default router;