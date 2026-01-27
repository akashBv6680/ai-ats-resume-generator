import React, { useEffect, useState } from "react";
import { getLiveATSScore } from "../../services/resume";

function LiveATSPreview({ profession, seniority, sections }) {
  const [score, setScore] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hasContent =
      profession ||
      seniority ||
      sections.summary ||
      sections.experience ||
      sections.education ||
      sections.skills;

    if (!hasContent) {
      setScore(null);
      return;
    }

    const controller = new AbortController();
    const run = async () => {
      try {
        setBusy(true);
        setError(null);
        const payload = { profession, seniority, sections };
        const result = await getLiveATSScore(payload);
        if (!controller.signal.aborted) {
          setScore(result.score);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setBusy(false);
        }
      }
    };

    run();

    return () => controller.abort();
  }, [profession, seniority, sections]);

  return (
    <aside style={{ marginTop: "1rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
      <h3>Live ATS Preview</h3>
      {busy && <div>Calculating score...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {score != null && !busy && (
        <div>
          Current ATS score: <strong>{score}</strong>/100
        </div>
      )}
      {score == null && !busy && !error && <div>No score yet.</div>}
    </aside>
  );
}

export default LiveATSPreview;
