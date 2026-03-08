/**
 * ParentHeader
 * ------------
 * Renders the header for the teacher dashboard p ar en ts feature.
 */
import { ArrowLeft, Users } from "lucide-react";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showCreate?: boolean;
  onBack?: () => void;
};

export default function ParentHeader({
  title = "Parents",
  subtitle = "View parent contacts and linked students",
  showBack = false,
  showCreate = false,
  onBack,
}: Props) {
  const theme = getSubjectIconTheme("parents");
  const showSpacer = !showBack && !showCreate;

  return (
    <header className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-5">
      <div className={`flex flex-col sm:flex-row sm:items-center gap-4 ${showSpacer ? "sm:justify-start" : "sm:justify-between"}`}>
        <div className="flex items-center gap-4">
          {showBack ? (
            <Button
              type="button"
              onClick={onBack}
              className="bg-white/10 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          ) : null}
          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${theme.bgClass}`}>
            <Users className={`h-6 w-6 ${theme.iconClass}`} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#3B240F]">{title}</h1>
            <p className="text-[#3B240F]/70 mt-1">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

