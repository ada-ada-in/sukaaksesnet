import { ProductController } from "../app/controllers/product.controller.js";
import { globalLimiter } from "../middleware/rateLimiter.middleware.js";
import express from "express";


const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/products", globalLimiter, productController.getAllProducts);
productRouter.get("/products/:id", globalLimiter, productController.getProductById);

export default productRouter;