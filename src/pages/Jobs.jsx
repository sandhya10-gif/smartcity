

import AddJobModal from "../components/AddJobModal";
import EditJobModal from "../components/EditJobModal";

import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  // 🔥 FETCH JOBS
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const params = new URLSearchParams();
      if (city) params.append("city", city);
      if (search) params.append("search", search);

      const url =
        `http://localhost:8080/api/jobs` +
        (params.toString() ? `?${params.toString()}` : "");

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setJobs([]);
        return;
      }

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error(err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [city, search,fetchJobs]);

  // 🗑 DELETE (ADMIN)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8080/api/jobs/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">
     

      <div className="flex-1 flex flex-col">
    

        <div className="p-10 max-w-7xl mx-auto flex-grow w-full">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-slate-800">Jobs</h2>

            {isAdmin && (
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-xl font-bold"
              >
                <HiOutlinePlus /> Add Job
              </button>
            )}
          </div>

          {/* MODALS */}
          {showAdd && (
            <AddJobModal
              onClose={() => setShowAdd(false)}
              onSave={fetchJobs}
            />
          )}

          {editJob && (
            <EditJobModal
              job={editJob}
              onClose={() => setEditJob(null)}
              onUpdate={fetchJobs}
            />
          )}

          {/* FILTER BAR */}
          <div className="flex gap-4 mb-8">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-2 rounded-lg border"
            >
              <option value="">All Cities</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
            </select>

            <input
              type="text"
              placeholder="Search job or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border flex-1"
            />
          </div>

          {/* CONTENT */}
          {loading ? (
            <p className="text-center py-20">Loading jobs...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition relative group"
                >
                  {/* ADMIN ACTIONS */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => setEditJob(job)}
                        className="p-2 bg-slate-100 rounded-lg hover:text-cyan-600"
                      >
                        <HiOutlinePencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(job.id)}
                        className="p-2 bg-slate-100 rounded-lg hover:text-red-600"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  )}

                  <h3 className="text-xl font-bold">{job.role}</h3>

                  <p className="text-slate-500 mt-1">
                    🏢 {job.companyName}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    📍 {job.location} · 💰 {job.salaryPackage}
                  </p>

                  {job.applyUrl && (
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 text-cyan-600 font-semibold text-sm hover:underline"
                    >
                      🔗 Apply Now
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      
      </div>
    </div>
  );
}
