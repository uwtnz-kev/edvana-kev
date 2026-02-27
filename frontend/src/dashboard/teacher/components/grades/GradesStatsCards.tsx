import { TrendingUp, CheckCircle2, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Props {
  average: number;
  completionRate: number;
  highest: number;
  lowest: number;
}

function StatCard({
  label,
  value,
  Icon,
  tileClass,
  iconClass,
}: {
  label: string;
  value: string;
  Icon: React.ElementType;
  tileClass: string;
  iconClass: string;
}) {
  return (
    <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B6F52]/25">
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

function intensity(value: number, good: number, warn: number) {
  if (value >= good) return "strong";
  if (value >= warn) return "mid";
  return "low";
}

function tileFor(base: "blue" | "green" | "brown" | "red") {
  if (base === "blue")
    return "bg-gradient-to-br from-[#3B82F6]/85 to-[#2563EB]/85";

  if (base === "green")
    return "bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85";

  if (base === "brown")
    return "bg-gradient-to-br from-[#7A5A3A]/85 to-[#5E4329]/85";

  return "bg-gradient-to-br from-[#EF4444]/85 to-[#DC2626]/85";
}

function iconFor(base: "blue" | "green" | "brown" | "red") {
  if (base === "blue") return "text-white";
  if (base === "green") return "text-[#0F2F2B]";
  if (base === "brown") return "text-[#F8F4E1]";
  return "text-white";
}

export default function GradesStatsCards({ average, completionRate, highest, lowest }: Props) {
  const avgLevel = intensity(average, 70, 50);
  const completionLevel = intensity(completionRate, 85, 60);
  const highestLevel = intensity(highest, 70, 50);
  const lowestLevel = intensity(lowest, 60, 40);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Class average"
        value={`${average.toFixed(1)}%`}
        Icon={TrendingUp}
        tileClass={tileFor("blue")}
        iconClass={iconFor("blue")}
      />

      <StatCard
        label="Completion"
        value={`${completionRate.toFixed(0)}%`}
        Icon={CheckCircle2}
        tileClass={tileFor("green")}
        iconClass={iconFor("green")}
      />

      <StatCard
        label="Highest"
        value={`${highest.toFixed(0)}%`}
        Icon={ArrowUpRight}
        tileClass={tileFor("brown")}
        iconClass={iconFor("brown")}
      />

      <StatCard
        label="Lowest"
        value={`${lowest.toFixed(0)}%`}
        Icon={ArrowDownRight}
        tileClass={tileFor("red")}
        iconClass={iconFor("red")}
      />
    </div>
  );
}
