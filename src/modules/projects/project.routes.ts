import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { authorizeProfile } from "../../middlewares/authorize-profile.middleware";

const router = Router();
const projectController = new ProjectController();

router.post(
    "/",
    authenticateJwt,
    authorizeProfile,
    validateDto(CreateProjectDTO),
    projectController.create
);

export default router;