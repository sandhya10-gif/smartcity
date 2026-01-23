import { useState } from "react";

export default function EditUserModal({ user, onClose, onUpdate }) {
  const [form, setForm] = useState({
    role: user?.role || "USER",
    status: user?.status || "ACTIVE",
  });

  const token = localStorage.getItem("token");

  const update = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role: form.role,
            status: form.status,
          }),
        }
      );

      if (!res.ok) {
        alert("Failed to update user");
        return;
      }

      onUpdate(); // refresh user list
      onClose();  // close modal
    } catch (err) {
      console.error("Update failed", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[380px]">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        {/* ROLE */}
        <select
          className="input w-full mb-3"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>

        {/* STATUS */}
        <select
          className="input w-full"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="BANNED">BANNED</option>
          <option value="PENDING">PENDING</option>
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="btn">
            Cancel
          </button>
          <button onClick={update} className="btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
