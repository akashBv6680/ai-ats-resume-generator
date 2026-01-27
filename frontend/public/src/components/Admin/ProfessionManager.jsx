import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../Common/Loader";

function ProfessionManager() {
  const [professions, setProfessions] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const loadProfessions = async () => {
    try {
      setBusy(true);
      const data = await api.get("/admin/professions");
      setProfessions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    loadProfessions();
  }, []);

  return (
    <section>
      <h2>Profession Manager</h2>
      {busy && <Loader />}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!busy && !error && (
        <ul>
          {professions.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProfessionManager;
