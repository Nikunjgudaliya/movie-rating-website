import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  rating: Number,
  moviename: String,
});

const UserModel = mongoose.model("ratings", userSchema);
export default UserModel;
