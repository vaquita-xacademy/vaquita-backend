import { Router } from "express";
import { ProjectController } from "./project.controller";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { passportConfig } from "../../config/passport.config";

const router = Router();
const projectController = new ProjectController();

router.get(
  "/",
  projectController.findAll
);

router.get(
  "/:id",
  projectController.findById
);

router.post(
  "/",
  passportConfig.authenticate("jwt", { session: false }),
  validateDto(CreateProjectDto),
  projectController.create
);

// La edicion queda protegida para que solo el usuario autenticado intente modificar.
router.patch(
  "/:id",
  passportConfig.authenticate("jwt", { session: false }),
  validateDto(UpdateProjectDto),
  projectController.update
);

export default router;
