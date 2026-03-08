// Renders the parent summary badges and core contact information cards.
import type { ReactNode } from "react";
import type { ParentRecord } from "@/utils/data/parents/parentsStore";
import { getParentInfoCards, renderParentBadges } from "./parentDetailsHelpers";

type Props = {
  parent: ParentRecord;
};

function InfoCard({
  icon,
  label,
  span2,
  value,
}: {
  icon: ReactNode;
  label: string;
  span2?: boolean;
  value: string;
}) {
  return (
    <div className={["rounded-2xl border border-white/10 bg-white/10 px-5 py-4", span2 ? "md:col-span-2" : ""].join(" ")}>
      <div className="text-white/60 text-sm">{label}</div>
      <div className="mt-2 flex items-center gap-3 min-w-0">
        <div className="text-white/70">{icon}</div>
        <div className="text-white font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}

export function ParentDetailsOverview({ parent }: Props) {
  const cards = getParentInfoCards(parent);

  return (
    <>
      {renderParentBadges(parent)}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <InfoCard key={card.label} {...card} />
        ))}
      </div>
    </>
  );
}
