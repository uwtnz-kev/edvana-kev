// Orchestrates the subject module content page using focused subcomponents.
import { SubjectModuleContentHeader } from "./subjects/content/SubjectModuleContentHeader";
import { SubjectModuleLessonCard } from "./subjects/content/SubjectModuleLessonCard";
import { useSubjectModuleContentState } from "./subjects/content/useSubjectModuleContentState";

export default function SubjectModuleContentView() {
  const state = useSubjectModuleContentState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <SubjectModuleContentHeader state={state} />
        <SubjectModuleLessonCard state={state} />
      </div>
    </div>
  );
}
