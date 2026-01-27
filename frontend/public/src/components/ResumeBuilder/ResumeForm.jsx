import React, { useState } from "react";
import SectionEditor from "./SectionEditor";
import LiveATSPreview from "./LiveATSPreview";
import { createResume } from "../../services/resume";

const defaultSections = {
  summary: "",
  experience: "",
  education: "",
  skills: "",
};

function ResumeForm() {
  const [profession, setProfession] = useState("");
  const [seniority, setSeniority] = useState("");
  const [sections, setSections] = useState(defaultSections);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [lastSavedId, setLastSavedId] = useState(null);

  const handleSectionChange = (name, value) => {
    setSections((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      profession,
      seniority,
      sections,
    };

    try {
      setSaving(true);
      const result = await createResume(payload);
      setLastSavedId(result.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <h2>Resume Builder</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Profession
            <br />
            <input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="e.g., Data Scientist"
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Seniority
            <br />
            <input
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
              placeholder="e.g., Junior, Mid-level, Senior"
            />
          </label>
        </div>

        <SectionEditor sections={sections} onChange={handleSectionChange} />

        {error && (
          <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>
        )}

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Generate & Save Resume"}
        </button>

        {lastSavedId && (
          <div style={{ marginTop: "0.5rem" }}>
            Last saved resume ID: {lastSavedId}
          </div>
        )}
      </form>

      <LiveATSPreview profession={profession} seniority={seniority} sections={sections} />
    </section>
  );
}

export default ResumeForm;
