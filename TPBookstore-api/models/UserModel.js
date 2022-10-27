import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = mongoose.Schema({
    province: {
        type: String,
        required: false,
        default: ""
    },
    district: {
        type: String,
        required: false,
        default: ""
    },
    ward: {
        type: String,
        required: false,
        default: ""
    },
    specificAddress: {
        type: String,
        required: false,
        default: ""
    }
});
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: false,
            default: ""
        },
        password: {
            type: String,
            required: true
        },
        avatarUrl: {
            type: String,
            required: false,
            default: "./images/avatar/default.png"
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        isDisabled: {
            type: Boolean,
            required: true,
            default: false
        },
        sex: {
            type: String,
            required: false,
            default: ""
        },
        address: addressSchema
    },
    {
        timestamps: true
    }
);

//Login handle method
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

// Register handle method
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
