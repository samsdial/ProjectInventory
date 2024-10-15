import { Router } from "express";
import { chartgenController } from "../controllers";

const router = Router();

router.get("/getTransactionHistory", chartgenController.getTransactionHistory);
router.get("/getTopMovements", chartgenController.getTopMovements);

export default router;
