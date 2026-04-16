import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import swaggerRoutes from "./swagger-ui.route";
import projectRoutes from "../modules/projects/project.routes";
import categoryRoutes from "../modules/categories/category.route";

const router = Router();

// Ruta de documentación Swagger
router.use("/docs", swaggerRoutes);

router.use("/auth", authRoutes)
router.use("/projects", projectRoutes)
router.use("/categories", categoryRoutes)

export default router;