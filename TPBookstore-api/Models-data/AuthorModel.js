import mongoose from "mongoose";

const Schema = mongoose.Schema;
const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const Author = mongoose.model("Author", authorSchema);
export default Author;
