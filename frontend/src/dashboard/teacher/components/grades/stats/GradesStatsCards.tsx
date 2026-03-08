// Orchestrates the grades stats cards using extracted config and card components.
import { GradeStatCard } from "./GradeStatCard";
import { getGradesStatsConfig } from "./gradesStatsConfig";
import { getIconClass, getTileClass } from "./gradesStatsHelpers";

type Props = {
  average: number;
  completionRate: number;
  highest: number;
  lowest: number;
};

export default function GradesStatsCards(props: Props) {
  const stats = getGradesStatsConfig(props);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <GradeStatCard
          key={stat.key}
          label={stat.label}
          value={stat.value}
          Icon={stat.icon}
          tileClass={getTileClass(stat.tone)}
          iconClass={getIconClass(stat.tone)}
        />
      ))}
    </div>
  );
}
