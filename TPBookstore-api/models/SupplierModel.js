import mongoose from "mongoose";

const SupplierSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
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

const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;
