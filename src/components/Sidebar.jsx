import {
  HiOutlineHome,
  HiOutlineAcademicCap,
  HiOutlinePlusCircle,
  HiOutlineBriefcase,
  HiOutlineUsers,
} from "react-icons/hi";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  return (
    <div
      className={`bg-white border-r flex flex-col justify-between transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* TOP */}
      <div className="px-6 py-8">
        <h1 className="text-3xl font-black text-cyan-500 mb-10 tracking-tighter">
          {collapsed ? "SC" : <>Smart<span className="text-slate-800">City</span></>}
        </h1>

        <ul className="space-y-2 text-slate-500 font-semibold">
          <SideLink icon={<HiOutlineHome />} label="Dashboard" collapsed={collapsed}
            active={location.pathname === "/dashboard"}
            onClick={() => navigate("/dashboard")}
          />

          <SideLink icon={<HiOutlineAcademicCap />} label="Colleges" collapsed={collapsed}
            active={location.pathname === "/colleges"}
            onClick={() => navigate("/colleges")}
          />

          <SideLink icon={<HiOutlinePlusCircle />} label="Hospitals" collapsed={collapsed}
            active={location.pathname === "/hospitals"}
            onClick={() => navigate("/hospitals")}
          />

          <SideLink icon={<HiOutlineBriefcase />} label="Jobs" collapsed={collapsed}
            active={location.pathname === "/jobs"}
            onClick={() => navigate("/jobs")}
          />

          {role === "ADMIN" && (
            <SideLink icon={<HiOutlineUsers />} label="Users" collapsed={collapsed}
              active={location.pathname === "/users"}
              onClick={() => navigate("/users")}
            />
          )}
        </ul>
      </div>
    </div>
  );
}

function SideLink({ icon, label, active, onClick, collapsed }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
        ${active ? "bg-cyan-50 text-cyan-500" : "hover:bg-slate-50 hover:text-cyan-500"}
      `}
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && (
        <span className="text-sm uppercase tracking-wider">{label}</span>
      )}
    </li>
  );
}
