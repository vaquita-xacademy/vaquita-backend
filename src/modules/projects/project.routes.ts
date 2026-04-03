import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateDto, validateParams, validateQuery } from "../../middlewares/validate-dto.middleware";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { authorizeProfile } from "../../middlewares/authorize-profile.middleware";
import { ListProjectsQueryDTO } from "./dto/list-projects-query.dto";
import { IdParamDTO, SlugParamDTO } from "./dto/project-param.dto";
import { UpdateProjectDTO } from "./dto/update-project.dto";

const router = Router();
const projectController = new ProjectController();

router.post(
    "/",
    authenticateJwt,
    authorizeProfile,
    validateDto(CreateProjectDTO),
    projectController.create
);

router.get(
    "/",
    validateQuery(ListProjectsQueryDTO),
    projectController.listProjects
);

router.get(
    "/:slug",
    validateParams(SlugParamDTO),
    projectController.findBySlug
);

router.patch(
    "/:id",
    authenticateJwt,
    authorizeProfile,
    validateParams(IdParamDTO),
    validateDto(UpdateProjectDTO),
    projectController.update
);

router.delete(
    "/:id",
    authenticateJwt,
    authorizeProfile,
    validateParams(IdParamDTO),
    projectController.delete
);

export default router;