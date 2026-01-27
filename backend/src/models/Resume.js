import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    profession: { type: String, required: true },
    seniority: { type: String, required: true },
    sections: {
      summary: { type: String, default: "" },
      experience: { type: String, default: "" },
      education: { type: String, default: "" },
      skills: { type: String, default: "" }
    },
    atsScore: { type: Number, default: null },
    templateKey: { type: String, default: null }
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);
