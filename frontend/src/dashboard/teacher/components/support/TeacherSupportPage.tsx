/**
 * TeacherSupportPage
 * ------------------
 * Renders the teacher dashboard s up po rt page content.
 */
import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { getSubjectTheme } from "@/dashboard/teacher/components/shared/subjectTheme";
import TeacherSupportCards from "./TeacherSupportCards";
import TeacherSupportForm from "./TeacherSupportForm";
import TeacherSupportFAQ from "./TeacherSupportFAQ";
import { TicketType } from "./supportData";

type Props = {
  subjectId?: string;
  subjectName?: string;
};

export default function TeacherSupportPage({ subjectId = "", subjectName = "" }: Props) {
  const [type, setType] = useState<TicketType>("technical");
  const theme = getSubjectTheme(subjectId);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${theme.bgClass}`}>
            <HelpCircle className={`h-5 w-5 ${theme.iconClass}`} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">Support</h1>
            <p className="mt-1 text-[var(--text-secondary)]">
              Get help, request content, or report issues
              {subjectName ? ` for ${subjectName}` : ""}
            </p>
          </div>
        </div>
      </header>

      <TeacherSupportCards type={type} setType={setType} subjectId={subjectId} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeacherSupportForm type={type} subjectId={subjectId} subjectName={subjectName} />
        <TeacherSupportFAQ />
      </div>
    </div>
  );
}

