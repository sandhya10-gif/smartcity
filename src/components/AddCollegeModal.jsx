import { useState } from "react";

export default function AddCollegeModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    city: "",
    type: "",
    courses: "",
    hostelFee: "",
    websiteUrl: "",
    googleMapUrl: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://smartcitybackend-1.onrender.com/api/colleges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSave();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[520px] shadow-lg">
        <h2 className="text-xl font-bold mb-5 text-slate-800">
          Add College
        </h2>

        {/* NAME */}
        <input
          name="name"
          placeholder="College Name"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        {/* CITY */}
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        {/* TYPE */}
        <input
          name="type"
          placeholder="Type (Govt / Private / Autonomous)"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        {/* COURSES */}
        <input
          name="courses"
          placeholder="Courses (CSE, ECE, EEE...)"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        {/* HOSTEL FEE */}
        <input
          name="hostelFee"
          placeholder="Hostel Fee"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        {/* 🌐 WEBSITE URL */}
        <input
          name="websiteUrl"
          placeholder="Website URL (https://...)"
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        {/* 📍 GOOGLE MAP URL */}
        <input
          name="googleMapUrl"
          placeholder="Google Map URL"
          onChange={handleChange}
          className="w-full mb-5 px-4 py-2 border rounded-lg"
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-cyan-600 text-white rounded-lg font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
