import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateProjectDTO } from "./dto/create-project.dto";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { authorizeProfile } from "../../middlewares/authorize-profile.middleware";
import { ListProjectsQueryDTO } from "./dto/list-projects-query.dto";
import { PaginateQueryDTO } from "./dto/paginate-query.dto";

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
    // validateDto(PaginateQueryDTO),
    // validateDto(ListProjectsQueryDTO),
    projectController.listProjects
);

export default router;