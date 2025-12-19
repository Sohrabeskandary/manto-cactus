import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

/**
 * GET all products
 */
router.get("/", getProducts);

/**
 * POST create product
 */
router.post("/", createProduct);

export default router;
