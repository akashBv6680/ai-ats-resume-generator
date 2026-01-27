import React from "react";
import TemplateManager from "../components/Admin/TemplateManager";
import ProfessionManager from "../components/Admin/ProfessionManager";
import UserManagement from "../components/Admin/UserManagement";

function AdminPanel() {
  return (
    <section>
      <h1>Admin Panel</h1>
      <TemplateManager />
      <ProfessionManager />
      <UserManagement />
    </section>
  );
}

export default AdminPanel;
