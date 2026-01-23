import { useState } from "react";

export default function EditJobModal({ job, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...job });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:8080/api/jobs/${job.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      }
    );

    if (res.ok) {
      onUpdate();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>

        <input name="companyName" value={form.companyName} onChange={handleChange} className="input" />
        <input name="role" value={form.role} onChange={handleChange} className="input" />
        <input name="location" value={form.location} onChange={handleChange} className="input" />
        <input name="salaryPackage" value={form.salaryPackage} onChange={handleChange} className="input" />
        <input name="applyUrl" value={form.applyUrl || ""} onChange={handleChange} className="input" />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={handleUpdate} className="btn-primary">Update</button>
        </div>
      </div>
    </div>
  );
}
