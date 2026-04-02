import { Router } from "express";
import { DonationController } from "./donation.controller";
import { authenticateJwt } from "../../middlewares/authenticate.middleware";
import { validateDto } from "../../middlewares/validate-dto.middleware";
import { CreateDonationDTO } from "./dto/create-donation.dto";

const router = Router();
const controller = new DonationController();

// Donor: crear donación
router.post(
    "/",
    authenticateJwt,
    validateDto(CreateDonationDTO),
    controller.create
);

// Donor: ver su historial
router.get(
    "/mine",
    authenticateJwt,
    controller.listMine
);

export default router;
