import { cn } from "@/utils/cn";

const statusBadgeBaseClass =
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium";

function getStatusBadgeClass(status: string) {
  switch (status.toLowerCase()) {
    case "published":
    case "graded":
    case "submitted":
      return "border-emerald-400/30 bg-emerald-400/15 text-emerald-100";
    case "missing":
      return "border-amber-400/30 bg-amber-400/15 text-amber-100";
    case "closed":
      return "border-rose-400/30 bg-rose-400/15 text-rose-100";
    case "scheduled":
      return "border-sky-400/30 bg-sky-400/15 text-sky-100";
    case "draft":
    default:
      return "border-slate-300/20 bg-slate-400/15 text-slate-100";
  }
}

function formatStatusLabel(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

type StatusBadgeProps = {
  status: string;
  label?: string;
  className?: string;
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeBaseClass, getStatusBadgeClass(status), className)}>
      {label ?? formatStatusLabel(status)}
    </span>
  );
}
