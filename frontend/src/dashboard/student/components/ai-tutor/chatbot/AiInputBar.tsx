import { Send, Paperclip, Mic } from "lucide-react";
import { useState } from "react";

interface AiInputBarProps {
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
}

export function AiInputBar({ onSendMessage, disabled = false }: AiInputBarProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage?.(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4">
      <div className="flex items-end space-x-3">
        {/* Attachment Button */}
        <button 
          className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center transition-all duration-200 group"
          title="Attach file"
        >
          <Paperclip className="h-5 w-5 text-white/70 group-hover:text-white" />
        </button>

        {/* Message Input */}
        <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your studies..."
            disabled={disabled}
            className="w-full bg-transparent text-white placeholder-white/50 px-4 py-3 resize-none outline-none min-h-[44px] max-h-32 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            rows={1}
            style={{
              height: "auto",
              minHeight: "44px",
              maxHeight: "128px",
              overflowY: message.length > 100 ? "scroll" : "hidden"
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = Math.min(target.scrollHeight, 128) + "px";
            }}
          />
        </div>

        {/* Voice Input Button */}
        <button 
          className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center transition-all duration-200 group"
          title="Voice input"
        >
          <Mic className="h-5 w-5 text-white/70 group-hover:text-white" />
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
            message.trim() && !disabled
              ? "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 hover:from-[#1EA896]/90 hover:to-[#1EA896]/70 shadow-lg transform hover:scale-105"
              : "bg-white/10 cursor-not-allowed"
          }`}
          title="Send message"
        >
          <Send className={`h-5 w-5 ${
            message.trim() && !disabled ? "text-white" : "text-white/40"
          }`} />
        </button>
      </div>

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2 mt-3">
        {[
          "Explain this concept",
          "Help with homework",
          "Practice problems",
          "Study tips"
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setMessage(suggestion)}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white text-xs transition-all duration-200"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}