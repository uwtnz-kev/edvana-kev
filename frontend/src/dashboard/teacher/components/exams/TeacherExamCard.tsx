import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, FileText, Trash2 } from "lucide-react";
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
import { StatusBadge } from "@/dashboard/student/components/shared";

type Status = "upcoming" | "active" | "completed";

type Props = {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questionsCount: number;
  status: Status;
  dueDate: string;
  subject: string;
  submissions: number;
  totalStudents: number;
  avgScore?: number;
  color: string;
  bgGradient: string;
  onDelete?: (id: string) => void;
};

function safePct(submissions: number, total: number) {
  if (!total) return 0;
  const v = Math.round((submissions / total) * 100);
  return Number.isFinite(v) ? v : 0;
}

function safeDue(dueDate: string) {
  const t = new Date(dueDate).getTime();
  if (Number.isNaN(t)) return "Due date not set";
  return `Due ${new Date(t).toLocaleDateString()}`;
}

export default function TeacherExamCard({
  id,
  title,
  description,
  timeLimit,
  questionsCount,
  status,
  dueDate,
  subject,
  submissions,
  totalStudents,
  avgScore,
  color,
  bgGradient,
  onDelete,
}: Props) {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const pct = useMemo(() => safePct(submissions, totalStudents), [submissions, totalStudents]);
  const dueLabel = useMemo(() => safeDue(dueDate), [dueDate]);
  const isOverdue = status === "upcoming" && new Date(dueDate) < new Date();

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/dashboard/teacher/exams/${id}`);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 ${bgGradient} rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <FileText className="h-6 w-6 text-white" />
        </div>

        <div className="flex flex-col items-end space-y-2">
          <StatusBadge status={status} />
          {isOverdue && <StatusBadge status="overdue" />}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 transition-colors duration-300 group-hover:text-white/90">
            {title}
          </h3>
          <p className="text-[#1EA896] text-sm font-medium">{subject}</p>
        </div>

        <p className="text-white/70 text-sm line-clamp-2">{description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1">
          <Clock className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">{timeLimit} min</span>
        </div>

        <div className="flex items-center space-x-2 transition-transform duration-300 group-hover:translate-x-1">
          <FileText className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">{questionsCount} questions</span>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <div>
          <p className="text-white/60 text-xs">Due</p>
          <p className="text-white text-sm font-medium">{dueLabel}</p>
        </div>

        {status === "completed" ? (
          <div className="text-right">
            <p className="text-white/60 text-xs">Avg Score</p>
            <p
              className={`text-lg font-bold transition-all duration-300 ${
                avgScore != null && avgScore >= 80
                  ? "text-[#1EA896]"
                  : avgScore != null && avgScore >= 60
                  ? "text-[#FF715B]"
                  : "text-red-400"
              } group-hover:scale-110`}
            >
              {avgScore ?? 0}%
            </p>
          </div>
        ) : (
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${bgGradient} text-white text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95`}
          >
            Publish
          </button>
        )}
      </div>

      <div className="mt-4">
        <p className="text-white/60 text-xs mb-2">Submissions</p>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full ${bgGradient} transition-all duration-500 group-hover:brightness-110`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-white/70 text-xs mt-2">
          {submissions}/{totalStudents} submitted
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setConfirmOpen(true);
          }}
          className="h-9 w-9 p-0 rounded-full hover:bg-red-100 transition-colors duration-200"
          aria-label="Delete exam"
        >
          <Trash2 className="h-5 w-5 text-[#3B2A1A] hover:text-red-600 transition-colors duration-200" />
        </Button>

        <button
          type="button"
          onClick={handleOpen}
          className={`text-sm font-medium ${color} hover:opacity-90 transition-opacity duration-200`}
        >
          Open →
        </button>

        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A]">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete exam</AlertDialogTitle>
              <AlertDialogDescription className="text-[#6B5A4A]">
                Are you sure you want to delete this exam This cannot be undone
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] hover:bg-[#CBB89D]">
                No
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#FF715B] hover:bg-[#FF715B]/90 text-[#1B1B1B]"
                onClick={() => {
                  onDelete?.(id);
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
  );
}