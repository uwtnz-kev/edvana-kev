// Renders a reusable stat card for the grades stats summary.
import type { ElementType } from "react";

type Props = {
  Icon: ElementType;
  iconClass: string;
  label: string;
  tileClass: string;
  value: string;
};

export function GradeStatCard({ Icon, iconClass, label, tileClass, value }: Props) {
  return (
    <div className="group rounded-2xl teacher-panel-surface p-4 hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B6F52]/25">
      <div className="flex items-center gap-3">
        <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shadow-[0_14px_30px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300 ${tileClass}`}>
          <Icon className={`h-5 w-5 group-hover:scale-110 transition-transform duration-300 ${iconClass}`} />
        </div>
        <div>
          <p className="text-xs text-[#6B4F3A]">{label}</p>
          <p className="mt-1 text-lg font-semibold text-[#3B240F]">{value}</p>
        </div>
      </div>
    </div>
  );
}

