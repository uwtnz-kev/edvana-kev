// Renders the brand block for the teacher navbar.
import { BookOpen } from "lucide-react";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";

export function TeacherNavbarBrand() {
  return (
    <div className="flex items-center space-x-3">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] shadow-sm ${teacherDashboardTheme.accents.brand}`}>
        <BookOpen className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Edvana</span>
    </div>
  );
}
