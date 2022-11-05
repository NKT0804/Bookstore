import express from "express";
import expressAsyncHandler from "express-async-handler";
import { admin, protect } from "./../middleware/AuthMiddleware.js";
import { upload } from "./../middleware/UploadMiddleware.js";
import UserController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", expressAsyncHandler(UserController.login));
userRouter.get("/profile", protect, expressAsyncHandler(UserController.getProfile));
userRouter.put("/profile", protect, expressAsyncHandler(UserController.updateProfile));
userRouter.post("/:userId/updatePassword", protect, expressAsyncHandler(UserController.updatePassword));
userRouter.patch("/:id/disable", protect, admin, expressAsyncHandler(UserController.disableUser));
userRouter.patch("/:id/restore", protect, admin, expressAsyncHandler(UserController.restoreUser));
userRouter.delete("/:id", protect, admin, expressAsyncHandler(UserController.deleteUser));
userRouter.get("/", protect, admin, expressAsyncHandler(UserController.getUsers));
userRouter.post("/", expressAsyncHandler(UserController.register));
userRouter.post(
    "/CreateOrUpdateAvatar/:userId",
    protect,
    upload.single("file"),
    expressAsyncHandler(UserController.uploadAvatar)
);

export default userRouter;
