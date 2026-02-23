// src/dashboard/teacher/views/SubjectDetailsView.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Users, ClipboardList } from "lucide-react";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "../../schooladmin/components/ui/GlassSelect";

type SubjectDetailsRouteParams = {
  subjectId?: string;
};

type SubjectNavData = {
  id: string | number;
  title: string;
  description: string;
  classesCount: number;
  studentsCount: number;
  pendingToGrade: number;
  nextLesson: string;
  color: string;
  bgGradient: string;
};

type LocationState = {
  subject?: SubjectNavData;
};

type ModuleOption = {
  id: string;
  title: string;
};

const defaultModules: ModuleOption[] = [
  { id: "m1", title: "Module 1: Introduction" },
  { id: "m2", title: "Module 2: Core concepts" },
  { id: "m3", title: "Module 3: Practice and review" },
];

export default function SubjectDetailsView() {
  const navigate = useNavigate();
  const { subjectId } = useParams<SubjectDetailsRouteParams>();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const subject = state.subject;

  const modules = defaultModules;
  const [selectedModuleId, setSelectedModuleId] = useState(modules[0]?.id || "");

  useEffect(() => {
    if (!selectedModuleId && modules[0]?.id) setSelectedModuleId(modules[0].id);
  }, [modules, selectedModuleId]);

  const handleModuleChange = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    if (!subjectId) return;
    navigate(`/dashboard/teacher/subjects/${subjectId}/modules/${moduleId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#4B2E1F] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <div className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-[#4B2E1F]/70">
          Subject ID: <span className="text-[#4B2E1F]">{subjectId || "-"}</span>
        </div>
      </div>

      <div
        className="
          rounded-2xl
          border border-white/20
          bg-white/10
          backdrop-blur-lg
          p-8
          transition-all duration-300 ease-out
          hover:bg-white/20
          hover:border-white/30
          hover:shadow-xl
          hover:-translate-y-1
        "
      >
        <div className="flex items-start gap-6">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg ${
              subject?.bgGradient || "bg-white/10"
            }`}
          >
            <BookOpen className="h-7 w-7 text-white" />
          </div>

          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-semibold text-[#4B2E1F]">
              {subject?.title || "Subject details"}
            </h1>

            <p className="mt-2 text-[#4B2E1F]/80 text-base max-w-2xl">
              {subject?.description ||
                "No subject data was passed to this page yet. Pass subject details in navigation state or fetch by subjectId."}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-8 text-[#4B2E1F]/80 text-sm">
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" />
                {subject?.studentsCount ?? 0} students
              </span>

              <span>Classes {subject?.classesCount ?? 0}</span>

              <span className="inline-flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                {subject?.pendingToGrade ?? 0} to grade
              </span>
            </div>

            <div className="mt-4 text-sm text-[#4B2E1F]/80">
              Next lesson:{" "}
              <span className="font-medium text-[#4B2E1F]">
                {subject?.nextLesson || "Not set"}
              </span>
            </div>

            <div className="mt-6 max-w-[420px]">
              <div className="text-xs font-medium text-[#4B2E1F]/70 mb-2">
                Module
              </div>

              <GlassSelect value={selectedModuleId} onValueChange={handleModuleChange}>
                <GlassSelectTrigger className="h-12 rounded-2xl bg-white/15 border border-white/20 text-[#4B2E1F] hover:bg-white/20 transition-colors">
                  <GlassSelectValue placeholder="Select module" />
                </GlassSelectTrigger>

                <GlassSelectContent>
                  {modules.map((m) => (
                    <GlassSelectItem key={m.id} value={m.id}>
                      {m.title}
                    </GlassSelectItem>
                  ))}
                </GlassSelectContent>
              </GlassSelect>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/20 bg-white/10 p-6 transition hover:bg-white/20">
            <div className="flex items-center gap-2 text-[#4B2E1F]/80">
              <Users className="h-4 w-4" />
              Students
            </div>
            <div className="mt-3 text-2xl font-semibold text-[#4B2E1F]">
              {subject?.studentsCount ?? 0}
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-6 transition hover:bg-white/20">
            <div className="flex items-center gap-2 text-[#4B2E1F]/80">
              <ClipboardList className="h-4 w-4" />
              Pending to grade
            </div>
            <div className="mt-3 text-2xl font-semibold text-[#4B2E1F]">
              {subject?.pendingToGrade ?? 0}
            </div>
          </div>

          <div className="rounded-xl border border-white/20 bg-white/10 p-6 transition hover:bg-white/20">
            <div className="flex items-center gap-2 text-[#4B2E1F]/80">
              <BookOpen className="h-4 w-4" />
              Classes
            </div>
            <div className="mt-3 text-2xl font-semibold text-[#4B2E1F]">
              {subject?.classesCount ?? 0}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-6">
        <h2 className="text-lg font-semibold text-[#4B2E1F]">Next steps</h2>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-[#4B2E1F]/70">
          <li>Add an API call: getSubjectById(subjectId)</li>
          <li>Render subject header: name, grade, term, description</li>
          <li>Add tabs: Overview, Students, Assignments, Exams, Resources</li>
        </ol>
      </div>
    </div>
  );
}