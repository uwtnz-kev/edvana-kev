import React from "react";
import { ChatbotPanel } from "../../components/ai-tutor";
import { Bot, MessageSquare, Brain, FileQuestion } from "lucide-react";

export default function ChatbotView() {
  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AI Chatbot</h1>
            <p className="text-white/70">Get instant help and explanations on any topic from the CBC curriculum</p>
          </div>
        </div>

        {/* AI Features Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-white/60 text-sm">AI Available</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">15</p>
                <p className="text-white/60 text-sm">Subjects Covered</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
                <FileQuestion className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-white/60 text-sm">Practice Questions</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-white/60 text-sm">Accuracy Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chatbot Interface */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <ChatbotPanel />
        </div>

        {/* Chatbot Features */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Chatbot Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Instant Help */}
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Instant Help</h4>
                <p className="text-white/70 text-xs mb-2">
                  Ask questions and get explanations on any topic instantly
                </p>
                <ul className="text-white/50 text-xs space-y-1">
                  <li>• Step-by-step explanations</li>
                  <li>• Multiple subject coverage</li>
                  <li>• 24/7 availability</li>
                </ul>
              </div>
            </div>

            {/* Smart Responses */}
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Smart Responses</h4>
                <p className="text-white/70 text-xs mb-2">
                  AI understands context and provides relevant answers
                </p>
                <ul className="text-white/50 text-xs space-y-1">
                  <li>• Context-aware responses</li>
                  <li>• Subject-specific knowledge</li>
                  <li>• Interactive conversations</li>
                </ul>
              </div>
            </div>

            {/* Learning Support */}
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Learning Support</h4>
                <p className="text-white/70 text-xs mb-2">
                  Get personalized study guidance and recommendations
                </p>
                <ul className="text-white/50 text-xs space-y-1">
                  <li>• Personalized learning paths</li>
                  <li>• Study tips and strategies</li>
                  <li>• Performance insights</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="bg-gradient-to-r from-[#1EA896]/10 to-[#FF715B]/10 border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Bot className="h-5 w-5 text-[#1EA896]" />
            <div>
              <p className="text-white font-medium text-sm">Pro Tips for AI Chat</p>
              <p className="text-white/70 text-xs">
                Be specific in your questions, ask for examples, and don't hesitate to ask follow-up questions. 
                The AI chatbot can help with homework, explain concepts, and provide study guidance tailored to your learning style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}