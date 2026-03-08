// Orchestrates the exams workspace by composing extracted page sections.
import { TeacherExamPreviewModal } from "@/dashboard/teacher/components/exams";
import { ExamsWorkspaceContent } from "./exams/ExamsWorkspaceContent";
import { ExamsWorkspaceHeader } from "./exams/ExamsWorkspaceHeader";
import { useExamsWorkspaceState } from "./exams/useExamsWorkspaceState";

export default function ExamsView() {
  const workspace = useExamsWorkspaceState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <ExamsWorkspaceHeader workspace={workspace} />
      <ExamsWorkspaceContent workspace={workspace} />
      <TeacherExamPreviewModal
        exam={workspace.previewExam}
        open={Boolean(workspace.previewExam)}
        onOpenChange={(isOpen) => {
          if (!isOpen) workspace.setPreviewId(null);
        }}
      />
    </div>
  );
}
