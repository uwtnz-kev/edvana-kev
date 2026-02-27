import { Users, MapPin } from "lucide-react";

interface TeacherScheduleCardProps {
  subject: string;
  classNameLabel: string;
  room: string;
  variant?: "desktop" | "mobile";
}

export function TeacherScheduleCard({
  subject,
  classNameLabel,
  room,
  variant = "desktop",
}: TeacherScheduleCardProps) {
  const colors: Record<string, string> = {
    Mathematics: "from-blue-500 to-blue-600",
    Physics: "from-purple-500 to-purple-600",
    Chemistry: "from-green-500 to-green-600",
    Biology: "from-emerald-500 to-emerald-600",
    English: "from-orange-500 to-orange-600",
    French: "from-pink-500 to-pink-600",
    History: "from-amber-500 to-amber-600",
    Geography: "from-teal-500 to-teal-600",
    Kinyarwanda: "from-red-500 to-red-600",
    "Office Hours": "from-[#1EA896] to-[#1EA896]/80",
    Planning: "from-[#4C5454] to-[#523F38]",
    "Free Period": "from-slate-500 to-slate-600",
    Break: "from-gray-400 to-gray-500",
    "Lunch Break": "from-yellow-500 to-yellow-600",
  };

   const baseClasses = `rounded-lg p-3 bg-gradient-to-r ${
  colors[subject] || "from-gray-500 to-gray-600"
} shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl cursor-pointer`;

  const textSize = variant === "mobile" ? "text-sm" : "text-xs";
  const titleSize =
    variant === "mobile"
      ? "font-medium mb-1"
      : "font-medium text-sm mb-1";

  return (
    <div className={baseClasses}>
      <div className={`text-white ${titleSize}`}>{subject}</div>

      {classNameLabel && (
        <div className={`text-white/80 ${textSize} flex items-center space-x-1 mb-1`}>
          <Users className="h-3 w-3" />
          <span>{classNameLabel}</span>
        </div>
      )}

      {room && (
        <div className={`text-white/80 ${textSize} flex items-center space-x-1`}>
          <MapPin className="h-3 w-3" />
          <span>{room}</span>
        </div>
      )}
    </div>
  );
}