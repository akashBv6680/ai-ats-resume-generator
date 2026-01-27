import React, { useEffect, useState } from "react";
import { listResumes } from "../services/resume";
import Loader from "../components/Common/Loader";

function ResumeHistory() {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        setBusy(true);
        const data = await listResumes();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setBusy(false);
      }
    };

    run();
  }, []);

  return (
    <section>
      <h1>Resume History</h1>
      {busy && <Loader />}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!busy && !error && (
        <ul>
          {items.map((r) => (
            <li key={r.id}>
              {r.profession} - {r.seniority} - ATS {r.atsScore}/100
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ResumeHistory;
