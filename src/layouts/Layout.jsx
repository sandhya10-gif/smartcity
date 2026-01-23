import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        <Navbar onToggle={() => setCollapsed(!collapsed)} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
