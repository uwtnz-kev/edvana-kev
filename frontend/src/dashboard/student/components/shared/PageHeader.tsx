import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, icon, children, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center space-x-3">
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-xl flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-white/70">{subtitle}</p>}
        </div>
      </div>
      
      {actions && (
        <div className="flex items-center space-x-3">
          {actions}
        </div>
      )}
      
      {children}
    </div>
  );
}