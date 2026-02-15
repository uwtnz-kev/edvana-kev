import { cn } from "@/utils/cn";

type StatusType = "active" | "completed" | "upcoming" | "pending" | "overdue" | "draft";

interface StatusBadgeProps {
  status: StatusType;
  customLabel?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-[#1EA896]/20 text-[#1EA896] border-[#1EA896]/30"
  },
  completed: {
    label: "Completed", 
    className: "bg-green-500/20 text-green-400 border-green-500/30"
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-[#FF715B]/20 text-[#FF715B] border-[#FF715B]/30"
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  },
  overdue: {
    label: "Overdue",
    className: "bg-red-500/20 text-red-400 border-red-500/30"
  },
  draft: {
    label: "Draft",
    className: "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
};

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-2 text-base"
};

export function StatusBadge({ status, customLabel, size = "sm", className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const label = customLabel || config.label;
  
  return (
    <span className={cn(
      "inline-flex items-center rounded-full font-medium border backdrop-blur-sm",
      config.className,
      sizeClasses[size],
      className
    )}>
      {label}
    </span>
  );
}