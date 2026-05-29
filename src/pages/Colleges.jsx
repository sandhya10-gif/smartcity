import AddCollegeModal from "../components/AddCollegeModal";
import EditCollegeModal from "../components/EditCollegeModal";
import CategoryCards from "../components/CategoryCards";

import { useEffect, useState, useCallback } from "react";

import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";

export default function Colleges() {
  const [showAdd, setShowAdd] = useState(false);
  const [editCollege, setEditCollege] = useState(null);


  const [colleges, setColleges] = useState([]);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [sortBy, setSortBy] = useState("");

  const [category, setCategory] = useState("");



  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "ADMIN";


  /* ================= FETCH COLLEGES ================= */
const fetchColleges = useCallback(async (priority = null) => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();
    if (city) params.append("city", city);
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (priority) params.append("priority", priority);

    const url = `http://localhost:8080/api/colleges${
      params.toString() ? "?" + params.toString() : ""
    }`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      setColleges([]);
      return;
    }

    const data = await res.json();
    setColleges(data);
  } catch (err) {
    console.error(err);
    setColleges([]);
  } finally {
    setLoading(false);
  }
}, [city, search, category]);


  /* ================= USER LOCATION ================= */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => console.log("Location permission denied")
    );
  }, []);

  /* ================= NEAREST COLLEGES ================= */
  const fetchNearestColleges = async () => {
    if (!userLocation) {
      alert("Location not available");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/colleges/nearest?lat=${userLocation.lat}&lon=${userLocation.lon}`
      );

      if (!res.ok) {
        setColleges([]);
        return;
      }

      const data = await res.json();

      setColleges(
        data.map((item) => ({
          ...item.college,
          distance: item.distance,
        }))
      );
    } catch (err) { 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER EFFECT ================= */
useEffect(() => {
  setSortBy("");
  fetchColleges();
}, [fetchColleges]);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this college?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8080/api/colleges/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setColleges((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-10 max-w-7xl mx-auto w-full">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        

        {isAdmin && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-cyan-600 text-white px-5 py-2 rounded-xl font-bold"
          >
            <HiOutlinePlus /> Add College
          </button>
        )}
      </div>

      <CategoryCards onSelect={(cat) => setCategory(cat)} />


      {/* MODALS */}
      {showAdd && (
        <AddCollegeModal onClose={() => setShowAdd(false)} onSave={fetchColleges} />
      )}

      {editCollege && (
        <EditCollegeModal
          college={editCollege}
          onClose={() => setEditCollege(null)}
          onUpdate={fetchColleges}
        />
      )}

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Cities</option>
          <option value="Coimbatore">Coimbatore</option>
          <option value="Chennai">Chennai</option>
        </select>

        <input
          type="text"
          placeholder="Search college..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg flex-1"
        />

        <select
          value={sortBy}
          onChange={(e) => {
            const value = e.target.value;
            setSortBy(value);

            if (value === "LOW_FEES") fetchColleges("LOW_FEES");
            else if (value === "HOSTEL") fetchColleges("HOSTEL");
            else if (value === "GOVERNMENT") fetchColleges("GOVERNMENT");
            else if (value === "NEAREST") fetchNearestColleges();
          }}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="">Sort / Priority</option>
          <option value="LOW_FEES">💰 Lowest Fees</option>
          <option value="HOSTEL">🏠 Hostel Available</option>
          <option value="GOVERNMENT">🏛 Government Colleges</option>
          <option value="NEAREST">📍 Nearest Colleges</option>
        </select>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div
  key={college.id}
  className="bg-white p-6 rounded-xl shadow"
>
  {/* HEADER ROW */}
  <div className="flex items-start justify-between gap-4">
    
    {/* LOGO + NAME */}
    <div className="flex items-start gap-4">
      {/* LOGO */}
      <div className="w-14 h-14 bg-white rounded-lg shadow flex items-center justify-center flex-shrink-0">
        <img
          src={college.logoUrl || "/default-college.png"}
          alt={`${college.name} logo`}
          className="max-h-12 max-w-12 object-contain"
        />
      </div>

      {/* COLLEGE INFO */}
      <div>
        <h3 className="text-xl font-bold leading-tight">
          {college.name}
        </h3>

        <p className="text-slate-500 mt-1">
          📍 {college.city} · 🎓 {college.type}
        </p>
      </div>
    </div>

    {/* ADMIN OPTIONS */}
    {isAdmin && (
      <div className="flex gap-2 text-slate-600">
        <button
          onClick={() => setEditCollege(college)}
          className="hover:text-cyan-600"
        >
          <HiOutlinePencil />
        </button>
        <button
          onClick={() => handleDelete(college.id)}
          className="hover:text-red-600"
        >
          <HiOutlineTrash />
        </button>
      </div>
    )}
  </div>


              {/* DISTANCE BADGE */}
              {college.distance !== undefined && (
                <span className="inline-block mt-2 px-3 py-1 text-xs font-bold text-blue-700 bg-blue-100 rounded-full">
                  📍 {college.distance} km away
                </span>
              )}

              <p className="mt-2 text-sm">
                <b>Courses:</b> {college.courses}
              </p>

              {college.hostelFee && (
                <p className="text-sm">
                  <b>Hostel Fee:</b> ₹{college.hostelFee}
                </p>
              )}

              {/* LINKS */}
              <div className="flex gap-6 mt-4 pt-4 border-t text-sm">
                {college.websiteUrl && (
                  <a
                    href={college.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-600 font-semibold hover:underline"
                  >
                    🌐 Website
                  </a>
                )}

                {college.googleMapUrl && (
                  <a
                    href={college.googleMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 font-semibold hover:underline"
                  >
                    📍 Location
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}


     
    </div>
  );
}
