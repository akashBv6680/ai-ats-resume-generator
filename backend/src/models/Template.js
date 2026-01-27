import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    profession: { type: String, required: true },
    specialization: { type: String, default: "" },
    seniority: { type: String, required: true },
    sectionOrder: [{ type: String }],
    keywords: [{ type: String }],
    bulletConstraints: {
      summaryMaxLines: { type: Number, default: 4 },
      experienceMaxLines: { type: Number, default: 12 },
      educationMaxLines: { type: Number, default: 8 },
      skillsMaxLines: { type: Number, default: 8 }
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Template = mongoose.model("Template", templateSchema);
