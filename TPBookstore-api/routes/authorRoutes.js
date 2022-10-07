import express from "express";
import expressAsyncHandler from "express-async-handler";
import { admin, protect } from "../middleware/AuthMiddleware.js";
import authorControler from "../controllers/author.controller.js";

const authorRouter = express.Router();

export default authorRouter;
