import React from "react";
import ResumeForm from "../components/ResumeBuilder/ResumeForm";

function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>
      <p>Build an ATS-safe resume with live compatibility scoring.</p>
      <ResumeForm />
    </section>
  );
}

export default Dashboard;
