import express from "express";
import expressAsyncHandler from "express-async-handler";
import { admin, protect } from "../middleware/AuthMiddleware.js";
import PublisherControler from "../controllers/publisher.controller.js";

const publisherRouter = express.Router();

// publisherRouter.get("/all", protect, admin, expressAsyncHandler());
// publisherRouter.get("/disabled", protect, admin, expressAsyncHandler());
publisherRouter.patch("/:id/disable", protect, admin, expressAsyncHandler(PublisherControler.disablePublisher));
publisherRouter.patch("/:id/restore", protect, admin, expressAsyncHandler(PublisherControler.restorePublisher));
publisherRouter.delete("/:id", protect, admin, expressAsyncHandler(PublisherControler.deletePublisher));
publisherRouter.put("/:id", protect, admin, expressAsyncHandler(PublisherControler.updatePublisher));
publisherRouter.get("/", protect, admin, expressAsyncHandler(PublisherControler.getPublishers));
publisherRouter.post("/", protect, admin, expressAsyncHandler(PublisherControler.createPublisher));

export default publisherRouter;
