import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function DashboardCard({ 
  title, 
  subtitle, 
  icon, 
  children, 
  className = "",
  headerClassName = "",
  contentClassName = ""
}: DashboardCardProps) {
  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl",
      className
    )}>
      {(title || subtitle || icon) && (
        <div className={cn("p-6 border-b border-white/10", headerClassName)}>
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
                {icon}
              </div>
            )}
            <div>
              {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
              {subtitle && <p className="text-white/70">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      <div className={cn("p-6", contentClassName)}>
        {children}
      </div>
    </div>
  );
}