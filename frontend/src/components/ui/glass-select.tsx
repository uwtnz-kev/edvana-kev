import React from 'react';
import { ChevronDown } from 'lucide-react';

interface GlassSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}

export function GlassSelect({ 
  value, 
  onValueChange, 
  placeholder = "Select...", 
  children,
  className = ""
}: GlassSelectProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="appearance-none bg-white/10 backdrop-blur-xl border border-white/30 text-blue-900 rounded-xl px-4 py-2 pr-10 min-w-[120px] focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-900/60 pointer-events-none" />
    </div>
  );
}