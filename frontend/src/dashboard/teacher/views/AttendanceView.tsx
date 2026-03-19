// Orchestrates the attendance workspace by composing extracted page sections.
import { ClipboardCheck } from "lucide-react";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { AttendanceWorkspaceContent } from "./attendance/AttendanceWorkspaceContent";
import { AttendanceWorkspaceHeader } from "./attendance/AttendanceWorkspaceHeader";
import { useAttendanceWorkspaceState } from "./attendance/useAttendanceWorkspaceState";
import { TeacherFeatureClassEntryGate } from "./shared/TeacherFeatureClassEntryGate";

export default function AttendanceView() {
  const entryTheme = getSubjectThemeById("");

  return (
    <TeacherFeatureClassEntryGate
      entryPath="/dashboard/teacher/attendance"
      featureKey="attendance"
      title="Attendance"
      subtitle="Choose a class to open the attendance workspace"
      icon={ClipboardCheck}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
      renderHeaderIcon={({ Icon }) => (
        <div className={`h-12 w-12 rounded-xl p-3 flex items-center justify-center ${entryTheme.bgClass}`}>
          <Icon className={`h-6 w-6 ${entryTheme.iconClass}`} />
        </div>
      )}
    >
      {({ onBackToEntry }) => <AttendanceScopedWorkspace onBackToEntry={onBackToEntry} />}
    </TeacherFeatureClassEntryGate>
  );
}

function AttendanceScopedWorkspace({ onBackToEntry }: { onBackToEntry: () => void }) {
  const workspace = useAttendanceWorkspaceState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <AttendanceWorkspaceHeader workspace={workspace} />
      <div className="mt-4">
        <AttendanceWorkspaceContent workspace={workspace} onBackToClassEntry={onBackToEntry} />
      </div>
    </div>
  );
}
