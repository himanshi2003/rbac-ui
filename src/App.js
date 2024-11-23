import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionsManagement from "./components/PermissionsManagement";
import axios from "./services/api"; // Axios instance
import "./styles/App.css"; // CSS for styling

function App() {
  // Test API integration when the app loads
  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await axios.get("/users");
        console.log("Fetched Users:", response.data);
      } catch (error) {
        console.error("Test API Error:", error.message);
      }
    };

    testAPI();
  }, []);

  return (
    <Router>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <NavLink to="/users" className="nav-link">User Management</NavLink>
          <NavLink to="/roles" className="nav-link">Role Management</NavLink>
          <NavLink to="/permissions" className="nav-link">Permissions Management</NavLink>
        </nav>

        {/* Routes for different components */}
        <Routes>
          <Route path="/users" element={<UserManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/permissions" element={<PermissionsManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
