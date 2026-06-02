export default function ConfirmDeleteModal({ user, onClose, onConfirm }) {
  const token = localStorage.getItem("token");

  const remove = async () => {
    await fetch(`https://smartcitybackend-1.onrender.com/api/admin/users/${user.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[360px]">
        <h2 className="text-xl font-bold mb-4">Delete User</h2>
        <p className="text-slate-600">
          Are you sure you want to delete <b>{user.email}</b>?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn">
            Cancel
          </button>
          <button onClick={remove} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
