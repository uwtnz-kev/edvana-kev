/** Renders the shared assessment card action buttons used across cards. */
import { Eye, Files, Pencil, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  publishDisabled: boolean;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: () => void;
};

export function AssessmentCardActions({ id, onDelete, onDuplicate, onEdit, onPreview, onPublish, publishDisabled }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" onClick={() => onPreview(id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl transition-all duration-200"><Eye className="h-4 w-4 mr-2" />Preview</Button>
      <Button type="button" onClick={() => onDuplicate(id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl transition-all duration-200"><Files className="h-4 w-4 mr-2" />Duplicate</Button>
      <Button type="button" onClick={() => onPublish(id)} disabled={publishDisabled} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl disabled:opacity-50 transition-all duration-200"><Send className="h-4 w-4 mr-2" />Publish</Button>
      <Button type="button" onClick={() => onEdit(id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl"><Pencil className="h-4 w-4 mr-2" />Edit</Button>
      <Button type="button" onClick={onDelete} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl transition-all duration-200"><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
    </div>
  );
}
