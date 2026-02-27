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
  const getIconBg = (key: string) => {
    const colors: Record<string, string> = {
      technical: 'bg-gradient-to-br from-[#8B6F52]/75 to-[#6F5238]/75',  // Brown
      content: 'bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85',     // Teal/Green
      assessment: 'bg-gradient-to-br from-[#F59E0B]/85 to-[#D97706]/85',  // YELLOW/Gold
      schedule: 'bg-gradient-to-br from-[#EF4444]/85 to-[#DC2626]/85',    // Quiet Red
      account: 'bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85',     // Teal/Green
    };
    return colors[key] || 'bg-gradient-to-br from-[#8B6F52]/75 to-[#6F5238]/75';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((c) => {
        const Icon = icons[c.key as keyof typeof icons];
        const active = type === c.key;
        return (
          <button
            key={c.key}
            onClick={() => setType(c.key)}
            className={`group text-left bg-white/5 backdrop-blur-lg border rounded-2xl p-5 transition-all duration-300 ease-out hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-white/20 ${
              active ? "border-white/20 shadow-xl bg-white/10 ring-2 ring-white/30" : "border-white/10"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-all duration-300 ${getIconBg(c.key)}`}>
                <Icon className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <p className="text-white font-semibold group-hover:text-white transition-colors duration-300">{c.title}</p>
                <p className="text-white/70 text-sm mt-1">{c.desc}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
