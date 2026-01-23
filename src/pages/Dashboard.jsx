import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    colleges: 0,
    hospitals: 0,
    jobs: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchStats(token);
  }, [navigate]);

  const fetchStats = async (token) => {
    try {
      const res = await fetch("http://localhost:8080/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 max-w-7xl mx-auto w-full">
      <h2 className="text-4xl font-bold text-slate-800">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <StatCard
          title="COLLEGES"
          count={stats.colleges}
          to="/colleges"
        />
        <StatCard
          title="HOSPITALS"
          count={stats.hospitals}
          to="/hospitals"
        />
        <StatCard
          title="JOBS"
          count={stats.jobs}
          to="/jobs"
        />
      </div>
    </div>
  );
}
