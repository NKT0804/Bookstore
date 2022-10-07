import express from "express";
import expressAsyncHandler from "express-async-handler";
import { admin, protect } from "../middleware/AuthMiddleware.js";
import sliderControler from "../controllers/slider.controller.js";

const sliderRouter = express.Router();

export default sliderRouter;
