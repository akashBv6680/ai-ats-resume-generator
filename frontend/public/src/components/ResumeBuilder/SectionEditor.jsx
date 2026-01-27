import React from "react";

function SectionEditor({ sections, onChange }) {
  const handleChange = (name) => (e) => {
    onChange(name, e.target.value);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Sections</h3>

      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Summary
          <br />
          <textarea
            rows={3}
            value={sections.summary}
            onChange={handleChange("summary")}
          />
        </label>
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Experience
          <br />
          <textarea
            rows={5}
            value={sections.experience}
            onChange={handleChange("experience")}
          />
        </label>
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Education
          <br />
          <textarea
            rows={4}
            value={sections.education}
            onChange={handleChange("education")}
          />
        </label>
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Skills
          <br />
          <textarea
            rows={3}
            value={sections.skills}
            onChange={handleChange("skills")}
          />
        </label>
      </div>
    </div>
  );
}

export default SectionEditor;
