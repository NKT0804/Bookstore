import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});
const Author = mongoose.model("Author", authorSchema);
export default Author;
