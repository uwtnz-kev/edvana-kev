// Renders the create/upload module page header with subject context and back navigation.
import { ArrowLeft, BookOpen, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";

type Props = {
  title?: string;
  subjectName: string;
  theme: SubjectIconTheme;
  onBack: () => void;
  variant?: "create" | "upload";
};

export function UploadModuleHeader({ title, subjectName, theme, onBack, variant = "create" }: Props) {
  const HeaderIcon = variant === "upload" ? Upload : BookOpen;
  const eyebrow = variant === "upload" ? "MODULE UPLOAD" : "MODULE CREATION";

  return (
    <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="button" onClick={onBack} className="w-fit rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/30 hover:shadow-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}>
            <HeaderIcon className={`h-6 w-6 ${theme.iconClass}`} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">{eyebrow}</p>
            <h1 className="mt-1 text-2xl font-semibold text-white">{title ?? "Create Module"}</h1>
            <p className="mt-1 text-[var(--text-secondary)]">Subject: {subjectName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
