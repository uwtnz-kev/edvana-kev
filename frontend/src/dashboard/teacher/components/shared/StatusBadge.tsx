interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "scheduled":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "grading":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "draft":
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
      case "archived":
        return "bg-purple-500/20 text-purple-600 border-purple-500/30";
      case "overdue":
        return "bg-red-500/20 text-red-600 border-red-500/30";
      default:
        return "bg-white/20 text-white border-white/20";
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStyles()}`}>
      {status}
    </span>
  );
}
