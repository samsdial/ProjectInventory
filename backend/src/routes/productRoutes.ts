import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct, getAllTransactions } from "../controllers/productController";

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct as express.RequestHandler);
router.delete("/products/:id", deleteProduct as express.RequestHandler);
router.get("/transactions", getAllTransactions);

export default router;
