import { useState } from "react";

export default function AddHospitalModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    city: "",
    type: "",
    specialties: "",
    emergencyAvailable: false,
    websiteUrl: "",
    googleMapUrl: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://smartcitybackend-1.onrender.com/api/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Failed to save hospital");
        return;
      }

      onSave();
      onClose();
    } catch {
      alert("Server not reachable");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[520px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Hospital</h2>

        <input name="name" placeholder="Hospital Name" onChange={handleChange} className="input" />
        <input name="city" placeholder="City" onChange={handleChange} className="input" />
        <input name="type" placeholder="Type (Govt / Private)" onChange={handleChange} className="input" />
        <input name="specialties" placeholder="Specialties" onChange={handleChange} className="input" />

        <label className="flex items-center gap-2 my-2">
          <input type="checkbox" name="emergencyAvailable" onChange={handleChange} />
          Emergency Available
        </label>

        <input name="websiteUrl" placeholder="Website URL" onChange={handleChange} className="input" />
        <input name="googleMapUrl" placeholder="Google Map URL" onChange={handleChange} className="input" />

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
