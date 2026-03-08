// Stores the stat-card configuration for the grades stats summary.
import { ArrowDownRight, ArrowUpRight, CheckCircle2, TrendingUp } from "lucide-react";
import { formatAverageValue, formatWholePercent } from "./gradesStatsHelpers";

type GradesStatsProps = {
  average: number;
  completionRate: number;
  highest: number;
  lowest: number;
};

export function getGradesStatsConfig({ average, completionRate, highest, lowest }: GradesStatsProps) {
  return [
    { key: "average", label: "Class average", value: formatAverageValue(average), icon: TrendingUp, tone: "blue" as const },
    { key: "completion", label: "Completion", value: formatWholePercent(completionRate), icon: CheckCircle2, tone: "green" as const },
    { key: "highest", label: "Highest", value: formatWholePercent(highest), icon: ArrowUpRight, tone: "brown" as const },
    { key: "lowest", label: "Lowest", value: formatWholePercent(lowest), icon: ArrowDownRight, tone: "red" as const },
  ];
}
