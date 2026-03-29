import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import swaggerRoutes from "./swagger-ui.route";
import projectRoutes from "../modules/projects/project.routes";

const router = Router();

// Ruta de documentación Swagger
router.use("/docs", swaggerRoutes);
router.use("/projects", projectRoutes)

router.use("/auth", authRoutes)


export default router;