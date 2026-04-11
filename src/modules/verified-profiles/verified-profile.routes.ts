import { Router } from "express";
import { VerifiedProfileController } from "./verified-profile.controller";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { authorizeAdmin } from "../../middlewares/authorize-admin.middleware";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateVerifiedProfileDTO } from "./dto/create-verified-profile.dto";
import { UpdateVerifiedProfileStatusDTO } from "./dto/update-verified-profile-status.dto";

const router = Router();
const controller = new VerifiedProfileController();

// Owner: enviar perfil de verificación
router.post(
    "/",
    authenticateJwt,
    validateDto(CreateVerifiedProfileDTO),
    controller.create
);

// Owner: consultar su propio perfil
router.get(
    "/mine",
    authenticateJwt,
    controller.getMine
);

// Admin: listar todos los perfiles
router.get(
    "/",
    authenticateJwt,
    authorizeAdmin,
    controller.listAll
);

// Admin: aprobar o rechazar un perfil
router.patch(
    "/:id/status",
    authenticateJwt,
    authorizeAdmin,
    validateDto(UpdateVerifiedProfileStatusDTO),
    controller.updateStatus
);

export default router;
