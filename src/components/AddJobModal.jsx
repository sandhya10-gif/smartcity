import { useState } from "react";

export default function AddJobModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    location: "",
    salaryPackage: "",
    applyUrl: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8080/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      const text = await res.text();
      alert("Failed: " + text);
      return;
    }

    onSave();
    onClose();
  } catch (err) {
    alert("Server not reachable");
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-xl font-bold mb-4">Add Job</h2>

        <input name="companyName" placeholder="Company Name" onChange={handleChange} className="input" />
        <input name="role" placeholder="Job Role" onChange={handleChange} className="input" />
        <input name="location" placeholder="Location" onChange={handleChange} className="input" />
        <input name="salaryPackage" placeholder="Salary Package" onChange={handleChange} className="input" />
        <input name="applyUrl" placeholder="Apply URL" onChange={handleChange} className="input" />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
