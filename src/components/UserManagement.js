import React, { useState, useEffect } from "react";
import axios from "../services/api"; // Import the updated Axios instance

function UserManagement() {
  const [users, setUsers] = useState([]); // State for users list
  const [newUser, setNewUser] = useState({ name: "", role: "", status: "Active" }); // State for new user input

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users"); // GET request
      setUsers(response.data); // Update state with the fetched users
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  // Add a new user
  const addUser = async () => {
    try {
      await axios.post("/users", newUser); // POST request
      fetchUsers(); // Refresh the users list
      setNewUser({ name: "", role: "", status: "Active" }); // Reset new user input
      console.log("User added successfully");
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
  };

  // Delete a user by ID
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`); // DELETE request
      fetchUsers(); // Refresh the users list
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      {/* Form for adding a new user */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Users table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
