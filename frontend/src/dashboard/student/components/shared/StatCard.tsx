import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color: string;
  className?: string;
}

export function StatCard({ icon, title, value, subtitle, color, className = "" }: StatCardProps) {
  return (
    <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-white/60 text-sm">{title}</p>
          {subtitle && <p className="text-white/40 text-xs">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}