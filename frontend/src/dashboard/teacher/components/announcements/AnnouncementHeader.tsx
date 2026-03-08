/**
 * AnnouncementHeader
 * ------------------
 * Renders the header for the teacher dashboard a nn ou nc em en ts feature.
 */
import { ArrowLeft, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";

type Props = {
  title: string;
  subtitle: string;
  subjectName?: string | null;
  onBack?: () => void;
};

export function AnnouncementHeader({ title, subtitle, subjectName, onBack }: Props) {
  const theme = subjectName ? getSubjectIconTheme(subjectName) : null;

  return (
    <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {onBack ? (
          <Button
            type="button"
            onClick={onBack}
            className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : null}
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme?.bgClass ?? "bg-amber-500/20"}`}>
            <Megaphone className={`h-6 w-6 ${theme?.iconClass ?? "text-amber-700"}`} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#3B240F]">{title}</h1>
            <p className="mt-1 text-[#3B240F]/70">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

