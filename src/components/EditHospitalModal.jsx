import { useState } from "react";

export default function EditHospitalModal({ hospital, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...hospital });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://smartcitybackend-1.onrender.com/api/hospitals/${hospital.id}`,
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
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[520px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Hospital</h2>

        <input name="name" value={form.name} onChange={handleChange} className="input" />
        <input name="city" value={form.city} onChange={handleChange} className="input" />
        <input name="type" value={form.type} onChange={handleChange} className="input" />
        <input name="specialties" value={form.specialties} onChange={handleChange} className="input" />

        <label className="flex items-center gap-2 my-2">
          <input
            type="checkbox"
            name="emergencyAvailable"
            checked={form.emergencyAvailable}
            onChange={handleChange}
          />
          Emergency Available
        </label>

        <input name="websiteUrl" value={form.websiteUrl || ""} onChange={handleChange} className="input" />
        <input name="googleMapUrl" value={form.googleMapUrl || ""} onChange={handleChange} className="input" />

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={handleUpdate} className="btn-primary">Update</button>
        </div>
      </div>
    </div>
  );
}
