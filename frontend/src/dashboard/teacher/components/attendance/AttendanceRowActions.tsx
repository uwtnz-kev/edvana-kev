import React from "react";
import { MoreVertical, Pencil, StickyNote, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AttendanceRecord } from "./attendanceTypes";

type Props = {
  row: AttendanceRecord;
  onEdit?: (row: AttendanceRecord) => void;
  onClearNote?: (row: AttendanceRecord) => void;
  onRemove?: (row: AttendanceRecord) => void;
};

export default function AttendanceRowActions({
  row,
  onEdit,
  onClearNote,
  onRemove,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/15 transition-colors"
          aria-label="Row actions"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white/10 backdrop-blur-xl border border-white/25"
      >
        <DropdownMenuItem
          onClick={() => onEdit?.(row)}
          className="cursor-pointer hover:bg-white/15"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit status
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onClearNote?.(row)}
          className="cursor-pointer hover:bg-white/15"
          disabled={!row.note}
        >
          <StickyNote className="h-4 w-4 mr-2" />
          Clear note
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/15" />

        <DropdownMenuItem
          onClick={() => onRemove?.(row)}
          className="cursor-pointer hover:bg-white/15 text-red-200 focus:text-red-200"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Remove record
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}