import { Wrench, BookOpen, ClipboardCheck, Calendar, User } from "lucide-react";
import { cards, TicketType } from "./supportData";

const icons: Record<TicketType, any> = {
  technical: Wrench,
  content: BookOpen,
  assessment: ClipboardCheck,
  schedule: Calendar,
  account: User,
};

export default function TeacherSupportCards({
  type,
  setType,
}: {
  type: TicketType;
  setType: (t: TicketType) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((c) => {
        const Icon = icons[c.key];
        const active = type === c.key;
        return (
          <button
            key={c.key}
            onClick={() => setType(c.key)}
            className={`text-left bg-white/5 backdrop-blur-lg border rounded-2xl p-5 transition-all duration-200 ${
              active ? "border-white/20 shadow-xl bg-white/10" : "border-white/10 hover:bg-white/10"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">{c.title}</p>
                <p className="text-white/70 text-sm mt-1">{c.desc}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
