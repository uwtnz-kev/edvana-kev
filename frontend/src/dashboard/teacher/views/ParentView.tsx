// Orchestrates the teacher parents workspace using extracted view modules.
import TeacherParentDetailsModal from "@/dashboard/teacher/components/parents/TeacherParentDetailsModal";
import ParentStatsCards from "@/dashboard/teacher/components/parents/ParentStatsCards";
import ParentsHome from "@/dashboard/teacher/components/parents/ParentsHome";
import {
  TeacherAssignmentsSubjectSidebar,
} from "@/dashboard/teacher/components/assignments";
import { ParentsFilters, ParentsHeader, ParentsTable, useParentsViewState } from "./parents";

export default function TeacherParentsView() {
  const state = useParentsViewState();

  if (!state.selectedSubject) {
    return (
      <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
        <div className="flex w-full gap-6">
          <aside className="w-[220px] shrink-0">
            <TeacherAssignmentsSubjectSidebar
              subjects={state.subjects}
              selectedSubjectId={state.selectedSubjectId}
              onSelectSubject={state.setSelectedSubjectId}
            />
          </aside>

          <section className="flex-1 min-w-0 space-y-4">
            <ParentsHeader />
            <ParentsHome />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <section className="flex-1 min-w-0 space-y-4">
        <ParentsHeader selectedSubjectName={state.selectedSubject.name} onBack={state.handleBack} />
        <ParentStatsCards
          totalParents={state.stats.totalParents}
        />
        <ParentsFilters
          query={state.query}
          onQueryChange={state.setQuery}
          selectedClass={state.selectedClass}
          onClassChange={state.setSelectedClass}
          classes={state.classes}
        />
        <ParentsTable rows={state.filteredRows} onView={state.handleView} />

        <TeacherParentDetailsModal
          open={state.open}
          onClose={() => state.setOpen(false)}
          parent={state.selected}
        />
      </section>
    </div>
  );
}
