import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  createResume,
  listResumes,
  getResume,
  liveATSScore
} from "../controllers/resumeController.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createResume);
router.get("/", listResumes);
router.get("/:id", getResume);
router.post("/ats-score", liveATSScore);

export default router;
