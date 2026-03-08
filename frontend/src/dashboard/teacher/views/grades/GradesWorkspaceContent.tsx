// Switches between the landing, empty-subject, and active workspace grades content.
import type { TeacherGradesSubject, TeacherPublishedItem } from "@/dashboard/teacher/components/grades";
import { GradesWorkspaceHeader } from "./GradesWorkspaceHeader";
import { GradesWorkspaceFilters } from "./GradesWorkspaceFilters";
import { GradeSubmissionsContent } from "./content/GradeSubmissionsContent";
import { GradesHomeContent } from "./content/GradesHomeContent";
import { GradesLandingContent } from "./content/GradesLandingContent";

type Props = {
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
    return <GradesLandingContent selectedGradeType={props.selectedGradeType} onPickType={props.onPickType} />;
  }

  if (!props.selectedSubject) {
    return <GradesHomeContent subjects={props.subjects} selectedSubjectId={props.selectedSubjectId} onSelectSubject={props.onSelectSubject} title={props.workspaceTitle} onBack={props.onBack} />;
  }

  return (
    <>
      <GradesWorkspaceHeader title={props.workspaceTitle} subtitle={`Subject: ${props.selectedSubject.name}`} subjectId={props.selectedSubject.id} showBack showCreate canCreate onBack={props.onBack} onCreate={props.onCreate} />
      <GradesWorkspaceFilters stats={props.stats} search={props.search} classValue={props.classValue} classOptions={props.classOptions} onSearchChange={props.onSearchChange} onClassValueChange={props.onClassValueChange} />
      <GradeSubmissionsContent
        title={props.publishedTitle}
        items={props.publishedItems}
        deleteConfirmOpen={props.deleteConfirmOpen}
        onCloseDeleteConfirm={props.onCloseDeleteConfirm}
        onConfirmDelete={props.onConfirmDeletePublishedItem}
        onDelete={props.onDeletePublishedItem}
      />
    </>
  );
}
