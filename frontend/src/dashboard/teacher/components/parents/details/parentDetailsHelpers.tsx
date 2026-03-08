// Provides small formatting helpers and shared UI blocks for the modal.
import type { ReactNode } from "react";
import { Mail, MapPin, Phone, Users } from "lucide-react";
import type { ParentRecord, ParentStudentLink } from "@/utils/data/parents/parentsStore";

export function getParentStatusLabel(status: ParentRecord["status"]) {
  return status === "active" ? "Active" : "Inactive";
}

// Builds the linked-student secondary label from optional fields.
export function getStudentMeta(student: ParentStudentLink) {
  return [student.studentCode ?? "No code", student.grade ?? "Grade", student.className]
    .filter(Boolean)
    .join(" • ");
}

function ParentDetailsBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "blue" | "green" }) {
  const cls = tone === "blue"
    ? "bg-blue-500/20 text-blue-100 border-blue-500/20"
    : tone === "green"
      ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/20"
      : "bg-white/10 text-white/80 border-white/10";
  return <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${cls}`}>{children}</span>;
}

export function renderParentBadges(parent: ParentRecord) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ParentDetailsBadge tone="green">{getParentStatusLabel(parent.status)}</ParentDetailsBadge>
      <ParentDetailsBadge tone="blue">
        <Users className="h-4 w-4" />
        {parent.students.length} student{parent.students.length === 1 ? "" : "s"}
      </ParentDetailsBadge>
    </div>
  );
}

export function getParentInfoCards(parent: ParentRecord) {
  return [
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: parent.email },
    { icon: <Phone className="h-5 w-5" />, label: "Phone", value: parent.phone },
    { icon: <MapPin className="h-5 w-5" />, label: "Address", span2: true, value: parent.address ?? "Not provided" },
  ];
}
