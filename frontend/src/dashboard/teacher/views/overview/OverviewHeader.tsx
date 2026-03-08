// Renders the greeting hero section for the teacher overview page.
import { Star, User } from "lucide-react";
import type { useOverviewState } from "./useOverviewState";

type Props = { state: ReturnType<typeof useOverviewState> };

export function OverviewHeader({ state }: Props) {
  return (
    <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex items-center space-x-4">
        <div className={`w-16 h-16 ${state.greetingTheme.bgClass} rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105`}>
          <User className={`h-8 w-8 ${state.greetingTheme.iconClass}`} />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white transition-colors duration-300">{state.greeting}</h1>
          <p className="text-white/70 text-lg">Ready to teach today?</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-[#1EA896]/20 to-[#1EA896]/10 px-4 py-2 rounded-xl border border-[#1EA896]/30 transition-transform duration-300 group-hover:scale-105">
          <Star className="h-5 w-5 text-[#1EA896]" />
          <span className="text-white font-medium">{state.userLevelLabel}</span>
        </div>
      </div>
    </div>
  );
}
