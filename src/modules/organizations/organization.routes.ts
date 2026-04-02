import { Router } from "express";
import { OrganizationController } from "./organization.controller";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { authorizeAdmin } from "../../middlewares/authorize-admin.middleware";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateOrganizationDTO } from "./dto/create-organization.dto";
import { UpdateOrganizationDTO } from "./dto/update-organization.dto";
import { CreateOrgVerificationDTO } from "./dto/create-org-verification.dto";
import { UpdateOrgVerificationStatusDTO } from "./dto/update-org-verification-status.dto";

const router = Router();
const controller = new OrganizationController();

// Owner: mis organizaciones
router.get(
    "/mine",
    authenticateJwt,
    controller.listMine
);

// Admin: todas las organizaciones
router.get(
    "/",
    authenticateJwt,
    authorizeAdmin,
    controller.listAll
);

// Público: detalle de una organización
router.get(
    "/:id",
    controller.getById
);

// Owner: crear organización
router.post(
    "/",
    authenticateJwt,
    validateDto(CreateOrganizationDTO),
    controller.create
);

// Owner: editar su organización
router.patch(
    "/:id",
    authenticateJwt,
    validateDto(UpdateOrganizationDTO),
    controller.update
);

// Owner: enviar verificación de organización
router.post(
    "/:id/verification",
    authenticateJwt,
    validateDto(CreateOrgVerificationDTO),
    controller.createVerification
);

// Owner o Admin: ver verificación de organización
router.get(
    "/:id/verification",
    authenticateJwt,
    controller.getVerification
);

// Admin: aprobar o rechazar verificación
router.patch(
    "/:id/verification/status",
    authenticateJwt,
    authorizeAdmin,
    validateDto(UpdateOrgVerificationStatusDTO),
    controller.updateVerificationStatus
);

export default router;
