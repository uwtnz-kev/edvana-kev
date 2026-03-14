// Orchestrates the teacher subject workspace using extracted modules.
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  SubjectContentShell,
  SubjectSidebarPanel,
  SubjectViewHeader,
  useSubjectViewState,
} from "./subjects";
import { getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

type SubjectRouteParams = {
  subjectId?: string;
};

export default function SubjectView() {
  const navigate = useNavigate();
  const { subjectId = "" } = useParams<SubjectRouteParams>();
  const [searchParams] = useSearchParams();
  const classId = getClassIdFromSearchParams(searchParams);
  const state = useSubjectViewState(subjectId, classId);
  const handleBack = () => {
    if (classId) {
      navigate(`/dashboard/teacher/subjects?classId=${classId}`);
      return;
    }

    navigate("/dashboard/teacher/subjects");
  };

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
          <SubjectViewHeader selectedSubjectName={state.selectedSubject?.name} selectedSubjectTheme={state.selectedSubjectTheme} onBack={handleBack} />
          <SubjectContentShell
            selectedSubjectData={state.selectedSubjectData}
            selectedSubjectTheme={state.selectedSubjectTheme}
          />
        </section>
      </div>
    </div>
  );
}
