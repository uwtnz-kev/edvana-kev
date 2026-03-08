// Renders the exam preview summary badges and stat cards.
import { Badge } from "@/components/ui/badge";
import type { TeacherExam } from "../ExamsTypes";
import {
  examPreviewHeroIcon,
  getExamPreviewBadges,
  getExamPreviewStats,
} from "./examPreviewHelpers";

type Props = { exam: TeacherExam };

export function ExamPreviewBody({ exam }: Props) {
  const HeroIcon = examPreviewHeroIcon;
  const stats = getExamPreviewStats(exam);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/10">
          <HeroIcon className="h-5 w-5 text-white/80" />
        </div>
        {getExamPreviewBadges(exam).map((badge) => (
          <Badge
            key={badge}
            className="bg-white/10 text-white border border-white/20 rounded-full px-2 py-1 text-xs font-medium"
          >
            {badge}
          </Badge>
        ))}
      </div>

      <div className="border-t border-white/20 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-white/20 bg-white/10 p-4">
                <div className="text-white/70 text-xs">{stat.label}</div>
                <div className="mt-2 inline-flex items-center gap-2 text-white">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/10">
                    <Icon className="h-5 w-5 text-white/80" />
                  </div>
                  <span>{stat.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
