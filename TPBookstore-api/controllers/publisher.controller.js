import express from "express";
import expressAsyncHandler from "express-async-handler";
import { admin, protect } from "../middleware/AuthMiddleware.js";
import Publisher from "../models/PublisherModel.js";
import Product from "../models/ProductModel.js";
import { publisherQueryParams, validateConstants } from "../constants/searchConstants.js";

//Admin create new publisher
const createPublisher = async (req, res) => {
    const { name, code, keyword } = req.body;
    const createdBy = req.user._id;
    const updatedBy = req.user._id;
    const isExist = await Publisher.findOne({ name: name, isDisabled: false });
    if (isExist) {
        res.status(400);
        throw new Error("Publisher name is already exist");
    }
    const newPublisher = new Publisher({
        name,
        code,
        keyword,
        createdBy,
        updatedBy
    });
    if (!newPublisher) {
        res.status(400);
        throw new Error("Invalid Publisher data");
    }
    const createdPublisher = await newPublisher.save();
    res.status(201).json(createdPublisher);
};

//Admin get publishers
const getPublishers = async (req, res) => {
    const dateOrderFilter = validateConstants(publisherQueryParams, "date", req.query.dateOrder);
    const statusFilter = validateConstants(publisherQueryParams, "status", req.query.status);
    const publishers = await Publisher.find({ ...statusFilter }).sort({ ...dateOrderFilter });
    res.status(200);
    res.json(publishers);
};

// //Admin get all publishers
// publisherRouter.get(
//     "/all",
//     protect,
//     admin,
//     expressAsyncHandler(async (req, res) => {
//       const publishers = await Publisher.find({ isDisabled: false }).sort({_id: -1}).populate("createdBy", "id name email").populate("updatedBy", "id name email");
//       res.json(publishers);
//     })
// );

// //Admin get all disabled publishers
// publisherRouter.get(
//   "/disabled",
//   protect,
//   admin,
//   expressAsyncHandler(async (req, res) => {
//     const publishers = await Publisher.find({ isDisabled: true });
//     if (publishers.length != 0) {
//       res.status(200);
//       res.json(publishers);
//     }
//     else {
//       res.status(204);
//       res.json({ message: "No publishers are disabled"} );
//     }
//   })
// );

//Admin update publisher
const updatePublisher = async (req, res) => {
    const { name, code, keyword } = req.body;
    const publisherId = req.params.id || null;
    const publisher = await Publisher.findOne({ _id: publisherId, isDisabled: false });
    if (!publisher) {
        res.status(404);
        throw new Error("Publisher not Found");
    }
    publisher.name = name || publisher.name;
    publisher.code = code || publisher.code;
    publisher.keyword = keyword || publisher.keyword;
    publisher.updatedBy = req.user._id;
    const updatedPublisher = await publisher.save();
    res.json(updatedPublisher);
};

//Admin disable publisher
const disablePublisher = async (req, res) => {
    const publisherId = req.params.id || null;
    const publisher = await Publisher.findOne({ _id: publisherId, isDisabled: false });
    if (!publisher) {
        res.status(404);
        throw new Error("Publisher not found");
    }
    const product = await Product.findOne({ publisher: publisher._id });
    if (product) {
        res.status(400);
        throw new Error("Cannot disable publisher with products");
    }
    publisher.isDisabled = true;
    await publisher.save();
    res.status(200);
    res.json({ message: "Publisher has been disabled" });
};

//Admin restore disabled publisher
const restorePublisher = async (req, res) => {
    const publisherId = req.params.id || null;
    const publisher = await Publisher.findOne({ _id: publisherId, isDisabled: true });
    if (!publisher) {
        res.status(404);
        throw new Error("Publisher not found");
    }
    const duplicatedPublisher = await Publisher.findOne({ name: publisher.name, isDisabled: false });
    if (duplicatedPublisher) {
        res.status(400);
        throw new Error("Restore this publisher will result in duplicated publisher name");
    }
    publisher.isDisabled = false;
    const updatePublisher = await publisher.save();
    res.status(200);
    res.json(updatePublisher);
};

//Admin delete publisher
const deletePublisher = async (req, res) => {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
        res.status(404);
        throw new Error("Publisher not found");
    }
    const product = await Product.findOne({ publisher: publisher._id });
    if (product) {
        res.status(400);
        throw new Error("Cannot disable publisher with products");
    }
    await publisher.remove();
    res.status(200);
    res.json({ message: "Publisher has been deleted" });
};

const PublisherControler = {
    createPublisher,
    getPublishers,
    updatePublisher,
    disablePublisher,
    restorePublisher,
    deletePublisher
};

export default PublisherControler;
