import { useState } from "react";

export default function AddUserModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "USER",
    status: "ACTIVE",
  });

  const token = localStorage.getItem("token");



  const submit = async () => {
    const res = await fetch("https://smartcitybackend-1.onrender.com/api/admin/users", {
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
      <div className="bg-white p-6 rounded-xl w-[420px]">
        <h2 className="text-xl font-bold mb-4">Add User</h2>

        <input
          placeholder="Email"
          className="input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="input"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>ADMIN</option>
          <option>USER</option>
          <option>GUEST</option>
        </select>

        <select
          className="input"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>ACTIVE</option>
          <option>INACTIVE</option>
          <option>BANNED</option>
          <option>PENDING</option>
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="btn">
            Cancel
          </button>
          <button onClick={submit} className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
