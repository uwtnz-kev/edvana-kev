/**
 * TeacherSupportCards
 * -------------------
 * Implements the T ea ch er Su pp or tC ar ds module for the teacher dashboard s up po rt feature.
 */
import { Wrench, BookOpen, ClipboardCheck, Calendar, User } from "lucide-react";
import { getSubjectTheme } from "@/dashboard/teacher/components/shared/subjectTheme";
import { cards, TicketType } from "./supportData";

const icons: Record<TicketType, any> = {
  technical: Wrench,
  content: BookOpen,
  assessment: ClipboardCheck,
  schedule: Calendar,
  account: User,
};

const SUPPORT_CARD_ICON_THEMES: Record<TicketType, ReturnType<typeof getSubjectTheme>> = {
  technical: getSubjectTheme("subject-2-physics"),
  content: getSubjectTheme("subject-2-geography"),
  assessment: getSubjectTheme("subject-2-math"),
  schedule: getSubjectTheme("subject-2-english"),
  account: getSubjectTheme("subject-2-bio"),
};

const CARD_THEMES: Record<
  TicketType,
  {
    activeBg: string;
    activeBorder: string;
  }
> = {
  technical: {
    activeBg: "bg-amber-500/12",
    activeBorder: "border-[var(--card-border)]",
  },
  content: {
    activeBg: "bg-cyan-500/12",
    activeBorder: "border-cyan-400/35",
  },
  assessment: {
    activeBg: "bg-blue-500/12",
    activeBorder: "border-blue-400/35",
  },
  schedule: {
    activeBg: "bg-pink-500/12",
    activeBorder: "border-pink-400/35",
  },
  account: {
    activeBg: "bg-emerald-500/12",
    activeBorder: "border-emerald-400/35",
  },
};

export default function TeacherSupportCards({
  type,
  setType,
  subjectId = "",
}: {
  type: TicketType;
  setType: (t: TicketType) => void;
  subjectId?: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((c) => {
        const Icon = icons[c.key as keyof typeof icons];
        const active = type === c.key;
        const cardTheme = CARD_THEMES[c.key];
        const iconTheme = SUPPORT_CARD_ICON_THEMES[c.key];
        const hoverClasses = c.key === "assessment" ? "" : "teacher-panel-hover-lift";
        return (
          <button
            key={c.key}
            onClick={() => setType(c.key)}
            className={`group teacher-panel-surface text-left rounded-2xl p-5 ${hoverClasses} ${
              active
                ? `${cardTheme.activeBg} ${cardTheme.activeBorder}`
                : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconTheme.bgClass}`}
              >
                <Icon className={`h-6 w-6 transition-transform duration-200 group-hover:scale-105 ${iconTheme.iconClass}`} />
              </div>
              <div>
                <p className="font-semibold text-white">{c.title}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{c.desc}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

