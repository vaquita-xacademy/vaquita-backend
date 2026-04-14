import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import swaggerRoutes from "./swagger-ui.route";
import projectRoutes from "../modules/projects/project.routes";
import donationsRoutes from "../modules/donations/donation.routes";
import paymentsRoutes from "../modules/payments/payment.routes";

const router = Router();

// Ruta de documentación Swagger
router.use("/docs", swaggerRoutes);

router.use("/auth", authRoutes)
router.use("/projects", projectRoutes)
router.use("/donations", donationsRoutes)
router.use("/payments", paymentsRoutes)

export default router;