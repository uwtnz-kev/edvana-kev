/**
 * AnnouncementCard
 * ----------------
 * Renders the A nn ou nc em en tC ar d UI for the teacher dashboard a nn ou nc em en ts feature.
 */
import { useState } from "react";
import { CalendarDays, Megaphone, Pencil, Send, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/dashboard/teacher/components/assignments/ConfirmDeleteModal";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import type { TeacherAnnouncement } from "@/dashboard/teacher/types/announcementTypes";

type Props = {
  item: TeacherAnnouncement;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
};

export function AnnouncementCard({ item, onEdit, onDelete, onPublish }: Props) {
  const [open, setOpen] = useState(false);
  const theme = getSubjectIconTheme(item.subject);
  const tone = item.status === "published" ? "bg-teal-500/20 text-teal-700" : "bg-amber-400/20 text-amber-700";

  return (
    <article className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-xl transition-all duration-300 hover:bg-white/20">
      <div className="flex items-stretch justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-stretch gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.bgClass}`}>
            <Megaphone className={`h-5 w-5 ${theme.iconClass}`} />
          </div>

          <div className="flex min-w-0 flex-1 self-stretch flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-semibold text-white">{item.title}</h3>
              <Badge className={`border-0 ${tone}`}>{item.status === "draft" ? "Draft" : "Published"}</Badge>
            </div>

            <p className="mt-1.5 line-clamp-2 text-sm text-white/75">{item.body}</p>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-1.5 text-xs text-white/70">
              <span>{item.classLabel}</span>
              <span>&bull;</span>
              <span>{item.subject}</span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-4 flex shrink-0 flex-col gap-2">
          {item.status === "draft" ? (
            <Button type="button" onClick={() => onPublish(item.id)} className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20">
              <Send className="mr-1.5 h-3.5 w-3.5" />
              Publish
            </Button>
          ) : null}

          <Button type="button" onClick={() => onEdit(item.id)} className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20">
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>

          <Button type="button" onClick={() => setOpen(true)} className="rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20">
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </div>
      <ConfirmDeleteModal
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => onDelete(item.id)}
        title="Delete announcement"
        description="This announcement will be removed immediately."
      />
    </article>
  );
}

