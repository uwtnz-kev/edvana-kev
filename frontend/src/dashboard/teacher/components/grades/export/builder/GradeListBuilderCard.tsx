// Orchestrates the grade list builder card using focused builder subcomponents.
import { GradeListBuilderControls } from "./GradeListBuilderControls";
import { GradeListBuilderHeader } from "./GradeListBuilderHeader";
import { GradeListBuilderSummary } from "./GradeListBuilderSummary";
import { useGradeListBuilderState } from "./useGradeListBuilderState";

type Props = {
  listName: string;
};

export default function GradeListBuilderCard({ listName }: Props) {
  const state = useGradeListBuilderState(listName);

  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 hover:bg-white/15 transition space-y-4">
      <GradeListBuilderHeader listName={listName} />
      <GradeListBuilderControls
        assessmentType={state.assessmentType}
        grade={state.grade}
        maxScore={state.maxScore}
        semester={state.semester}
        setAssessmentType={state.setAssessmentType}
        setGrade={state.setGrade}
        setMaxScore={state.setMaxScore}
        setSemester={state.setSemester}
        setSubject={state.setSubject}
        subject={state.subject}
      />
      <GradeListBuilderSummary
        ready={state.ready}
        rows={state.rows}
        saveDraft={state.saveDraft}
        setScore={state.setScore}
      />
    </div>
  );
}
