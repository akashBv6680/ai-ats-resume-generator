import { Resume } from "../models/Resume.js";
import { getATSScoreForResume } from "../services/atsScoring.js";
import { isNonEmptyString, requireFields } from "../utils/validation.js";

export async function createResume(req, res) {
  const missing = requireFields(req.body, ["profession", "seniority", "sections"]);
  if (missing.length) {
    return res.status(400).json({ message: `Missing fields: ${missing.join(", ")}` });
  }

  const { profession, seniority, sections } = req.body;

  if (!isNonEmptyString(profession) || !isNonEmptyString(seniority)) {
    return res.status(400).json({ message: "Invalid profession or seniority" });
  }

  const draft = {
    userId: req.user.id,
    profession,
    seniority,
    sections
  };

  const atsScore = await getATSScoreForResume(draft);
  draft.atsScore = atsScore;

  const resume = await Resume.create(draft);

  return res.status(201).json({
    id: resume._id,
    atsScore: resume.atsScore
  });
}

export async function listResumes(req, res) {
  const items = await Resume.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return res.json(
    items.map((r) => ({
      id: r._id,
      profession: r.profession,
      seniority: r.seniority,
      atsScore: r.atsScore,
      createdAt: r.createdAt
    }))
  );
}

export async function getResume(req, res) {
  const resume = await Resume.findOne({
    _id: req.params.id,
    userId: req.user.id
  }).lean();

  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  return res.json(resume);
}

export async function liveATSScore(req, res) {
  const missing = requireFields(req.body, ["profession", "seniority", "sections"]);
  if (missing.length) {
    return res.status(400).json({ message: `Missing fields: ${missing.join(", ")}` });
  }

  const score = await getATSScoreForResume(req.body);
  return res.json({ score });
}
