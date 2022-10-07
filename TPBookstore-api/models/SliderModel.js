import mongoose from "mongoose";

const sliderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    }
});
const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;
