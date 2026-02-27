// src/dashboard/teacher/views/ExamDetailsView.tsx
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTeacherExamById } from "@/dashboard/teacher/components/exams/examsStore";

function safeDue(dueDate: string) {
  const t = new Date(dueDate).getTime();
  if (Number.isNaN(t)) return "Due date not set";
  return `Due ${new Date(t).toLocaleDateString()}`;
}

export default function ExamDetailsView() {
  const navigate = useNavigate();
  const { examId } = useParams();

  const exam = useMemo(() => {
    if (!examId) return null;
    return getTeacherExamById(examId);
  }, [examId]);

  if (!examId) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="text-white font-semibold">Missing exam id</div>
          <div className="text-white/60 mt-2">The URL is missing the exam identifier.</div>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>Go back</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-white/80" />
            <div className="text-white font-semibold">Exam not found</div>
          </div>
          <div className="text-white/60 mt-2">No exam matches id {examId}.</div>
          <div className="mt-4 flex gap-2">
            <Button variant="secondary" onClick={() => navigate("/dashboard/teacher/exams")}>
              Back to exams
            </Button>
            <Button onClick={() => navigate(-1)}>Go back</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          className="gap-2"
          onClick={() => navigate("/dashboard/teacher/exams")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-white/80" />
              <h1 className="text-2xl font-bold text-white truncate">{exam.title}</h1>
            </div>
            <div className="text-[#1EA896] text-sm font-medium mt-1">{exam.subject}</div>
            <p className="text-white/70 mt-3">{exam.description}</p>
          </div>

          <div className="text-right">
            <div className="text-white/60 text-sm">{safeDue(exam.dueDate)}</div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <Clock className="h-4 w-4 text-white/60" />
              <div className="text-white/80 text-sm">{exam.timeLimit} min</div>
            </div>
            <div className="text-white/80 text-sm mt-2">{exam.questionsCount} questions</div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <div className="text-white font-semibold">Submissions</div>
        <div className="text-white/70 mt-2">
          {exam.submissions}/{exam.totalStudents} submitted
        </div>
      </div>
    </div>
  );
}