import React, { useState, useEffect } from "react";
import axios from "../services/api";

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const response = await axios.get("/roles");
    setRoles(response.data);
  };

  const addRole = async () => {
    await axios.post("/roles", newRole);
    fetchRoles();
    setNewRole({ name: "", permissions: [] });
  };

  return (
    <div>
      <h2>Role Management</h2>
      <div>
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <button onClick={addRole}>Add Role</button>
      </div>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.name} - Permissions: {role.permissions.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoleManagement;
