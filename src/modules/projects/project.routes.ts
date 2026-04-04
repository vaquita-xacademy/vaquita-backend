import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateDto, validateParams, validateQuery } from "../../middlewares/validate-dto.middleware";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { UpdateProjectDTO } from "./dto/update-project.dto";
import { UpdateProjectStatusDTO } from "./dto/update-project-status.dto";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { authorizeProfile } from "../../middlewares/authorize-profile.middleware";
import { ListProjectsQueryDTO } from "./dto/list-projects-query.dto";
import { IdParamDTO, SlugParamDTO } from "./dto/project-param.dto";

const router = Router();
const projectController = new ProjectController();

// Publicos
router.get(
    "/",
    validateQuery(ListProjectsQueryDTO),
    projectController.listProjects
);

// /mine debe ir antes de /:slug para que Express no capture "mine" como parametro
router.get(
    "/mine",
    authenticateJwt,
    validateQuery(ListProjectsQueryDTO),
    projectController.listMine
);

router.get(
    "/:slug",
    validateParams(SlugParamDTO),
    projectController.getBySlug
);

router.post(
    "/",
    authenticateJwt,
    authorizeProfile,
    validateDto(CreateProjectDTO),
    projectController.create
);

router.patch(
    "/:id",
    authenticateJwt,
    authorizeProfile,
    validateParams(IdParamDTO),
    validateDto(UpdateProjectDTO),
    projectController.update
);

router.patch(
    "/:id/status",
    authenticateJwt,
    validateDto(UpdateProjectStatusDTO),
    projectController.updateStatus
);

router.delete(
    "/:id",
    authenticateJwt,
    authorizeProfile,
    validateParams(IdParamDTO),
    projectController.delete
);

export default router;
