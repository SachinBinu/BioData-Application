
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  email: String,
  phone: String,
  dob: String,
  gender: String,
  address: String,
  image: String
});

export default mongoose.model("Biodata", schema);
