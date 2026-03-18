import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateDonorDto } from "../donors/dto/create-donor.dto";

const router = Router();
const authController = new AuthController;

router.post(
  '/register/donor',
  validateDto(CreateDonorDto),
  authController.registerDonor
);

export default router;