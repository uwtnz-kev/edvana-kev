// Wraps the shared grades filters and stats so the workspace shell stays compact.
import { TeacherGradesControls, TeacherGradesStats, type TeacherGradesStatsData } from "@/dashboard/teacher/components/grades";

type Option = {
  value: string;
  label: string;
};

type Props = {
  stats: TeacherGradesStatsData;
  search: string;
  classValue: string;
  classOptions: Option[];
  onSearchChange: (value: string) => void;
  onClassValueChange: (value: string) => void;
};

export function GradesWorkspaceFilters({
  stats,
  search,
  classValue,
  classOptions,
  onSearchChange,
  onClassValueChange,
}: Props) {
  return (
    <>
      <TeacherGradesStats stats={stats} />
      <TeacherGradesControls
        search={search}
        classValue={classValue}
        classOptions={classOptions}
        onSearchChange={onSearchChange}
        onClassValueChange={onClassValueChange}
        searchPlaceholder="Search assessment title"
        disabled={false}
      />
    </>
  );
}
