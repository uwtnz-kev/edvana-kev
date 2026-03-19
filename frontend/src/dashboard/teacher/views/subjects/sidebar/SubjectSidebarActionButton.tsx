// Button renderer for a single subject workspace action in the left sidebar.
import type { SubjectSidebarAction } from "../subjectViewHelpers";

type Props = {
  action: SubjectSidebarAction;
  onClick: (action: SubjectSidebarAction) => void;
};

const ACTION_ICON_CLASS_BY_VALUE: Record<string, string> = {
  modules: "bg-indigo-500/20 text-indigo-400",
  "upload-module": "bg-emerald-500/20 text-emerald-400",
  "upload-module-file": "bg-amber-500/20 text-amber-300",
  files: "bg-sky-500/20 text-sky-400",
  "upload-files": "bg-amber-500/20 text-amber-300",
};

export function SubjectSidebarActionButton({ action, onClick }: Props) {
  const Icon = action.icon;
  const iconClassName = ACTION_ICON_CLASS_BY_VALUE[action.value] ?? "bg-white/10 text-white";

  return (
    <button
      type="button"
      onClick={() => onClick(action)}
      className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-left text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:border-white/20 hover:bg-white/15 hover:text-white"
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl p-3 ${iconClassName}`}>
        <Icon className="h-4 w-4" />
      </span>
      {action.label}
    </button>
  );
}
