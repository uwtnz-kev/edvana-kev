// Renders the published assessment list inside the selected grades workspace.
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/dashboard/teacher/components/assignments/ConfirmDeleteModal";
import type { TeacherPublishedItem } from "@/dashboard/teacher/components/grades";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TEACHER_ROUTES } from "@/dashboard/teacher/routes";

type Props = {
  title: string;
  items: TeacherPublishedItem[];
  deleteConfirmOpen: boolean;
  onCloseDeleteConfirm: () => void;
  onConfirmDelete: () => void;
  onDelete: (itemId: string) => void;
};

export function GradeSubmissionsContent({
  title,
  items,
  deleteConfirmOpen,
  onCloseDeleteConfirm,
  onConfirmDelete,
  onDelete,
}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <section className="space-y-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <span className="text-xs text-white/70">{items.length} items</span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/75">No published items found for the selected filters.</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
              const params = new URLSearchParams({ type: item.type, subjectId: item.subjectId });
              return (
                <div key={item.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 sm:flex-row sm:items-start sm:justify-between">
                  <button
                    type="button"
                    onClick={() => navigate(`${TEACHER_ROUTES.GRADES_WORKSPACE}/${item.id}?${params.toString()}`)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-white/70">{`Class: ${item.className} | Due: ${new Date(item.dueDate).toLocaleString()}`}</p>
                  </button>
                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <span className="rounded-full border border-teal-500/40 bg-teal-500/20 px-2 py-1 text-xs text-teal-900">published</span>
                    <Button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl h-8 px-3"
                    >
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <ConfirmDeleteModal
        open={deleteConfirmOpen}
        onOpenChange={(open) => {
          if (!open) onCloseDeleteConfirm();
        }}
        title="Delete grade list?"
        description="This grade list will be removed immediately."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={onConfirmDelete}
      />
    </>
  );
}
