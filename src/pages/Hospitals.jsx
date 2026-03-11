

import AddHospitalModal from "../components/AddHospitalModal";
import EditHospitalModal from "../components/EditHospitalModal";

import { useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [editHospital, setEditHospital] = useState(null);

  const [filter, setFilter] = useState("");

  const [userLocation, setUserLocation] = useState(null);


  // 🔐 ROLE CHECK (FIXED)
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN" || role === "ROLE_ADMIN";

  // 🔥 FETCH HOSPITALS
  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const params = new URLSearchParams();
      if (city) params.append("city", city);
      if (search) params.append("search", search);

      const url =
        "http://localhost:8080/api/hospitals" +
        (params.toString() ? `?${params.toString()}` : "");

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setHospitals([]);
        return;
      }

      const data = await res.json();
      setHospitals(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchNearestHospitals = async () => {
  if (!userLocation) {
    alert("Location not available");
    return;
  }

  setLoading(true);
  try {
    const token = localStorage.getItem("token");

const res = await fetch(
  `http://localhost:8080/api/hospitals/nearest?lat=${userLocation.lat}&lon=${userLocation.lon}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


    const data = await res.json();

    // unwrap hospital + attach distance
    setHospitals(
      data.map(item => ({
        ...item.hospital,
        distance: item.distance
      }))
    );
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchHospitals();
  }, [city, search, fetchHospitals]);

  
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

  // 🗑 DELETE (ADMIN)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hospital?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/api/hospitals/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setHospitals((prev) => prev.filter((h) => h.id !== id));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen">


      <div className="flex-1 flex flex-col">
       

        <div className="p-10 max-w-7xl mx-auto flex-grow w-full">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-slate-800">Hospitals</h2>

            {isAdmin && (
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-xl font-bold"
              >
                <HiOutlinePlus /> Add Hospital
              </button>
            )}
          </div>

          {/* MODALS */}
          {showAdd && (
            <AddHospitalModal
              onClose={() => setShowAdd(false)}
              onSave={fetchHospitals}
            />
          )}

          {editHospital && (
            <EditHospitalModal
              hospital={editHospital}
              onClose={() => setEditHospital(null)}
              onUpdate={fetchHospitals}
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
              placeholder="Search hospital name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg border flex-1"
            />

             {/* PRIORITY */}
  <select
    value={filter}
    onChange={(e) => {
      const value = e.target.value;
      setFilter(value);

      if (value === "NEAREST") {
        fetchNearestHospitals();
      } else {
        fetchHospitals(); // fallback to normal
      }
    }}
    className="px-4 py-2 rounded-lg border bg-white"
  >
    <option value="">Filter</option>
    <option value="NEAREST">📍 Nearest Hospitals</option>
  </select>
          </div>

          {/* CONTENT */}
          {loading ? (
            <p className="text-center py-20">Loading hospitals...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition relative group"
                >
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => setEditHospital(hospital)}
                        className="p-2 bg-slate-100 rounded-lg hover:text-cyan-600"
                      >
                        <HiOutlinePencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(hospital.id)}
                        className="p-2 bg-slate-100 rounded-lg hover:text-red-600"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  )}

                  <h3 className="text-xl font-bold">{hospital.name}</h3>

                  <p className="text-slate-500 mt-1">
                    📍 {hospital.city} · {hospital.type}
                  </p>

                    {/* DISTANCE BADGE */}
              {hospital.distance !== undefined && (
                <span className="inline-block mt-2 px-3 py-1 text-xs font-bold text-blue-700 bg-blue-100 rounded-full">
                  📍 {hospital.distance} km away
                </span>
              )}

                  <p className="mt-3 text-sm">
                    <b>Specialties:</b> {hospital.specialties}
                  </p>

                  <div className="flex gap-6 mt-4 pt-4 border-t">
                    {hospital.websiteUrl && (
                      <a
                        href={hospital.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-600 font-semibold text-sm"
                      >
                        🌐 Website
                      </a>
                    )}

                    {hospital.googleMapUrl && (
                      <a
                        href={hospital.googleMapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 font-semibold text-sm"
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

       
      </div>
    </div>
  );
}
