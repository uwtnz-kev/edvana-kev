import { useState } from "react";
import { ChevronDown, HelpCircle, BookOpen, User, Settings, Shield, Smartphone } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "account" | "courses" | "technical" | "payments" | "general";
}

const faqData: FAQItem[] = [
  {
    id: "reset-password",
    question: "How do I reset my password?",
    answer: "To reset your password, click on 'Forgot Password' on the login page. Enter your registered email address and follow the instructions sent to your email. If you don't receive the email within 5 minutes, check your spam folder or contact support.",
    category: "account"
  },
  {
    id: "contact-teacher",
    question: "How can I contact my teacher?",
    answer: "You can contact your teachers through the Messages section in your dashboard, or by clicking the 'Contact Teacher' button on any course page. Teachers typically respond within 24 hours during school days.",
    category: "courses"
  },
  {
    id: "submit-assignment",
    question: "How do I submit an assignment?",
    answer: "Go to the Assignments section, find your assignment, and click 'Submit'. You can upload files, type your response directly, or both depending on the assignment type. Make sure to submit before the due date to avoid late penalties.",
    category: "courses"
  },
  {
    id: "view-grades",
    question: "Where can I see my grades?",
    answer: "Your grades are available in the Grades section of your dashboard. You can view individual assignment grades, course progress, and overall performance. Grades are updated by teachers within 7 days of assignment submission.",
    category: "courses"
  },
  {
    id: "mobile-app",
    question: "Is there a mobile app available?",
    answer: "Yes! Download the Edvana mobile app from the App Store or Google Play Store. Use the same login credentials as your web account. The mobile app includes all major features except for certain advanced tools that work best on desktop.",
    category: "technical"
  },
  {
    id: "browser-support",
    question: "Which browsers are supported?",
    answer: "Edvana works best on Chrome, Firefox, Safari, and Edge (latest versions). For the best experience, we recommend Chrome or Firefox. Clear your browser cache if you experience any issues.",
    category: "technical"
  },
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer: "We accept Mobile Money (MTN MoMo, Airtel Money), Visa/Mastercard, and bank transfers. Payments are processed securely through our certified payment partners. Contact finance for payment plan options.",
    category: "payments"
  },
  {
    id: "refund-policy",
    question: "What is your refund policy?",
    answer: "Course fees can be refunded within 7 days of enrollment if less than 10% of the course content has been accessed. Refunds are processed within 5-10 business days. Contact support for special circumstances.",
    category: "payments"
  },
  {
    id: "account-security",
    question: "How do I keep my account secure?",
    answer: "Use a strong, unique password and don't share your login credentials. Log out when using public computers. Enable two-factor authentication in your account settings for extra security. Report any suspicious activity immediately.",
    category: "account"
  },
  {
    id: "system-requirements",
    question: "What are the system requirements?",
    answer: "Minimum: 2GB RAM, stable internet connection (1 Mbps), updated browser. Recommended: 4GB RAM, 5 Mbps internet for video content. Some advanced features may require additional software which will be specified in course materials.",
    category: "technical"
  }
];

const categoryInfo = {
  account: { icon: User, label: "Account & Profile", color: "from-[#FF715B] to-[#FF715B]/80" },
  courses: { icon: BookOpen, label: "Courses & Learning", color: "from-[#1EA896] to-[#1EA896]/80" },
  technical: { icon: Settings, label: "Technical Support", color: "from-[#4C5454] to-[#523F38]" },
  payments: { icon: Shield, label: "Payments & Billing", color: "from-purple-500 to-purple-600" },
  general: { icon: HelpCircle, label: "General Questions", color: "from-blue-500 to-blue-600" }
};

export function FAQAccordion() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = selectedCategory === "all" 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const categories = Object.keys(categoryInfo) as Array<keyof typeof categoryInfo>;

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
          <HelpCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-white/60 text-sm">Find quick answers to common questions</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === "all"
                ? "bg-[#1EA896] text-white shadow-lg"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            All Topics
          </button>
          {categories.map((category) => {
            const { icon: Icon, label } = categoryInfo[category];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[#1EA896] text-white shadow-lg"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredFAQs.map((faq) => {
          const isOpen = openItems.has(faq.id);
          const { icon: CategoryIcon, color } = categoryInfo[faq.category];

          return (
            <div key={faq.id} className="border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-5 py-4 text-left bg-white/5 hover:bg-white/10 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <CategoryIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-white/60 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              {isOpen && (
                <div className="px-5 py-4 bg-white/5 border-t border-white/10">
                  <div className="pl-11">
                    <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-8">
          <HelpCircle className="h-12 w-12 text-white/40 mx-auto mb-3" />
          <p className="text-white/60">No FAQs found for this category.</p>
        </div>
      )}

      {/* Contact Support CTA */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#FF715B]/10 to-[#1EA896]/10 border border-white/10 rounded-xl">
        <div className="flex items-center space-x-3">
          <Smartphone className="h-5 w-5 text-[#FF715B]" />
          <div>
            <p className="text-white font-medium text-sm">Still need help?</p>
            <p className="text-white/70 text-xs">
              Can't find what you're looking for? Contact our support team using the form above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}