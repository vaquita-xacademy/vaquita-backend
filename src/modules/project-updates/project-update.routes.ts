import { Router } from "express";
import { ProjectUpdateController } from "./project-update.controller";
import { uploadImage } from "../../middlewares/upload.middleware";
import { authorizeProfile } from "../../middlewares/authorize-profile.middleware";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { validateDto, validateParams } from "../../middlewares/validate-dto.middleware";
import { CreateEvidenceDTO, ProjectIdParamDTO } from "./dto/create-evidence.dto";
import { UpdateEvidenceDTO } from "./dto/update-evidence.dto";

const router = Router({ mergeParams: true });
const projectUpdateController = new ProjectUpdateController();

router.get(
    "/", 
    validateParams(ProjectIdParamDTO),
    projectUpdateController.index
);

router.post(
    "/", 
    authenticateJwt,
    // authorizeProfile,
    uploadImage("receipt"), 
    validateDto(CreateEvidenceDTO),
    projectUpdateController.create
);

router.patch(
    "/:id", 
    authenticateJwt,
    // authorizeProfile,
    uploadImage("receipt"), 
    validateDto(UpdateEvidenceDTO),
    projectUpdateController.update
);

export default router;