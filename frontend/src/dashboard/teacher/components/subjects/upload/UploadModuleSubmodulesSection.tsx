// Renders editable submodule rows and add/remove actions for the module form.
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ModuleErrors, SubmoduleDraft } from "./uploadModuleTypes";

type Props = {
  submodules: SubmoduleDraft[];
  errors: ModuleErrors;
  touched: Record<string, { title: boolean; description: boolean }>;
  onAdd: () => void;
  onUpdate: (submoduleId: string, field: "title" | "description", value: string) => void;
  onTouched: (submoduleId: string, field: "title" | "description") => void;
  onRemove: (submoduleId: string) => void;
};

export function UploadModuleSubmodulesSection({ submodules, errors, touched, onAdd, onUpdate, onTouched, onRemove }: Props) {
  const showError = (submoduleId: string, field: "title" | "description") => Boolean(touched[submoduleId]?.[field] && errors.submodules[submoduleId]?.[field]);
  return (
    <div className="space-y-4">
      <div><p className="text-sm font-semibold text-[#4B2E1F]">Submodules</p><p className="mt-1 text-xs text-[#4B2E1F]/60">Add submodule titles and descriptions that should be included in this module.</p></div>
      <div className="space-y-3">
        {submodules.map((submodule, index) => (
          <div key={submodule.id} className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1 space-y-2">
                <Label htmlFor={submodule.id} className="text-[#4B2E1F]">{`Submodule Title ${index + 1}`}</Label>
                <Input id={submodule.id} value={submodule.title} onChange={(event) => onUpdate(submodule.id, "title", event.target.value)} onBlur={() => onTouched(submodule.id, "title")} placeholder="Enter submodule title" className="h-12 rounded-2xl border-white/20 bg-white/10 text-[#4B2E1F] placeholder:text-[#4B2E1F]/50" />
                {showError(submodule.id, "title") ? <p className="mt-1 text-sm font-medium text-red-600">{errors.submodules[submodule.id]?.title}</p> : null}
                <div className="space-y-2">
                  <Label htmlFor={`${submodule.id}-description`} className="text-[#4B2E1F]">Submodule Description</Label>
                  <Textarea id={`${submodule.id}-description`} value={submodule.description} onChange={(event) => onUpdate(submodule.id, "description", event.target.value)} onBlur={() => onTouched(submodule.id, "description")} placeholder="Describe what this submodule covers" className="min-h-[80px] rounded-2xl border-white/20 bg-white/10 text-[#4B2E1F] placeholder:text-[#4B2E1F]/50" />
                  {showError(submodule.id, "description") ? <p className="mt-1 text-sm font-medium text-red-600">{errors.submodules[submodule.id]?.description}</p> : null}
                </div>
              </div>
              <Button type="button" variant="ghost" onClick={() => onRemove(submodule.id)} className="h-12 rounded-2xl border border-white/15 bg-white/10 px-4 text-[#4B2E1F] hover:bg-white/20">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div><Button type="button" onClick={onAdd} className="rounded-2xl border border-white/20 bg-white/10 text-[#4B2E1F] hover:bg-white/20">+ Add Submodule</Button></div>
    </div>
  );
}
