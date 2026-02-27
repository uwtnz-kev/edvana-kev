// src/dashboard/teacher/views/SubjectDetailsView.tsx
import React, { useEffect, useMemo, useState } from "react";
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

function StatCard({
  icon,
  label,
  sublabel,
  value,
  variant = "charcoal",
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  value: number | string;
  variant?: "teal" | "coral" | "charcoal";
}) {
  const variants = {
    teal: { iconBg: "bg-[#2CB7A7]", valueText: "text-[#2CB7A7]" },
    coral: { iconBg: "bg-[#FF6B57]", valueText: "text-[#FF6B57]" },
    charcoal: { iconBg: "bg-[#3F464B]", valueText: "text-[#4B5563]" },
  } as const;

  const v = variants[variant] ?? variants.charcoal;

  return (
    <div
      className="
        w-full
        rounded-2xl
        border border-white/20
        bg-white/10
        px-5 py-4
        backdrop-blur-md
        transition-all duration-300
        hover:bg-white/15
        hover:border-white/30
        hover:shadow-lg
        hover:-translate-y-1
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${v.iconBg}`}>
            {React.isValidElement(icon)
              ? React.cloneElement(icon, { className: "h-5 w-5 text-[#1F2326]" })
              : icon}
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold text-[#4B2E1F]">{label}</div>
            {sublabel ? (
              <div className="text-xs text-[#4B2E1F]/60">{sublabel}</div>
            ) : null}
          </div>
        </div>

        <div className={`text-3xl font-semibold ${v.valueText}`}>{value}</div>
      </div>
    </div>
  );
}

function MetaChip({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-[#4B2E1F]/80">
      {icon ? <span className="text-[#4B2E1F]/70">{icon}</span> : null}
      <span className="whitespace-nowrap">{children}</span>
    </div>
  );
}

export default function SubjectDetailsView() {
  const navigate = useNavigate();
  const { subjectId } = useParams<SubjectDetailsRouteParams>();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const subject = state.subject;

  const modules = useMemo(() => defaultModules, []);
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

      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">
          <div className="flex items-start gap-4 min-w-0">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                subject?.bgGradient || "bg-white/10"
              }`}
            >
              <BookOpen className="h-5 w-5 text-white" />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-[#4B2E1F] leading-tight">
                {subject?.title || "Subject details"}
              </h1>

              <p className="mt-1 text-sm text-[#4B2E1F]/75 max-w-xl">
                {subject?.description ||
                  "No subject data was passed to this page yet. Pass subject details in navigation state or fetch by subjectId."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <StatCard
              icon={<Users />}
              label="Students"
              sublabel="Across all classes"
              value={subject?.studentsCount ?? 0}
              variant="coral"
            />
            <StatCard
              icon={<BookOpen />}
              label="Classes"
              sublabel="Assigned this term"
              value={subject?.classesCount ?? 0}
              variant="teal"
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-end">
          <div className="flex flex-wrap gap-3">
            <MetaChip icon={<Users className="h-4 w-4" />}>{subject?.studentsCount ?? 0} students</MetaChip>
            <MetaChip>Classes {subject?.classesCount ?? 0}</MetaChip>
            <MetaChip icon={<ClipboardList className="h-4 w-4" />}>
              {subject?.pendingToGrade ?? 0} to grade
            </MetaChip>
            <MetaChip>
              Next lesson:{" "}
              <span className="font-medium text-[#4B2E1F]">{subject?.nextLesson || "Not set"}</span>
            </MetaChip>
          </div>

          <div>
            <div className="text-xs font-medium text-[#4B2E1F]/70 mb-2">Module</div>
            <GlassSelect value={selectedModuleId} onValueChange={handleModuleChange}>
              <GlassSelectTrigger className="h-12 w-full rounded-2xl bg-white/15 border border-white/20 text-[#4B2E1F] hover:bg-white/20 transition-colors">
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