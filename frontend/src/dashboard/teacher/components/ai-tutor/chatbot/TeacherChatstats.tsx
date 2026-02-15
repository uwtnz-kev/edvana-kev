import { Bot, ClipboardList, FileText, Sparkles } from "lucide-react";

function StatCard({
  icon,
  value,
  label,
  iconBg,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBg: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <div>
          <div className="text-3xl font-bold text-white leading-none">{value}</div>
          <div className="text-white/60 text-sm mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
}

export default function TeacherChatStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        icon={<Sparkles className="h-6 w-6 text-white" />}
        value="24/7"
        label="Planning support"
        iconBg="bg-[#1EA896]"
      />
      <StatCard
        icon={<ClipboardList className="h-6 w-6 text-white" />}
        value="Rubrics"
        label="Marking templates"
        iconBg="bg-[#FF715B]"
      />
      <StatCard
        icon={<FileText className="h-6 w-6 text-white" />}
        value="Quizzes"
        label="Question drafts"
        iconBg="bg-[#4C5454]"
      />
      <StatCard
        icon={<Bot className="h-6 w-6 text-white" />}
        value="CBC"
        label="Curriculum aligned"
        iconBg="bg-purple-600"
      />
    </div>
  );
}
