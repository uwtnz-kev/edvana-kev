import { BookOpen, Users, ClipboardList, Clock } from "lucide-react";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
  bgColor: string;
}

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  color,
  bgColor,
}: SummaryCardProps) {
  return (
    <div
      className="
        group
        bg-white/5
        backdrop-blur-lg
        border border-white/10
        rounded-xl
        shadow-lg
        p-6
        transition-all duration-300
        hover:bg-white/10
        hover:border-white/20
        hover:shadow-2xl
        hover:-translate-y-1
      "
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`
            w-12 h-12
            ${bgColor}
            rounded-lg
            flex items-center justify-center
            shadow-lg
            transition-transform duration-300
            group-hover:scale-105
          `}
        >
          {icon}
        </div>

        <span
          className={`
            text-3xl font-bold
            ${color}
            transition-transform duration-300
            group-hover:scale-105
          `}
        >
          {value}
        </span>
      </div>

      <h3 className="text-white font-semibold text-lg mb-1 transition-colors duration-300">
        {title}
      </h3>

      <p className="text-white/60 text-sm">{subtitle}</p>
    </div>
  );
}

interface SummaryCardsProps {
  totalSubjects?: number;
  totalStudents?: number;
  pendingSubmissions?: number;
  weeklyHours?: number;
}

export function SummaryCards({
  totalSubjects = 5,
  totalStudents = 148,
  pendingSubmissions = 23,
  weeklyHours = 18,
}: SummaryCardsProps) {
  const cards = [
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Subjects",
      value: totalSubjects,
      subtitle: "Assigned this term",
      color: "text-[#1EA896]",
      bgColor: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Students",
      value: totalStudents,
      subtitle: "Across all classes",
      color: "text-[#FF715B]",
      bgColor: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80",
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-white" />,
      title: "Pending",
      value: pendingSubmissions,
      subtitle: "To review or grade",
      color: "text-[#4C5454]",
      bgColor: "bg-gradient-to-br from-[#4C5454] to-[#523F38]",
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Weekly Hours",
      value: `${weeklyHours}h`,
      subtitle: "Teaching time",
      color: "text-[#523F38]",
      bgColor: "bg-gradient-to-br from-[#523F38] to-[#4C5454]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
}