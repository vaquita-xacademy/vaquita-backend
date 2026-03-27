import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { authenticateJwt, authenticateLocal } from "../../middlewares/authenticate.middleware";

const router = Router();
const authController = new AuthController;

router.post(
  '/register',
  validateDto(CreateUserDto),
  authController.registerUser
);

router.post(
  '/login',
  validateDto(LoginDto),
  authenticateLocal,
  authController.login
);

router.post(
  '/logout',
  authenticateJwt,
  authController.logout
);

router.get(
  '/me',
  authenticateJwt,
  authController.session
);

export default router;