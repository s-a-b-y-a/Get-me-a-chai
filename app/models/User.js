import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  razorpayid: { type: String },
  razorpaysecret: { type: String },
  coverpic: { type: String }, // URL or path for the cover picture
  profilepic: { type: String } // URL or path for the profile picture
});

export default mongoose.models.User || model("User", UserSchema);
