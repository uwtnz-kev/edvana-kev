/** Renders the shared assessment card title and themed icon block. */
import { ClipboardList } from "lucide-react";

type Props = {
  title: string;
  iconContainerClass: string;
  iconClass: string;
  compact?: boolean;
};

export function AssessmentCardHeader({ compact = false, iconClass, iconContainerClass, title }: Props) {
  return (
    <div className={`flex items-start ${compact ? "gap-2.5" : "gap-3"}`}>
      <div className={`${compact ? "h-9 w-9 rounded-lg p-2" : "h-14 w-14 rounded-xl p-3"} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${iconContainerClass}`}>
        <ClipboardList className={`${compact ? "h-5 w-5" : "h-7 w-7"} ${iconClass}`} />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <h3 className={`truncate text-white font-semibold ${compact ? "text-base" : "text-lg"}`}>{title}</h3>
      </div>
    </div>
  );
}
