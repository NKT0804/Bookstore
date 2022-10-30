import express from "express";
import expressAsyncHandler from "express-async-handler";
import { admin, protect, optional } from "./../middleware/AuthMiddleware.js";
import ProductController from "../controllers/product.controller.js";
const productRouter = express.Router();

//TODO: validate product infor when creating & updating

// productRouter.get("/updatenewfield", expressAsyncHandler(ProductController.updatenewfield));
productRouter.get("/:id/comments", expressAsyncHandler(ProductController.getProductComments));
productRouter.patch("/:id/disable", protect, admin, expressAsyncHandler(ProductController.disableProduct));
productRouter.patch("/:id/restore", protect, admin, expressAsyncHandler(ProductController.restoreProduct));
productRouter.post("/:id/review", protect, expressAsyncHandler(ProductController.reviewProduct));
// productRouter.get("/:slug", expressAsyncHandler(ProductController.getDetailProductBySlug));
productRouter.get("/:id", expressAsyncHandler(ProductController.getDetailProductById));
productRouter.put("/:id", protect, admin, expressAsyncHandler(ProductController.updateProduct));
productRouter.delete("/:id", protect, admin, expressAsyncHandler(ProductController.deleteProduct));
productRouter.get("/", optional, expressAsyncHandler(ProductController.getProducts));
productRouter.post("/", protect, admin, expressAsyncHandler(ProductController.createProduct));

export default productRouter;
