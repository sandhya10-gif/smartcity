import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Colleges from "./pages/Colleges";
import Hospitals from "./pages/Hospitals";
import Jobs from "./pages/Jobs";
import Layout from "./layouts/Layout";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <Routes>
      {/* ROOT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED + LAYOUT */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {/* PAGES INSIDE LAYOUT */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/jobs" element={<Jobs />} />

          {/* ADMIN ONLY */}
          <Route element={<AdminRoute />}>
            <Route path="/users" element={<UserManagement />} />
          </Route>
        </Route>
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div style={{ padding: 20, textAlign: "center" }}>
            <h2>404 - Page Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
