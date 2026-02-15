import { SupportForm, FAQAccordion } from "../components/support";
import { HelpCircle, MessageSquareText, Phone, Mail, Globe } from "lucide-react";

export default function SupportView() {
  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
            <p className="text-white/70">Get help and find answers to your questions</p>
          </div>
        </div>

        {/* Quick Help Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
                <MessageSquareText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24h</p>
                <p className="text-white/60 text-sm">Response Time</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-white/60 text-sm">Issue Resolution</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C5454] to-[#523F38] rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-white/60 text-sm">Chat Support</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-white/60 text-sm">Languages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div>
            <SupportForm />
          </div>

          {/* FAQ Section */}
          <div>
            <FAQAccordion />
          </div>
        </div>

        {/* Additional Contact Methods */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Other Ways to Reach Us</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phone Support */}
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Phone Support</h4>
                <p className="text-white/70 text-xs mb-2">
                  Call us for urgent technical issues
                </p>
                <p className="text-[#1EA896] text-sm font-mono">+250 788 123 456</p>
                <p className="text-white/50 text-xs">Mon-Fri: 8AM-6PM</p>
              </div>
            </div>

            {/* Email Support */}
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Email Support</h4>
                <p className="text-white/70 text-xs mb-2">
                  Send detailed inquiries via email
                </p>
                <p className="text-[#1EA896] text-sm">support@edvana.rw</p>
                <p className="text-white/50 text-xs">Response within 24h</p>
              </div>
            </div>

            {/* Live Chat */}
            <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageSquareText className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Live Chat</h4>
                <p className="text-white/70 text-xs mb-2">
                  Instant help from our support team
                </p>
                <button className="text-[#1EA896] text-sm hover:text-[#1EA896]/80 transition-colors">
                  Start Chat
                </button>
                <p className="text-white/50 text-xs">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Hours Notice */}
        <div className="bg-gradient-to-r from-[#1EA896]/10 to-[#FF715B]/10 border border-white/10 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <HelpCircle className="h-5 w-5 text-[#1EA896]" />
            <div>
              <p className="text-white font-medium text-sm">Support Hours</p>
              <p className="text-white/70 text-xs">
                Our support team is available Monday to Friday, 8:00 AM to 6:00 PM (Rwanda Time). 
                For urgent technical issues outside these hours, please call our emergency line or use live chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}