import { scoreATS } from "./aiOrchestrator.js";

export async function getATSScoreForResume(resumeDraft) {
  const res = await scoreATS({
    profession: resumeDraft.profession,
    seniority: resumeDraft.seniority,
    sections: resumeDraft.sections
  });

  return res.score;
}
