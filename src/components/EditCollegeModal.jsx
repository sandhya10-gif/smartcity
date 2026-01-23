import { useState } from "react";

export default function EditCollegeModal({ college, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...college });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8080/api/colleges/${college.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      onUpdate();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3 mb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Edit College
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="label">College Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">Type</label>
            <input
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">Courses</label>
            <input
              name="courses"
              value={form.courses}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">Hostel Fee (₹)</label>
            <input
              name="hostelFee"
              value={form.hostelFee || ""}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="label">Website URL</label>
            <input
              name="websiteUrl"
              value={form.websiteUrl || ""}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="md:col-span-2">
            <label className="label">Google Map URL</label>
            <input
              name="googleMapUrl"
              value={form.googleMapUrl || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-700 shadow-md shadow-cyan-200"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
}
