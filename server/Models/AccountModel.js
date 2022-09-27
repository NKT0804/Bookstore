import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const accountSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
      default: false,
    },
    address: {
      type: String,
    },
    /*startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },*/
  },
  {
    timestamps: true,
  }
);

// Login
accountSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
