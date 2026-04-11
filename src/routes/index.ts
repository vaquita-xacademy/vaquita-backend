import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import swaggerRoutes from "./swagger-ui.route";
import projectRoutes from "../modules/projects/project.routes";
import verifiedProfileRoutes from "../modules/verified-profiles/verified-profile.routes";
import organizationRoutes from "../modules/organizations/organization.routes";
import donationRoutes from "../modules/donations/donation.routes";

const router = Router();

// Ruta de documentación Swagger
router.use("/docs", swaggerRoutes);

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/verified-profiles", verifiedProfileRoutes);
router.use("/organizations", organizationRoutes);
router.use("/donations", donationRoutes);

export default router;