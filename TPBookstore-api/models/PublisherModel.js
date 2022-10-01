import mongoose from "mongoose";

const PublisherSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        keyword: {
            type: String,
            required: false,
            default: ""
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        // createdBy: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: "User",
        // },
        // updatedBy: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: "User",
        // },
        isDisabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Publisher = mongoose.model("Publisher", PublisherSchema);
export default Publisher;
