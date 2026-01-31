import { createResume } from "../../../backend/src/controllers/resumeController.js";
import { getATSScoreForResume } from "../../../backend/src/services/atsScoring.js";
import { Resume } from "../../../backend/src/models/Resume.js";

jest.mock("../../../backend/src/services/atsScoring.js");
jest.mock("../../../backend/src/models/Resume.js");

describe("resumeController.createResume", () => {
  test("returns 400 when required fields missing", async () => {
    const req = { body: {}, user: { id: "user1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createResume(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("creates resume and returns id + atsScore", async () => {
    getATSScoreForResume.mockResolvedValue(90);
    Resume.create.mockResolvedValue({ _id: "abc", atsScore: 90 });

    const req = {
      body: {
        profession: "software-engineer",
        seniority: "junior",
        sections: {}
      },
      user: { id: "user1" }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createResume(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: "abc", atsScore: 90 });
  });
});
