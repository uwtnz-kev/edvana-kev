// Renders the published assessment list inside the selected grades workspace.
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/dashboard/teacher/components/assignments/ConfirmDeleteModal";
import { getItemSubmissions, type TeacherPublishedItem } from "@/dashboard/teacher/components/grades";
import { StatusBadge } from "@/dashboard/teacher/components/shared";
import { BarChart3, CalendarDays, Trash2, Users } from "lucide-react";
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

  const getCardStats = (item: TeacherPublishedItem) => {
    const submissions = getItemSubmissions(item.id, "all", "", "all");
    const gradedCount = submissions.filter((submission) => typeof submission.score === "number").length;
    const missingCount = Math.max(item.submissionsCount - submissions.length, 0);
    const average = gradedCount
      ? Math.round(
          submissions.reduce((sum, submission) => sum + (((submission.score ?? 0) / submission.maxScore) * 100), 0) /
            gradedCount,
        )
      : 0;

    return { average, gradedCount, missingCount };
  };

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
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const params = new URLSearchParams({ type: item.type, subjectId: item.subjectId });
              const stats = getCardStats(item);
              return (
                <article key={item.id} className="group teacher-panel-surface rounded-2xl border border-white/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--sidebar-item-active)] text-[var(--accent-primary)]">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-xs capitalize text-white/60">{item.type} grade list</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-white/70">
                    <div>Class: <span className="text-white">{item.className}</span></div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                      <span>Date: <span className="text-white">{new Date(item.dueDate).toLocaleDateString()}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                      <span>Entries: <span className="text-white">{item.submissionsCount}</span></span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <div className="text-white/50">Graded</div>
                        <div className="mt-1 font-semibold text-emerald-300">{stats.gradedCount}</div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <div className="text-white/50">Missing</div>
                        <div className="mt-1 font-semibold text-amber-300">{stats.missingCount}</div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <div className="text-white/50">Average</div>
                        <div className="mt-1 font-semibold text-sky-300">{stats.average}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <StatusBadge status="published" label="Published" className="text-[11px]" />
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        onClick={() => navigate(`${TEACHER_ROUTES.GRADES_WORKSPACE}/${item.id}?${params.toString()}`)}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl h-8 px-3"
                      >
                        View
                      </Button>
                      {item.type !== "exam" ? (
                        <Button
                          type="button"
                          onClick={() => onDelete(item.id)}
                          className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl h-8 px-3"
                        >
                          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                          Delete
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </article>
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
