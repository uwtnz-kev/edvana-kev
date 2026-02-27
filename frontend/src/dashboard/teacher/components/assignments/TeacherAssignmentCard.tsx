import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Status = "draft" | "active" | "grading";

type Props = {
  id: string;
  title: string;
  classNameLabel: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: Status;
  color: string;
  bgGradient: string;
  onDelete: (id: string) => void;
  onPublish?: (id: string) => void;
};

function safePercent(submissions: number, total: number) {
  if (!total) return 0;
  const v = Math.round((submissions / total) * 100);
  return Number.isFinite(v) ? v : 0;
}

function safeDueLabel(dueDate: string) {
  const d = new Date(dueDate);
  if (Number.isNaN(d.getTime())) return "Due date not set";
  return `Due ${d.toLocaleDateString()}`;
}

export function TeacherAssignmentCard({
  id,
  title,
  classNameLabel,
  dueDate,
  submissions,
  totalStudents,
  status,
  color,
  bgGradient,
  onDelete,
  onPublish,
}: Props) {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const percent = useMemo(
    () => safePercent(submissions, totalStudents),
    [submissions, totalStudents]
  );

  const dueLabel = useMemo(() => safeDueLabel(dueDate), [dueDate]);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/dashboard/teacher/assignments/${id}`);
  };

  const statusLabel = status.toUpperCase();

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] group">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${bgGradient} transition-transform duration-300 group-hover:scale-110`}
        >
          <ClipboardList className="h-7 w-7 text-white" />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className={`text-sm font-semibold ${color}`}>
              {statusLabel}
            </div>
            <div className="mt-2 h-2 w-28 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${bgGradient}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogContent className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A]">
              <AlertDialogHeader>
                <AlertDialogTitle>Delete assignment</AlertDialogTitle>
                <AlertDialogDescription className="text-[#6B5A4A]">
                  Are you sure you want to delete this assignment This cannot be undone
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] hover:bg-[#CBB89D]">
                  No
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-[#FF715B] hover:bg-[#FF715B]/90 text-[#1B1B1B]"
                  onClick={() => {
                    onDelete(id);
                    setConfirmOpen(false);
                  }}
                >
                  Yes delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-2xl font-extrabold text-[#3B2A1A]">
          {title}
        </div>
        <div className="mt-2 text-[#6B5A4A]">{classNameLabel}</div>

        <div className="mt-4 flex items-center justify-between gap-6 text-[#3B2A1A]">
          <div>
            <div className="text-[#6B5A4A] text-xs">Due</div>
            <div className="text-sm font-medium">{dueLabel}</div>
          </div>

          {status === "draft" && (
            <button
              type="button"
              onClick={() => onPublish?.(id)}
              className={`px-4 py-2 rounded-lg ${bgGradient} text-white text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95`}
            >
              Publish
            </button>
          )}
        </div>

        <div className="mt-5">
          <div className="text-[#6B5A4A] text-xs mb-2">Submissions</div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full ${bgGradient}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-[#3B2A1A]">
            {submissions}/{totalStudents} submitted
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setConfirmOpen(true);
            }}
            className="h-9 w-9 p-0 rounded-full hover:bg-red-100 transition-colors duration-200"
            aria-label="Delete assignment"
          >
            <Trash2 className="h-5 w-5 text-[#3B2A1A] hover:text-red-600 transition-colors duration-200" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={handleOpen}
            className={`${color} hover:bg-white/10 transition-colors duration-200`}
          >
            Open →
          </Button>
        </div>
      </div>
    </div>
  );
}