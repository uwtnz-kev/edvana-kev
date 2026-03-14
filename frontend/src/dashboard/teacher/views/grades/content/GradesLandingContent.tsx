// Renders the landing state where teachers choose which assessment type to grade.
import { ClipboardList, FileCheck2, HelpCircle } from "lucide-react";

type Props = {
  selectedGradeType: string;
  onPickType: (value: string) => void;
};

export function GradesLandingContent({ selectedGradeType, onPickType }: Props) {
  const options = [
    {
      value: "quiz",
      label: "Quiz",
      icon: HelpCircle,
      iconClassName: "bg-purple-500/20 text-purple-400",
    },
    {
      value: "assignment",
      label: "Assignment",
      icon: ClipboardList,
      iconClassName: "bg-blue-500/20 text-blue-400",
    },
    {
      value: "exam",
      label: "Exam",
      icon: FileCheck2,
      iconClassName: "bg-amber-500/20 text-amber-400",
    },
  ] as const;

  return (
    <aside className="teacher-panel-surface rounded-2xl p-3">
      <div className="px-2 pt-1 pb-3">
        <h2 className="text-white text-sm font-semibold">Assessment Type</h2>
      </div>
      <div className="space-y-2">
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = selectedGradeType === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onPickType(option.value)}
              className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "border-white/25 bg-white/20 text-white shadow-sm"
                  : "bg-white/5 border-white/10 text-white/90 hover:bg-white/25 hover:border-white/20 hover:shadow-sm hover:-translate-y-[1px]"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-200 ${
                  isActive
                    ? option.iconClassName
                    : `${option.iconClassName} group-hover:scale-105`
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="truncate">{option.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
