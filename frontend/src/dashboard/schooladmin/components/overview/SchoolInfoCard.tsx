import { Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SchoolInfoCardProps {
  schoolName: string;
  schoolCode: string;
  plan: string;
}

export default function SchoolInfoCard({ schoolName, schoolCode, plan }: SchoolInfoCardProps) {
  return (
    <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-brand-primary/10 border border-brand-primary/20">
          <Building2 className="h-6 w-6 text-brand-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-blue-900">{schoolName}</h2>
          <p className="text-sm text-black/60">School Management Portal</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
        <div className="space-y-1">
          <p className="text-xs font-medium text-blue-900 uppercase tracking-wide">School Code</p>
          <p className="text-base font-semibold text-black">{schoolCode}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-blue-900 uppercase tracking-wide">Current Plan</p>
          <p className="text-base font-semibold text-black">{plan}</p>
        </div>
      </div>
    </Card>
  );
}