// Renders the landing state where teachers choose which assessment type to grade.
import { SegmentedTabs } from "@/dashboard/teacher/components/shared";

type Props = {
  selectedGradeType: string;
  onPickType: (value: string) => void;
};

export function GradesLandingContent({ selectedGradeType, onPickType }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
      <SegmentedTabs
        value={selectedGradeType}
        options={[
          { value: "quiz", label: "Quiz" },
          { value: "assignment", label: "Assignment" },
          { value: "exam", label: "Exam" },
        ]}
        onChange={onPickType}
      />
    </div>
  );
}
