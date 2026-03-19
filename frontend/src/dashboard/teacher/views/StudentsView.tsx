// Orchestrates the teacher students workspace using extracted view modules.
import { Users } from "lucide-react";
import {
  StudentsStats,
  StudentsHome,
} from "../components/students";
import TeacherStudentDetailsModal from "../components/students/TeacherStudentDetailsModal";
import {
  TeacherAssignmentsSubjectSidebar,
} from "@/dashboard/teacher/components/assignments";
import {
  StudentsFilters,
  StudentsHeader,
  StudentsPagination,
  StudentsTable,
  useStudentsViewState,
} from "./students";
import { TeacherFeatureClassEntryGate } from "./shared/TeacherFeatureClassEntryGate";

export default function StudentsView() {
  return (
    <TeacherFeatureClassEntryGate
      entryPath="/dashboard/teacher/students"
      featureKey="students"
      title="Students"
      subtitle="Choose a class to open the students workspace"
      icon={Users}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
    >
      {({ onBackToEntry }) => <StudentsScopedView onBackToEntry={onBackToEntry} />}
    </TeacherFeatureClassEntryGate>
  );
}

function StudentsScopedView({ onBackToEntry }: { onBackToEntry: () => void }) {
  const state = useStudentsViewState();

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
            <StudentsHeader showBack onBack={onBackToEntry} />
            <StudentsHome />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <section className="flex-1 min-w-0 space-y-4">
        <StudentsHeader
          selectedSubjectName={state.selectedSubject.name}
          onBack={state.handleBack}
        />

        <StudentsStats studentsCount={state.filteredStudents.length} />

        <StudentsFilters
          filters={state.filters}
          onFiltersChange={(next) => {
            state.setFilters(next);
            state.setCurrentPage(1);
          }}
          selectedClass={state.selectedClass}
          onClassChange={(value) => {
            state.setSelectedClass(value);
            state.setCurrentPage(1);
          }}
          classes={state.classes}
        />

        <StudentsTable students={state.paginatedStudents} onView={state.handleView} />

        <StudentsPagination
          currentPage={state.currentPage}
          onPageChange={state.setCurrentPage}
          startIndex={state.startIndex}
          totalItems={state.filteredStudents.length}
          totalPages={state.totalPages}
        />

        <TeacherStudentDetailsModal
          open={state.detailsOpen}
          onOpenChange={(open) => (open ? state.setDetailsOpen(true) : state.closeDetails())}
          student={state.selectedStudent}
        />
      </section>
    </div>
  );
}
