// Orchestrates the create grade list page by composing extracted sections.
import { CreateGradeListForm } from "./grades/create/CreateGradeListForm";
import { CreateGradeListHeader } from "./grades/create/CreateGradeListHeader";
import { useGradeListState } from "./grades/create/useGradeListState";

export default function CreateGradeListView() {
  const state = useGradeListState();
  if (!state.subjectId || !state.selectedSubject) return null;

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <CreateGradeListHeader state={state} />
        <CreateGradeListForm state={state} />
      </div>
    </div>
  );
}
