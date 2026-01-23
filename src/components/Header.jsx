import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="user-info" onClick={() => setOpen(!open)}>
        <span>{role === "ADMIN" ? "Admin User" : "User"}</span>
        <div className="avatar">{role?.charAt(0)}</div>
      </div>

      {open && (
        <div className="dropdown">
          <p onClick={() => navigate("/profile")}>Profile</p>
          <p onClick={logout}>Logout</p>
        </div>
      )}
    </div>
  );
}
