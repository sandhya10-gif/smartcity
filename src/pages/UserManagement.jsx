import { useEffect, useState } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";


import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import UserStatusBadge from "../components/UserStatusBadge";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ✅ HOOKS MUST COME FIRST (NO CONDITIONS)
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setUsers([]);
        return;
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "ADMIN") {
      fetchUsers();
    }
  }, [role]);

  // ✅ CONDITIONAL RENDERING COMES AFTER HOOKS
  if (role !== "ADMIN") {
    return (
      <div className="p-20 text-center text-xl text-red-600">
        ❌ Access Denied
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">


      <div className="flex-1 flex flex-col">
  

        <div className="p-10 max-w-7xl mx-auto flex-grow w-full">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-slate-800">
              User Management
            </h2>

            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 bg-cyan-600 text-white px-5 py-2 rounded-xl font-bold"
            >
              <HiOutlinePlus /> Add User
            </button>
          </div>

          {/* TABLE */}
          {loading ? (
            <p className="text-center py-20">Loading users...</p>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 text-left">
                  <tr>
                    <th className="p-4">Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Last Active</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t">
                      <td className="p-4">{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        <UserStatusBadge status={u.status} />
                      </td>
                      <td>{u.joinedDate || "-"}</td>
                      <td>{u.lastActive || "-"}</td>

                      <td className="p-4 flex justify-end gap-3">
                        <button
                          onClick={() => setEditUser(u)}
                          className="p-2 bg-slate-100 rounded"
                        >
                          <HiOutlinePencil />
                        </button>

                        <button
                          onClick={() => setDeleteUser(u)}
                          className="p-2 bg-slate-100 rounded"
                        >
                          <HiOutlineTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.length === 0 && (
                <p className="text-center py-10 text-slate-500">
                  No users found.
                </p>
              )}
            </div>
          )}
        </div>

      </div>

      {showAdd && (
        <AddUserModal
          onClose={() => setShowAdd(false)}
          onSave={fetchUsers}
        />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onUpdate={fetchUsers}
        />
      )}

      {deleteUser && (
        <ConfirmDeleteModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onConfirm={fetchUsers}
        />
      )}
    </div>
  );
}
    