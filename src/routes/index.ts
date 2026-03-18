import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.use("/users", authRoutes);

export default router;