import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateUserDto } from "../users/dto/create-user.dto";

const router = Router();
const authController = new AuthController;

router.post(
  '/register',
  validateDto(CreateUserDto),
  authController.registerUser
);

export default router;