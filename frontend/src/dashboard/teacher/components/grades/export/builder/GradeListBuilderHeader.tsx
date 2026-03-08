// Renders the card header for creating a new grade list draft.
import { Users } from "lucide-react";

type Props = {
  listName: string;
};

export function GradeListBuilderHeader({ listName }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#8B6F52]/75 to-[#6F5238]/75 flex items-center justify-center">
        <Users className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-[#3B240F]">New grade list</p>
        <p className="text-xs text-[#6B4F3A] truncate max-w-[360px]">{listName}</p>
      </div>
    </div>
  );
}
