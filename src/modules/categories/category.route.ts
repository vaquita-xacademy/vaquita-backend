import { Router } from "express";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { UserRole } from "../../types/enums";
import { validateDto, validateParams } from "../../middlewares/validate-dto.middleware";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { CategoryController } from "./category.controller";
import { IdParamDTO } from "../projects/dto/project-param.dto";
import { authorizeRoles } from "../../middlewares/authorize-profile.middleware";

const router = Router();
const categoryController = new CategoryController();


router.get(
    "/",
    categoryController.findAll
);

router.post(
    "/",
    authenticateJwt,
    authorizeRoles(UserRole.ADMIN),
    validateDto(CreateCategoryDTO),
    categoryController.create
);

router.delete(
    "/:id",
    authenticateJwt,
    authorizeRoles(UserRole.ADMIN),
    validateParams(IdParamDTO),
    categoryController.delete
);

export default router;