/** Renders the shared assessment card title and themed icon block. */
import { ClipboardList } from "lucide-react";

type Props = {
  title: string;
  iconContainerClass: string;
  iconClass: string;
};

export function AssessmentCardHeader({ iconClass, iconContainerClass, title }: Props) {
  return (
    <div className="flex items-start gap-3">
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${iconContainerClass}`}>
        <ClipboardList className={`h-7 w-7 ${iconClass}`} />
      </div>
      <div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}
