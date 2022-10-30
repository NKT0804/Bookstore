import express from "express";
import expressAsyncHandler from "express-async-handler";
import { admin, protect } from "./../middleware/AuthMiddleware.js";
import OrderController from "../controllers/order.controller.js";

const orderRouter = express.Router();

// orderRouter.get("/all", protect, admin, expressAsyncHandler());
// orderRouter.get("/disabled", protect, admin, expressAsyncHandler());
orderRouter.get("/ordered", protect, expressAsyncHandler(OrderController.getOrder));
orderRouter.patch("/:id/delivered", protect, expressAsyncHandler(OrderController.confirmDelivered));
orderRouter.patch("/:id/disable", protect, admin, expressAsyncHandler(OrderController.disableOrder));
orderRouter.patch("/:id/pay", protect, expressAsyncHandler(OrderController.payOrderByApi));
orderRouter.patch("/:id/restore", protect, admin, expressAsyncHandler(OrderController.restoreOrder));
orderRouter.delete("/:id", protect, admin, expressAsyncHandler(OrderController.deteleOrder));
orderRouter.get("/:id", protect, expressAsyncHandler(OrderController.getDetailOrderById));
orderRouter.get("/", protect, admin, expressAsyncHandler(OrderController.getOrderAdmin));
orderRouter.post("/", protect, expressAsyncHandler(OrderController.createNewOrder));
// orderRouter.post("/", protect, expressAsyncHandler());

export default orderRouter;
