import express from "express";
import expressAsyncHandler from "express-async-handler";
import sliderControler from "../controllers/slider.controller.js";
import { admin, protect, optional } from "../middleware/AuthMiddleware.js";

const sliderRouter = express.Router();

sliderRouter.post("/", protect, admin, expressAsyncHandler(sliderControler.createSlider));
sliderRouter.get("/", optional, expressAsyncHandler(sliderControler.getSlider));
sliderRouter.put("/:id", protect, admin, expressAsyncHandler(sliderControler.updateSlider));
sliderRouter.delete("/:id", protect, admin, expressAsyncHandler(sliderControler.deleteSlider));
sliderRouter.patch("/:id/restore", protect, admin, expressAsyncHandler(sliderControler.restoreSlider));
sliderRouter.patch("/:id/disable", protect, admin, expressAsyncHandler(sliderControler.disableSlider));
export default sliderRouter;
