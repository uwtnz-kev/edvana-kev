/** Renders the exam preview metadata cards and badges for the page flow. */
import { Badge } from "@/components/ui/badge";
import type { TeacherExam } from "../ExamsTypes";
import { examPreviewHeroIcon, getExamPreviewBadges, getExamPreviewStats } from "./examPreviewHelpers";

type Props = {
  exam: TeacherExam;
  totalSubmissions: number;
  rosterCount: number;
};

export function ExamPreviewBody({ exam, totalSubmissions, rosterCount }: Props) {
  const HeroIcon = examPreviewHeroIcon;
  const stats = getExamPreviewStats(exam, totalSubmissions, rosterCount);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
          <HeroIcon className="h-5 w-5 text-white/80" />
        </div>
        {getExamPreviewBadges(exam).map((badge) => (
          <Badge key={badge.label} className={`${badge.className} rounded-full px-2 py-1 text-xs font-medium`}>
            {badge.label}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl border border-white/20 bg-white/10 p-3.5">
              <div className="text-[11px] text-white/70">{stat.label}</div>
              <div className="mt-1.5 inline-flex items-center gap-2 text-white">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${stat.iconClassName}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm font-medium">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {exam.instructions?.trim() ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">Instructions</div>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/85">{exam.instructions.trim()}</p>
        </div>
      ) : null}
    </div>
  );
}
