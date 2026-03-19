// Orchestrates the teacher parents workspace using extracted view modules.
import { Users } from "lucide-react";
import TeacherParentDetailsModal from "@/dashboard/teacher/components/parents/TeacherParentDetailsModal";
import ParentStatsCards from "@/dashboard/teacher/components/parents/ParentStatsCards";
import ParentsHome from "@/dashboard/teacher/components/parents/ParentsHome";
import {
  TeacherAssignmentsSubjectSidebar,
} from "@/dashboard/teacher/components/assignments";
import { ParentsFilters, ParentsHeader, ParentsTable, useParentsViewState } from "./parents";
import { TeacherFeatureClassEntryGate } from "./shared/TeacherFeatureClassEntryGate";

export default function TeacherParentsView() {
  return (
    <TeacherFeatureClassEntryGate
      entryPath="/dashboard/teacher/parents"
      featureKey="parents"
      title="Parents"
      subtitle="Choose a class to open the parents workspace"
      icon={Users}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
    >
      {({ onBackToEntry }) => <ParentsScopedView onBackToEntry={onBackToEntry} />}
    </TeacherFeatureClassEntryGate>
  );
}

function ParentsScopedView({ onBackToEntry }: { onBackToEntry: () => void }) {
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
            <ParentsHeader showBack onBack={onBackToEntry} />
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
