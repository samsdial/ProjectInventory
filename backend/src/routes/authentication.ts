import { Router } from "express";
import authenticationController from "../controllers/authenticationController";

const router = Router();

router.post("/register", authenticationController.register);
router.post("/login", authenticationController.userLogin);

export default router;
