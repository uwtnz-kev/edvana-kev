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
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="group h-11 w-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#8B6F52]/20"
            type="button"
          >
            <ArrowLeft className="h-5 w-5 text-[#3B240F] group-hover:scale-110 transition-transform duration-300" />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-[#3B240F]">
              Module {moduleId}
            </h1>
            <p className="text-sm text-[#6B4F3A]">
              Subject: {subjectId}
            </p>
          </div>
        </div>

        <div className="text-sm text-[#6B4F3A]">
          Subject ID: {subjectId} | Module ID: {moduleId}
        </div>
      </div>

      <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#8B6F52]/20">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#8B6F52]/75 to-[#6F5238]/75 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <BookOpen className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-[#3B240F]">
              Module {moduleId}
            </h1>
            <p className="text-[#6B4F3A] mt-1">
              This is the module page for this subject.
            </p>
          </div>
        </div>

        <div className="mt-8 text-[#6B4F3A] text-sm">
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
