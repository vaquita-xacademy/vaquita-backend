import { Router } from "express";
import swaggerRoutes from "./swagger-ui.route";

const router = Router();

// Rutas principales
// router.use("/auth", authRoutes)

// Ruta de documentación Swagger
router.use("/docs", swaggerRoutes);

export default router;