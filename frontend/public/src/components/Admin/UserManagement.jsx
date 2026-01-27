import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from "../Common/Loader";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      setBusy(true);
      const data = await api.get("/admin/users");
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section>
      <h2>User Management</h2>
      {busy && <Loader />}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!busy && !error && (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.email} - {u.role}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default UserManagement;
