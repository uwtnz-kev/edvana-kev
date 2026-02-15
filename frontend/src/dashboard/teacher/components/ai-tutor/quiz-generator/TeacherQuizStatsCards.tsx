import { Brain, UploadCloud, Pencil, FileQuestion } from "lucide-react";

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
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-white/60 text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function TeacherQuizStatsCards({
  stats,
}: {
  stats: { total: number; published: number; drafts: number; totalQuestions: number };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Brain className="h-5 w-5 text-white" />}
        value={`${stats.total}`}
        label="Total quizzes"
        iconBg="bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80"
      />
      <StatCard
        icon={<UploadCloud className="h-5 w-5 text-white" />}
        value={`${stats.published}`}
        label="Published"
        iconBg="bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80"
      />
      <StatCard
        icon={<Pencil className="h-5 w-5 text-white" />}
        value={`${stats.drafts}`}
        label="Drafts"
        iconBg="bg-gradient-to-br from-[#4C5454] to-[#523F38]"
      />
      <StatCard
        icon={<FileQuestion className="h-5 w-5 text-white" />}
        value={`${stats.totalQuestions}`}
        label="Questions created"
        iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
      />
    </div>
  );
}
