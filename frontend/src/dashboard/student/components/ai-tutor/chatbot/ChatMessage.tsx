import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isAI: boolean;
  timestamp: string;
  userName?: string;
}

export function ChatMessage({ message, isAI, timestamp, userName = "Student" }: ChatMessageProps) {
  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={`flex items-start space-x-3 ${isAI ? '' : 'flex-row-reverse space-x-reverse'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isAI 
          ? 'bg-gradient-to-br from-[#4C5454] to-[#523F38]' 
          : 'bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80'
      }`}>
        {isAI ? (
          <Bot className="h-4 w-4 text-white" />
        ) : (
          <span className="text-white text-xs font-medium">
            {getUserInitials(userName)}
          </span>
        )}
      </div>

      {/* Message Content */}
      <div className={`max-w-xs lg:max-w-md ${isAI ? 'mr-auto' : 'ml-auto'}`}>
        <div className={`p-3 rounded-2xl ${
          isAI 
            ? 'bg-white/10 backdrop-blur-lg border border-white/10' 
            : 'bg-gradient-to-br from-[#FF715B]/20 to-[#FF715B]/10 border border-[#FF715B]/20'
        }`}>
          <p className="text-white text-sm leading-relaxed">{message}</p>
        </div>
        <p className="text-white/40 text-xs mt-1 px-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}