// Renders the folder filter control for the messages workspace.
import {
  GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";
import type { MessageFolder } from "../messagesTypes";
import { folderItems, toMessageFolder } from "./messagesToolbarHelpers";

type Props = {
  folder: MessageFolder;
  onFolderChange: (value: MessageFolder) => void;
};

export function MessagesToolbarFilters({ folder, onFolderChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:flex-none">
      <GlassSelect value={folder} onValueChange={(value) => onFolderChange(toMessageFolder(value))}>
        <GlassSelectTrigger className="w-full sm:w-[160px] lg:w-[160px]"><GlassSelectValue placeholder="All Messages" /></GlassSelectTrigger>
        <GlassSelectContent>{folderItems.map((item) => <GlassSelectItem key={item.value} value={item.value}>{item.label}</GlassSelectItem>)}</GlassSelectContent>
      </GlassSelect>
    </div>
  );
}


