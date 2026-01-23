export default function UserStatusBadge({ status }) {
  const colors = {
    ACTIVE: "bg-green-500",
    INACTIVE: "bg-gray-400",
    BANNED: "bg-red-500",
    PENDING: "bg-yellow-500",
  };

  return (
    <span
      className={`px-3 py-1 text-xs text-white rounded-full ${colors[status]}`}
    >
      {status}
    </span>
  );
}
