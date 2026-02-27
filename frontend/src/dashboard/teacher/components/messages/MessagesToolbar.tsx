import {
  Archive,
  MoreVertical,
  Pencil,
  Reply,
  Search,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";
import type { MessageFolder } from "./messagesTypes";

type Option = { value: string; label: string };

type Props = {
  courseId: string;
  onCourseChange: (v: string) => void;
  folder: MessageFolder;
  onFolderChange: (v: MessageFolder) => void;
  query: string;
  onQueryChange: (v: string) => void;

  onCompose: () => void;
  onReply: () => void;
  onReplyAll: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onMore: () => void;

  courseOptions: Option[];
  actionsDisabled: boolean;
};

const iconBtn =
  "h-12 w-12 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md hover:bg-white/15 transition disabled:opacity-40 disabled:hover:bg-white/10";

function SelectField(props: {
  value: string;
  onValueChange: (v: string) => void;
  placeholder: string;
  items: Option[];
  className?: string;
}) {
  return (
    <GlassSelect value={props.value} onValueChange={props.onValueChange}>
      <GlassSelectTrigger className={props.className}>
        <GlassSelectValue placeholder={props.placeholder} />
      </GlassSelectTrigger>
      <GlassSelectContent>
        {props.items.map((it) => (
          <GlassSelectItem key={it.value} value={it.value}>
            {it.label}
          </GlassSelectItem>
        ))}
      </GlassSelectContent>
    </GlassSelect>
  );
}

export default function MessagesToolbar(props: Props) {
  const folderItems: Option[] = [
    { value: "inbox", label: "Inbox" },
    { value: "read", label: "Read" },
    { value: "unread", label: "Unread" },
    { value: "sent", label: "Sent" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:flex-none">
        <SelectField
          value={props.courseId}
          onValueChange={props.onCourseChange}
          placeholder="All Courses"
          items={props.courseOptions}
          className="w-full sm:w-[200px] lg:w-[200px]"
        />
        <SelectField
          value={props.folder}
          onValueChange={(v) => props.onFolderChange(v as MessageFolder)}
          placeholder="Unread"
          items={folderItems}
          className="w-full sm:w-[160px] lg:w-[160px]"
        />
      </div>

      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B4F3A]" />
        <Input
          value={props.query}
          onChange={(e) => props.onQueryChange(e.target.value)}
          placeholder="Search..."
          className="pl-9 h-12 rounded-xl border-white/15 bg-white/10 backdrop-blur-md w-full"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Button variant="ghost" className={iconBtn} onClick={props.onCompose} title="Compose">
          <Pencil className="h-5 w-5 text-[#FF715B]" />
        </Button>

        <Button
          variant="ghost"
          className={iconBtn}
          onClick={props.onReply}
          disabled={props.actionsDisabled}
          title="Reply"
        >
          <Reply className="h-5 w-5 text-[#A855F7]" />
        </Button>

        <Button
          variant="ghost"
          className={iconBtn}
          onClick={props.onArchive}
          disabled={props.actionsDisabled}
          title="Archive"
        >
          <Archive className="h-5 w-5 text-[#1EA896]" />
        </Button>

        <Button
          variant="ghost"
          className={iconBtn}
          onClick={props.onDelete}
          disabled={props.actionsDisabled}
          title="Delete"
        >
          <Trash2 className="h-5 w-5 text-[#FF715B]" />
        </Button>

        <Button
          variant="ghost"
          className={iconBtn}
          onClick={props.onMore}
          disabled={props.actionsDisabled}
          title="More"
        >
          <MoreVertical className="h-5 w-5 text-[#6B4F3A]" />
        </Button>
      </div>
    </div>
  );
}