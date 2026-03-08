// Orchestrates the teacher subject workspace using extracted modules.
import { useNavigate } from "react-router-dom";
import {
  SubjectContentShell,
  SubjectSidebarPanel,
  SubjectViewHeader,
  useSubjectViewState,
} from "./subjects";

export default function SubjectView() {
  const navigate = useNavigate();
  const state = useSubjectViewState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="flex w-full gap-6">
        <aside className="w-[260px] shrink-0">
          <SubjectSidebarPanel
            actions={state.sidebarActions}
            onActionClick={(action) =>
              state.selectedSubject &&
              navigate(action.to, {
                state: {
                  restoreSubjectId: state.selectedSubject.id,
                  subject: state.selectedSubjectData,
                },
              })
            }
            onSelectSubject={state.setSelectedSubjectId}
            selectedSubjectData={state.selectedSubjectData}
            selectedSubjectId={state.selectedSubjectId}
            subjects={state.subjects}
          />
        </aside>

        <section className="flex-1 min-w-0 space-y-4">
          <SubjectViewHeader selectedSubjectName={state.selectedSubject?.name} onBack={state.onBack} />
          <SubjectContentShell
            selectedSubjectData={state.selectedSubjectData}
            selectedSubjectTheme={state.selectedSubjectTheme}
          />
        </section>
      </div>
    </div>
  );
}
