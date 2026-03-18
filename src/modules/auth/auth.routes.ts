import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateDonorDto } from "../donors/dto/create-donor.dto";
import { LoginDto } from "./dto/login.dto";
import { passportConfig } from "../../config/passport.config";

const router = Router();
const authController = new AuthController;

router.post(
  '/register/donor',
  validateDto(CreateDonorDto),
  authController.registerDonor
);

router.post(
  "/login",
  validateDto(LoginDto),
  authController.login
);

router.post(
  "/logout",
  authController.logout
);

// Esta ruta permite validar rapido si el JWT de la cookie sigue siendo valido.
router.get(
  "/me",
  passportConfig.authenticate("jwt", { session: false }),
  authController.me
);

export default router;
