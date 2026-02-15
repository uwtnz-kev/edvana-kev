import { User, MapPin } from "lucide-react";

interface ScheduleCardProps {
  subject: string;
  teacher: string;
  room: string;
  variant?: 'desktop' | 'mobile';
}

export function ScheduleCard({ subject, teacher, room, variant = 'desktop' }: ScheduleCardProps) {
  const getSubjectColor = (subject: string) => {
    const colors = {
      "Mathematics": "from-blue-500 to-blue-600",
      "Physics": "from-purple-500 to-purple-600", 
      "Chemistry": "from-green-500 to-green-600",
      "Biology": "from-emerald-500 to-emerald-600",
      "English": "from-orange-500 to-orange-600",
      "French": "from-pink-500 to-pink-600",
      "History": "from-amber-500 to-amber-600",
      "Geography": "from-teal-500 to-teal-600",
      "Kinyarwanda": "from-red-500 to-red-600",
      "Physical Education": "from-indigo-500 to-indigo-600",
      "Computer Science": "from-cyan-500 to-cyan-600",
      "Art": "from-rose-500 to-rose-600",
      "Music": "from-violet-500 to-violet-600",
      "Study Hall": "from-slate-500 to-slate-600",
      "Break": "from-gray-400 to-gray-500",
      "Lunch Break": "from-yellow-500 to-yellow-600",
      "Assembly": "from-[#FF715B] to-[#FF715B]/80"
    };
    return colors[subject as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  const isBreakTime = (subject: string) => {
    return subject === "Break" || subject === "Lunch Break";
  };

  const baseClasses = `rounded-lg p-3 bg-gradient-to-r ${getSubjectColor(subject)} ${
    isBreakTime(subject) ? 'border-2 border-dashed border-white/30' : 'shadow-lg'
  }`;

  const textSizeClasses = variant === 'mobile' ? 'text-sm' : 'text-xs';
  const titleSizeClasses = variant === 'mobile' ? 'font-medium mb-1' : 'font-medium text-sm mb-1';

  return (
    <div className={`${baseClasses} ${variant === 'mobile' ? 'flex-1' : ''}`}>
      <div className={`text-white ${titleSizeClasses}`}>
        {subject}
      </div>
      {teacher && (
        <div className={`text-white/80 ${textSizeClasses} flex items-center space-x-1 mb-1`}>
          <User className="h-3 w-3" />
          <span>{teacher}</span>
        </div>
      )}
      {room && (
        <div className={`text-white/80 ${textSizeClasses} flex items-center space-x-1`}>
          <MapPin className="h-3 w-3" />
          <span>{room}</span>
        </div>
      )}
    </div>
  );
}