// Left sidebar panel for subject selection or subject-specific actions.
import { TeacherAssignmentsSubjectSidebar, type TeacherSubject2 } from "@/dashboard/teacher/components/assignments";
import type { SubjectWorkspaceData } from "./subjectWorkspaceData";
import type { SubjectSidebarAction } from "./subjectViewHelpers";
import { SubjectSidebarActionButton } from "./sidebar/SubjectSidebarActionButton";

type Props = {
  actions: SubjectSidebarAction[];
  onActionClick: (action: SubjectSidebarAction) => void;
  onSelectSubject: (subjectId: string | null) => void;
  selectedSubjectData: SubjectWorkspaceData | null;
  selectedSubjectId: string | null;
  subjects: TeacherSubject2[];
};

export function SubjectSidebarPanel(props: Props) {
  if (!props.selectedSubjectId) {
    return (
      <TeacherAssignmentsSubjectSidebar
        subjects={props.subjects}
        selectedSubjectId={props.selectedSubjectId}
        onSelectSubject={props.onSelectSubject}
      />
    );
  }

  return (
    <aside className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
      <div className="space-y-2">
        {props.actions.map((action) => (
          <SubjectSidebarActionButton key={action.value} action={action} onClick={props.onActionClick} />
        ))}
      </div>
    </aside>
  );
}
