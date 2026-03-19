// Switches between the landing, empty-subject, and active workspace grades content.
import { TeacherGradesHome, type TeacherGradesSubject, type TeacherPublishedItem } from "@/dashboard/teacher/components/grades";
import { GradesWorkspaceHeader } from "./GradesWorkspaceHeader";
import { GradesWorkspaceFilters } from "./GradesWorkspaceFilters";
import { GradeSubmissionsContent } from "./content/GradeSubmissionsContent";
import { GradesHomeContent } from "./content/GradesHomeContent";
import { GradesLandingContent } from "./content/GradesLandingContent";

type Props = {
  hasInvalidWorkspaceSubject: boolean;
  hasInvalidWorkspaceType: boolean;
  isLanding: boolean;
  selectedGradeType: string;
  selectedSubject: { id: string; name: string } | null;
  subjects: TeacherGradesSubject[];
  selectedSubjectId: string | null;
  onSelectSubject: (value: string | null) => void;
  workspaceTitle: string;
  publishedTitle: string;
  classOptions: Array<{ value: string; label: string }>;
  classValue: string;
  search: string;
  stats: { total: number; graded: number; missing: number; average: number };
  publishedItems: TeacherPublishedItem[];
  routeClassId: string | null;
  deleteConfirmOpen: boolean;
  onBack: () => void;
  onCloseDeleteConfirm: () => void;
  onConfirmDeletePublishedItem: () => void;
  onCreate: () => void;
  onDeletePublishedItem: (itemId: string) => void;
  onPickType: (value: string) => void;
  onSearchChange: (value: string) => void;
  onClassValueChange: (value: string) => void;
};

export function GradesWorkspaceContent(props: Props) {
  if (props.isLanding) {
    return <GradesHomeContent subjects={props.subjects} selectedSubjectId={props.selectedSubjectId} onSelectSubject={props.onSelectSubject} title="Grades" onBack={props.onBack} />;
  }

  if (!props.selectedSubject) {
    const description = props.hasInvalidWorkspaceSubject
      ? "The selected subject is missing or invalid. Choose a subject again to continue."
      : props.hasInvalidWorkspaceType
        ? "The selected grade type is invalid. Choose a grade type again to continue."
        : "Grades is still resolving the selected subject. Try again from the subject list.";

    return (
      <div className="space-y-4">
        <GradesWorkspaceHeader
          title="Grades"
          subtitle="Subject unavailable"
          subjectId={null}
          showBack
          showCreate={false}
          canCreate={false}
          onBack={props.onBack}
          onCreate={props.onCreate}
        />
        <section className="rounded-2xl border border-white/10 bg-white/10 p-6 text-white/80 backdrop-blur-xl">
          {description}
        </section>
      </div>
    );
  }

  if (props.selectedSubject && !props.selectedGradeType) {
    return (
      <div className="flex w-full gap-6 overflow-x-hidden">
        <aside className="w-[220px] shrink-0">
          <GradesLandingContent selectedGradeType="" onPickType={props.onPickType} />
        </aside>
        <section className="flex-1 min-w-0 space-y-4">
          <GradesWorkspaceHeader title="Grades" subtitle={`Choose what you want to grade for ${props.selectedSubject.name}`} subjectId={props.selectedSubject.id} showBack showCreate={false} canCreate={false} onBack={props.onBack} onCreate={props.onCreate} />
          <TeacherGradesHome
            quickActionsText="Select the assessment type to review and manage grades for this subject. You can choose between quizzes, assignments, and exams."
            scoringGuidanceText="Use the grading workspace to view submissions, update scores, and track student performance. Filters and class selectors will help you quickly locate the work you need to grade."
          />
        </section>
      </div>
    );
  }

  return (
    <>
      <GradesWorkspaceHeader title={props.workspaceTitle} subtitle={`Subject: ${props.selectedSubject.name}`} subjectId={props.selectedSubject.id} showBack showCreate canCreate onBack={props.onBack} onCreate={props.onCreate} />
      <GradesWorkspaceFilters stats={props.stats} search={props.search} classValue={props.classValue} classOptions={props.classOptions} onSearchChange={props.onSearchChange} onClassValueChange={props.onClassValueChange} />
      <GradeSubmissionsContent
        title={props.publishedTitle}
        items={props.publishedItems}
        routeClassId={props.routeClassId}
        deleteConfirmOpen={props.deleteConfirmOpen}
        onCloseDeleteConfirm={props.onCloseDeleteConfirm}
        onConfirmDelete={props.onConfirmDeletePublishedItem}
        onDelete={props.onDeletePublishedItem}
      />
    </>
  );
}
