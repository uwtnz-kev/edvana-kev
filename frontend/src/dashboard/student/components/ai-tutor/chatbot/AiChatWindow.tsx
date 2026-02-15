import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { Send, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI tutor. I can help you with any subject from the CBC curriculum. What would you like to learn about today?",
    isAI: true,
    timestamp: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: "2", 
    content: "Can you help me understand photosynthesis?",
    isAI: false,
    timestamp: new Date(Date.now() - 240000).toISOString()
  },
  {
    id: "3",
    content: "Absolutely! Photosynthesis is the process by which plants make their own food using sunlight. It happens in the chloroplasts of plant cells and involves:\n\n1. **Light Reaction**: Chlorophyll captures sunlight energy\n2. **Dark Reaction**: CO₂ and water combine to form glucose\n\nThe equation is: 6CO₂ + 6H₂O + sunlight = C₆H₁₂O₆ + 6O₂\n\nWould you like me to explain any specific part in more detail?",
    isAI: true,
    timestamp: new Date(Date.now() - 180000).toISOString()
  },
  {
    id: "4",
    content: "That's very helpful! Can you explain the light reaction in more detail?",
    isAI: false,
    timestamp: new Date(Date.now() - 120000).toISOString()
  },
  {
    id: "5",
    content: "Great question! The light reaction occurs in the thylakoids and involves:\n\n**Key Steps:**\n- Chlorophyll absorbs light energy\n- Water molecules split (H₂O + 2H⁺ + ½O₂ + 2e⁻)\n- Energy converts ADP to ATP and NADP⁺ to NADPH\n- Oxygen is released as a byproduct\n\n**Important**: This provides the energy (ATP) and reducing power (NADPH) needed for the Calvin cycle. Think of it as the 'energy charging' phase!",
    isAI: true,
    timestamp: new Date(Date.now() - 60000).toISOString()
  }
];

export function AiChatWindow() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("math") || input.includes("algebra") || input.includes("equation")) {
      return "I'd be happy to help with mathematics! Whether it's algebra, geometry, or any other math topic, I can provide step-by-step explanations. What specific math problem are you working on?";
    }
    
    if (input.includes("history") || input.includes("rwanda")) {
      return "Rwanda has a rich history! I can help you understand various periods including pre-colonial times, the colonial period, independence in 1962, and modern Rwanda. What specific aspect of Rwandan history interests you?";
    }
    
    if (input.includes("science") || input.includes("chemistry") || input.includes("physics")) {
      return "Science is fascinating! I can help explain concepts in chemistry, physics, biology, and earth science. Feel free to ask about specific topics, experiments, or formulas you're studying.";
    }
    
    if (input.includes("english") || input.includes("literature") || input.includes("writing")) {
      return "I can assist with English language skills including grammar, vocabulary, essay writing, and literature analysis. What specific area would you like help with?";
    }
    
    if (input.includes("french") || input.includes("language")) {
      return "Bonjour! I can help with French grammar, vocabulary, pronunciation tips, and conversation practice. What aspect of French would you like to work on today?";
    }
    
    // Default response
    return `That's an interesting question about "${userInput}". I can help explain this concept step by step. Let me break it down for you with examples and clear explanations. Would you like me to start with the basics or focus on a specific aspect?`;
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isAI: false,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(currentInput),
        isAI: true,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center space-x-3 p-4 border-b border-white/10">
        <div className="w-8 h-8 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-white font-medium">AI Tutor Assistant</h3>
          <p className="text-white/60 text-xs">Ask me anything about your studies</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 min-h-[400px] max-h-[500px]">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isAI={message.isAI}
            timestamp={message.timestamp}
            userName="John Mugisha"
          />
        ))}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="max-w-xs lg:max-w-md mr-auto">
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-white/60 text-sm">AI is typing</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask something..."
            className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-[#1EA896]/50 focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-[#1EA896]/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-white/40 text-xs mt-2 px-1">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}