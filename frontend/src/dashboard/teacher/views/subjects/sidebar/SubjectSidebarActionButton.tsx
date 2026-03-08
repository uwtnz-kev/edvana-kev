// Button renderer for a single subject workspace action in the left sidebar.
import type { SubjectSidebarAction } from "../subjectViewHelpers";

type Props = {
  action: SubjectSidebarAction;
  onClick: (action: SubjectSidebarAction) => void;
};

export function SubjectSidebarActionButton({ action, onClick }: Props) {
  const Icon = action.icon;

  return (
    <button
      type="button"
      onClick={() => onClick(action)}
      className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-left text-sm font-medium text-white/90 transition-all duration-200 hover:border-white/20 hover:bg-white/15 hover:text-white"
    >
      <Icon className="h-4 w-4" />
      {action.label}
    </button>
  );
}
