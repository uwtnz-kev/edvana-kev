// Orchestrates the subject modules page using extracted workspace modules.
import {
  SubjectModulesHeader,
  SubjectModulesList,
  SubjectModulesSectionHeader,
  useSubjectModulesViewState,
} from "./subjects/modules";

export default function SubjectModulesView() {
  const state = useSubjectModulesViewState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <SubjectModulesHeader state={state} />

        <section>
          <SubjectModulesSectionHeader subjectTitle={state.subjectTitle} />
          <SubjectModulesList state={state} />
        </section>
      </div>
    </div>
  );
}
