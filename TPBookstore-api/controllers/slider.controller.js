import express from "express";
import expressAsyncHandler from "express-async-handler";
import { admin, protect, optional } from "../middleware/AuthMiddleware.js";

const createSlider = async (req, res) => {
    const { name, image, link } = req.body;

    const isExist = await Slider.findOne({ name: name, isDisabled: false });
    if (isExist) {
        res.status(400);
        throw new Error("Slider name is already exist");
    }
    const newSlider = new Slider({
        name,
        image,
        link
    });
    if (!newSlider) {
        res.status(400);
        throw new Error("Invalid Slider data");
    }
    const createdSlider = await newSlider.save();
    res.status(201).json(createdSlider);
};

const getSlider = async (req, res) => {
    const slider = await Slider.find().sort();
    res.status(200);
    res.json(categories);
};

const updateSlider = async (req, res) => {
    const { name, image, link } = req.body;
    const sliderId = req.params.id || null;
    const slider = await Slider.findOne({ _id: sliderId, isDisabled: false });
    if (!slider) {
        res.status(404);
        throw new Error("Slider not Found");
    }

    slider.name = name || slider.name;
    slider.image = image || slider.image;
    slider.link = link || slider.link;
    const updatedSlider = await slider.save();
    res.json(updatedSlider);
};

const disableSlider = async (req, res) => {
    const slider = await Slider.findById(req.params.id);
    if (!slider) {
        res.status(404);
        throw new Error("Slider not found");
    }

    slider.isDisabled = true;
    await slider.save();
    res.status(200);
    res.json({ message: "Slider has been disabled" });
};

const restoreSlider = async (req, res) => {
    const sliderId = req.params.id || null;
    const slider = await Slider.findOne({ _id: sliderId, isDisabled: true });
    if (!slider) {
        res.status(404);
        throw new Error("Slider not found");
    }
    const duplicatedSlider = await Slider.findOne({ name: slider.name, isDisabled: false });
    if (duplicatedSlider) {
        res.status(400);
        throw new Error("Restore this slider will result in duplicated slider name");
    }
    slider.isDisabled = false;
    const updateSlider = await slider.save();
    res.status(200);
    res.json(updateSlider);
};

const deleteSlider = async (req, res) => {
    const slider = await Slider.findById(req.params.id);
    if (!slider) {
        res.status(404);
        throw new Error("slider not found");
    }
    await slider.remove();
    res.status(200);
    res.json({ message: "slider has been deleted" });
};

const SliderControler = {
    createSlider,
    getSlider,
    updateSlider,
    disableSlider,
    restoreSlider,
    deleteSlider
};

export default SliderControler;
