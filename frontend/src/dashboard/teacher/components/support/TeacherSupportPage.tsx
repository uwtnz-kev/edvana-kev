import { useState } from "react";
import { HelpCircle } from "lucide-react";
import TeacherSupportCards from "./TeacherSupportCards";
import TeacherSupportForm from "./TeacherSupportForm";
import TeacherSupportFAQ from "./TeacherSupportFAQ";
import { TicketType } from "./supportData";

export default function TeacherSupportPage() {
  const [type, setType] = useState<TicketType>("technical");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 rounded-lg flex items-center justify-center">
          <HelpCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Support</h1>
          <p className="text-white/70">Get help, request content, or report issues</p>
        </div>
      </div>

      <TeacherSupportCards type={type} setType={setType} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeacherSupportForm type={type} />
        <TeacherSupportFAQ />
      </div>
    </div>
  );
}
