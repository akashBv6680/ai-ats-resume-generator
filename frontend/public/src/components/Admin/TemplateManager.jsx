import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../Common/Loader";

function TemplateManager() {
  const [templates, setTemplates] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const loadTemplates = async () => {
    try {
      setBusy(true);
      const data = await api.get("/admin/templates");
      setTemplates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <section>
      <h2>Template Manager</h2>
      {busy && <Loader />}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!busy && !error && (
        <ul>
          {templates.map((t) => (
            <li key={t.id}>
              {t.profession} - {t.seniority} - {t.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TemplateManager;
