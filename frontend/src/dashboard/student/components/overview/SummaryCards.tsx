import { BookOpen, TrendingUp, Flame, Clock } from "lucide-react";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
  bgColor: string;
}

function SummaryCard({ icon, title, value, subtitle, color, bgColor }: SummaryCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6 hover:bg-white/10 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <span className={`text-3xl font-bold ${color}`}>{value}</span>
      </div>
      <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
      <p className="text-white/60 text-sm">{subtitle}</p>
    </div>
  );
}

interface SummaryCardsProps {
  totalCourses?: number;
  overallProgress?: number;
  studyStreak?: number;
  weeklyHours?: number;
}

export function SummaryCards({ 
  totalCourses = 6,
  overallProgress = 78,
  studyStreak = 12,
  weeklyHours = 24
}: SummaryCardsProps) {
  const cards = [
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Total Courses",
      value: totalCourses,
      subtitle: "Active this semester",
      color: "text-[#1EA896]",
      bgColor: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      title: "Overall Progress",
      value: `${overallProgress}%`,
      subtitle: "Course completion",
      color: "text-[#FF715B]",
      bgColor: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80"
    },
    {
      icon: <Flame className="h-6 w-6 text-white" />,
      title: "Study Streak",
      value: `${studyStreak} days`,
      subtitle: "Keep it going!",
      color: "text-[#4C5454]",
      bgColor: "bg-gradient-to-br from-[#4C5454] to-[#523F38]"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Weekly Hours",
      value: `${weeklyHours}h`,
      subtitle: "This week",
      color: "text-[#523F38]",
      bgColor: "bg-gradient-to-br from-[#523F38] to-[#4C5454]"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
}