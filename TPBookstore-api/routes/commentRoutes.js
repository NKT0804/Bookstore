import express from "express";
import expressAsyncHandler from "express-async-handler";
import { admin, protect } from "./../middleware/AuthMiddleware.js";
import CommentController from "../controllers/comment.controller.js";
const commentRouter = express.Router();

// commentRouter.get("/all/disabled", expressAsyncHandler());
// commentRouter.get("/:parentCommentId/reply", expressAsyncHandler());
commentRouter.patch("/:commentId/content", protect, expressAsyncHandler(CommentController.editComment));
commentRouter.patch("/:commentId/disable", protect, admin, expressAsyncHandler(CommentController.disableComment));
commentRouter.patch("/:commentId/restore", protect, admin, expressAsyncHandler(CommentController.restoreComment));
commentRouter.delete("/:commentId", protect, expressAsyncHandler(CommentController.deleteComment));
commentRouter.post("/", protect, expressAsyncHandler(CommentController.createComment));
commentRouter.get("/", protect, admin, expressAsyncHandler(CommentController.getCommentByAdmin));

export default commentRouter;
