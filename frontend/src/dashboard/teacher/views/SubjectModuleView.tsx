// src/dashboard/teacher/views/SubjectModuleView.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

type Params = {
  subjectId?: string;
  moduleId?: string;
};

export default function SubjectModuleView() {
  const navigate = useNavigate();
  const { subjectId, moduleId } = useParams<Params>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#4B2E1F] transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="text-sm text-[#4B2E1F]/70">
          Subject ID: {subjectId} | Module ID: {moduleId}
        </div>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-8">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-[#4B2E1F]" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-[#4B2E1F]">
              Module {moduleId}
            </h1>
            <p className="text-[#4B2E1F]/70 mt-1">
              This is the module page for this subject.
            </p>
          </div>
        </div>

        <div className="mt-8 text-[#4B2E1F]/80 text-sm">
          Later this page will contain:
          <ul className="mt-3 list-disc list-inside space-y-1">
            <li>Lessons</li>
            <li>Assignments</li>
            <li>Quizzes</li>
            <li>Resources</li>
            <li>Module progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
}