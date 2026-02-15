import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

interface SupportFormProps {
  studentName?: string;
  studentEmail?: string;
}

export function SupportForm({ 
  studentName = "John Mugisha", 
  studentEmail = "john.mugisha@student.edvana.rw" 
}: SupportFormProps) {
  const [formData, setFormData] = useState({
    name: studentName,
    email: studentEmail,
    subject: "",
    message: "",
    priority: "normal" as "low" | "normal" | "high"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        ...formData,
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
        <p className="text-white/70 mb-4">
          Our support team will get back to you within 24 hours.
        </p>
        <p className="text-sm text-white/60">
          Reference ID: #EDV-{Date.now().toString().slice(-6)}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
          <Mail className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Contact Support</h2>
          <p className="text-white/60 text-sm">Get help from our support team</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-[#1EA896]/50 focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200 outline-none"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white/60 cursor-not-allowed"
          />
          <p className="text-xs text-white/50 mt-1">
            This is your registered student email address
          </p>
        </div>

        {/* Priority Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Priority Level
          </label>
          <select
            value={formData.priority}
            onChange={(e) => handleInputChange("priority", e.target.value)}
            className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#1EA896]/50 focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200 outline-none"
          >
            <option value="low" className="bg-black text-white">Low - General inquiry</option>
            <option value="normal" className="bg-black text-white">Normal - Standard support</option>
            <option value="high" className="bg-black text-white">High - Urgent issue</option>
          </select>
        </div>

        {/* Subject Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
            placeholder="Brief description of your issue"
            className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-[#1EA896]/50 focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200 outline-none"
            required
          />
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Please describe your issue in detail..."
            rows={5}
            className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-[#1EA896]/50 focus:ring-2 focus:ring-[#1EA896]/20 transition-all duration-200 outline-none resize-vertical"
            required
          />
          <p className="text-xs text-white/50 mt-1">
            Minimum 10 characters ({formData.message.length}/10)
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || formData.message.length < 10}
          className="w-full bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#FF715B]/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>

      {/* Help Notice */}
      <div className="mt-6 p-4 bg-[#1EA896]/10 border border-[#1EA896]/20 rounded-xl">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-[#1EA896] mt-0.5" />
          <div>
            <p className="text-[#1EA896] text-sm font-medium">Response Time</p>
            <p className="text-white/70 text-xs mt-1">
              General inquiries: 24-48 hours • Urgent issues: Within 4 hours • Technical problems: 12-24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}