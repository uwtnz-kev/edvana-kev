/** Shared visual tokens for assessment chips and badges in the teacher dashboard. */

export const assessmentSectionChipBaseClass =
  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium text-white";

export const assessmentSectionChipIconBaseClass =
  "inline-flex h-7 w-7 items-center justify-center rounded-xl border";

export const rubricChipStyles = {
  container: `${assessmentSectionChipBaseClass} border-sky-400/20 bg-sky-500/10`,
  icon: `${assessmentSectionChipIconBaseClass} border-sky-400/20 bg-sky-400/15 text-sky-300`,
  text: "text-white",
} as const;

export const attachmentChipStyles = {
  container: `${assessmentSectionChipBaseClass} border-violet-400/20 bg-violet-500/10`,
  icon: `${assessmentSectionChipIconBaseClass} border-violet-400/20 bg-violet-400/15 text-violet-300`,
  text: "text-white",
  list: "space-y-2 rounded-2xl border border-violet-400/15 bg-violet-500/8 p-3",
  item: "flex items-center justify-between gap-3 rounded-xl border border-violet-400/15 bg-slate-950/20 p-2.5",
} as const;

export function getAssessmentStatusBadgeClass(status: string) {
  switch (status.toLowerCase()) {
    case "published":
      return "border-emerald-400/30 bg-emerald-400/15 text-emerald-100";
    case "closed":
      return "border-rose-400/30 bg-rose-400/15 text-rose-100";
    case "scheduled":
      return "border-sky-400/30 bg-sky-400/15 text-sky-100";
    case "draft":
    default:
      return "border-slate-300/20 bg-slate-400/15 text-slate-100";
  }
}
