import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "./supportData";

export default function TeacherSupportFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold text-white">Quick help</h2>
      <p className="text-white/70 text-sm mt-1">Common teacher questions and fixes</p>

      <div className="mt-4 space-y-3">
        {faqs.map((f, idx) => {
          const isOpen = open === idx;
          return (
            <div key={f.q} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen((p) => (p === idx ? null : idx))}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5"
              >
                <span className="text-white font-medium">{f.q}</span>
                <ChevronDown className={`h-4 w-4 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div className="px-4 pb-4 text-white/70 text-sm">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
