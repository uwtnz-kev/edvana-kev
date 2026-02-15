import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

interface StatCardProps {
  title: string;
  value: string | number;
  accent: "accent" | "teal" | "primary";
  icon: LucideIcon;
}

const accentStyles = {
  accent: "bg-brand-accent/10 border-brand-accent/20 text-brand-accent",
  teal: "bg-brand-teal/10 border-brand-teal/20 text-brand-teal", 
  primary: "bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
};

export default function StatCard({ title, value, accent, icon: Icon }: StatCardProps) {
  return (
    <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-blue-900 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-black">{value}</p>
        </div>
        
        <div className={cn(
          "p-3 rounded-full border",
          accentStyles[accent]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}