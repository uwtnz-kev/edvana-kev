/**
 * MessagesHeader
 * --------------
 * Renders the header for the teacher dashboard m es sa ge s feature.
 */
import { Mail } from "lucide-react";
import { getSubjectTheme } from "@/dashboard/teacher/components/shared/subjectTheme";

export default function MessagesHeader({ subjectId = "" }: { subjectId?: string }) {
  const theme = getSubjectTheme(subjectId);

  return (
    <div className="flex items-center gap-5">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}>
        <Mail className={`h-6 w-6 ${theme.iconClass}`} />
      </div>

      <div>
        <h1 className="text-3xl font-semibold text-[#3B240F] leading-tight">
          Messages
        </h1>
        <p className="mt-1 text-[#6B4F3A] text-base">
          Manage conversations across your classes
        </p>
      </div>
    </div>
  );
}

