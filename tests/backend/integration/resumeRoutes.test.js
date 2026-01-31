import request from "supertest";
import express from "express";
import resumeRoutes from "../../../backend/src/routes/resume.js";
import { requireAuth } from "../../../backend/src/middleware/authMiddleware.js";

jest.mock("../../../backend/src/middleware/authMiddleware.js", () => ({
  requireAuth: (req, _res, next) => {
    req.user = { id: "user1", role: "user" };
    next();
  }
}));

const app = express();
app.use(express.json());
app.use("/api/resumes", resumeRoutes);

test("POST /api/resumes/ats-score returns 400 on bad payload", async () => {
  const res = await request(app)
    .post("/api/resumes/ats-score")
    .send({});

  expect(res.statusCode).toBe(400);
});
