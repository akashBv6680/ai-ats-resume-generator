import mongoose from "mongoose";

const professionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Profession = mongoose.model("Profession", professionSchema);
