/**
 * TeacherSupportFAQ
 * -----------------
 * Implements the T ea ch er Su pp or tF AQ module for the teacher dashboard s up po rt feature.
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "./supportData";

export default function TeacherSupportFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl shadow-sm">
      <h2 className="text-xl font-semibold text-[#3B240F]">Quick help</h2>
      <p className="text-[#3B240F]/70 text-sm mt-1">Common teacher questions and fixes</p>

      <div className="mt-4 space-y-3">
        {faqs.map((f, idx) => {
          const isOpen = open === idx;
          return (
            <div key={f.q} className="overflow-hidden rounded-xl border border-white/15 bg-white/10">
              <button
                onClick={() => setOpen((p) => (p === idx ? null : idx))}
                className="w-full flex items-center justify-between p-4 text-left transition-colors duration-200 hover:bg-white/15"
              >
                <span className="text-[#3B240F] font-medium">{f.q}</span>
                <ChevronDown className={`h-4 w-4 text-[#3B240F]/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div className="px-4 pb-4 text-[#3B240F]/70 text-sm">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

