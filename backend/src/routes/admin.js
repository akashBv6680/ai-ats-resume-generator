import express from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import {
  listUsers,
  adminListTemplates,
  adminListProfessions
} from "../controllers/adminController.js";

const router = express.Router();

router.use(requireAuth);
router.use(requireRole(["admin", "qa"]));

router.get("/users", listUsers);
router.get("/templates", adminListTemplates);
router.get("/professions", adminListProfessions);

export default router;
