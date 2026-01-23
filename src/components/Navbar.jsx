import { HiOutlineBell, HiOutlineMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ onToggle }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role") || "USER";
  const email = localStorage.getItem("email") || "user@email.com";
  const displayName = email.split("@")[0];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-20 bg-white border-b flex items-center px-6 relative">
      
      {/* ✅ LEFT: TOGGLE BUTTON + SITE NAME */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}   // 🔥 THIS WAS MISSING / NOT WIRED
          className="text-2xl text-slate-600 hover:text-cyan-500"
        >
          <HiOutlineMenu />
        </button>

        <h1 className="text-2xl font-black tracking-tight">
          Smart<span className="text-cyan-500">City</span>
        </h1>
      </div>

      <div className="flex-1" />

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <HiOutlineBell className="text-slate-400 text-xl cursor-pointer hover:text-cyan-500" />

        <div
          className="flex items-center gap-3 pl-6 border-l border-slate-100 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="text-right">
            <p className="font-bold text-slate-800 leading-none capitalize">
              {displayName}
            </p>
            <p className="text-[10px] text-cyan-500 uppercase font-black mt-1 tracking-widest">
              {role}
            </p>
          </div>

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold uppercase">
            {displayName.charAt(0)}
          </div>
        </div>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-20 right-6 bg-white border rounded-xl shadow-lg w-40 z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600 font-semibold"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
