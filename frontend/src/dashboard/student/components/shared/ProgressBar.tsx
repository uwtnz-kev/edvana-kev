interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "teal" | "brown";
  className?: string;
}

const colorClasses = {
  primary: "from-[#4C5454] to-[#523F38]",
  accent: "from-[#FF715B] to-[#FF715B]/80",
  teal: "from-[#1EA896] to-[#1EA896]/80",
  brown: "from-[#523F38] to-[#4C5454]"
};

const sizeClasses = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4"
};

export function ProgressBar({ 
  progress, 
  label, 
  showPercentage = true, 
  size = "md", 
  color = "teal",
  className = ""
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-white/80 text-sm font-medium">{label}</span>}
          {showPercentage && <span className="text-white/60 text-sm">{clampedProgress}%</span>}
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div 
          className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}