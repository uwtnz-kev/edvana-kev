import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destructiveActionButtonClass, destructiveActionIconClass } from "@/dashboard/teacher/components/shared/destructiveActionStyles";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";

type Props = {
  moduleId: string;
  submodule: SubjectModuleItem["submodules"][number];
  onDelete: (moduleId: string, submoduleId: string) => void;
  onOpen: () => void;
};

function SubjectSubmoduleRowContent({ title }: { title: string }) {
  return (
    <div className="flex min-w-0 max-w-[80%] flex-1 flex-col">
      <p className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm font-semibold text-[var(--text-primary)] transition hover:text-[#1EA896]">
        {title}
      </p>
    </div>
  );
}

function SubjectSubmoduleRowActions({
  moduleId,
  submoduleId,
  title,
  onDelete,
}: {
  moduleId: string;
  submoduleId: string;
  title: string;
  onDelete: (moduleId: string, submoduleId: string) => void;
}) {
  return (
    <Button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onDelete(moduleId, submoduleId);
      }}
      className={`flex items-center justify-center shrink-0 !h-8 !min-h-[2rem] !min-w-[90px] !px-2.5 !py-0 !text-xs !gap-1.5 !rounded-md ${destructiveActionButtonClass}`}
      aria-label={`Delete ${title}`}
    >
      <Trash2 className={`h-3.5 w-3.5 ${destructiveActionIconClass}`} />
      Delete
    </Button>
  );
}

export function SubjectSubmoduleRow({ moduleId, submodule, onDelete, onOpen }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: submodule.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      className={`flex cursor-pointer flex-col gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 ${isDragging ? "opacity-90 ring-1 ring-cyan-300/50" : ""}`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <button
          type="button"
          className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/65 transition hover:bg-white/20 hover:text-white"
          aria-label={`Reorder ${submodule.title}`}
          onClick={(event) => event.stopPropagation()}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <SubjectSubmoduleRowContent title={submodule.title} />
      </div>
      <SubjectSubmoduleRowActions
        moduleId={moduleId}
        submoduleId={submodule.id}
        title={submodule.title}
        onDelete={onDelete}
      />
    </div>
  );
}
