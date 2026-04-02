import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateDto, validateParams, validateQuery } from "../../middlewares/validate-dto.middleware";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { authorizeProfile } from "../../middlewares/authorize-profile.middleware";
import { ListProjectsQueryDTO } from "./dto/list-projects-query.dto";
import { ProjectParamDTO } from "./dto/project-param.dto";

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
    validateParams(ProjectParamDTO),
    projectController.findBySlug
);

export default router;