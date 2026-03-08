// Renders the assignments page shell with the shared subject sidebar and page header.
import { TeacherAssignmentsHeader, TeacherAssignmentsHome, TeacherAssignmentsSubjectSidebar } from "@/dashboard/teacher/components/assignments";
import type { useAssignmentsWorkspaceState } from "./useAssignmentsWorkspaceState";

type Props = { workspace: ReturnType<typeof useAssignmentsWorkspaceState> };

export function AssignmentsWorkspaceHeader({ workspace }: Props) {
  return (
    <div className="flex w-full gap-6 overflow-x-hidden">
      {!workspace.selectedSubject ? (
        <>
          <aside className="w-[220px] shrink-0">
            <TeacherAssignmentsSubjectSidebar subjects={workspace.subjects} selectedSubjectId={workspace.selectedSubjectId} onSelectSubject={workspace.setSelectedSubjectId} />
          </aside>
          <section className="flex-1 min-w-0 space-y-4">
            <TeacherAssignmentsHeader title="Assignments" subtitle="Choose a subject from the sidebar to manage assignments" subjectId={null} showBack={false} showCreate={false} onBack={workspace.onBack} canCreate={false} onCreate={workspace.onCreate} />
            <TeacherAssignmentsHome />
          </section>
        </>
      ) : null}
    </div>
  );
}
