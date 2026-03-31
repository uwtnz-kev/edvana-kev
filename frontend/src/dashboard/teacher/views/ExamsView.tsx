// Orchestrates the exams workspace by composing extracted page sections.
import { ClipboardList } from "lucide-react";
import { DEFAULT_SUBJECT_ICON_THEME } from "@/dashboard/teacher/components/exams/ExamsTheme";
import { ExamsWorkspaceContent } from "./exams/ExamsWorkspaceContent";
import { ExamsWorkspaceHeader } from "./exams/ExamsWorkspaceHeader";
import { useExamsWorkspaceState } from "./exams/useExamsWorkspaceState";
import { TeacherFeatureClassEntryGate } from "./shared/TeacherFeatureClassEntryGate";

export default function ExamsView() {
  return (
    <TeacherFeatureClassEntryGate
      entryPath="/dashboard/teacher/exams"
      featureKey="exams"
      title="Exams"
      subtitle="Choose a class to open the exams workspace"
      icon={ClipboardList}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
      renderHeaderIcon={({ Icon }) => (
        <div className={`h-12 w-12 rounded-xl p-3 flex items-center justify-center ${DEFAULT_SUBJECT_ICON_THEME.bg}`}>
          <Icon className={`h-6 w-6 ${DEFAULT_SUBJECT_ICON_THEME.text}`} />
        </div>
      )}
    >
      {({ classId, onBackToEntry }) => <ExamsScopedWorkspace classId={classId} onBackToEntry={onBackToEntry} />}
    </TeacherFeatureClassEntryGate>
  );
}

function ExamsScopedWorkspace({ classId, onBackToEntry }: { classId: string; onBackToEntry: () => void }) {
  const workspace = useExamsWorkspaceState(classId);

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <ExamsWorkspaceHeader workspace={workspace} onBackToClassEntry={onBackToEntry} />
      <ExamsWorkspaceContent workspace={workspace} />
    </div>
  );
}
