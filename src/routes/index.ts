import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import projectRoutes from "../modules/projects/project.routes";

const router = Router();

router.use("/users", authRoutes);
router.use("/projects", projectRoutes);

export default router;
