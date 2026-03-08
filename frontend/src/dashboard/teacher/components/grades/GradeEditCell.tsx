/**
 * GradeEditCell
 * -------------
 * Implements the G ra de Ed it Ce ll module for the teacher dashboard g ra de s feature.
 */
import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { StudentGrade } from "./gradesTypes";
import { updateStudentGrade } from "./gradesStore";

type Props = {
  grade: StudentGrade;
  maxScore: number;
  onSaved?: () => void;
};

export default function GradeEditCell({ grade, maxScore, onSaved }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<number | "">(grade.score ?? "");

  const handleSave = () => {
    const numeric = value === "" ? null : Number(value);
    updateStudentGrade({
      ...grade,
      score: numeric,
      updatedAt: new Date().toISOString(),
    });
    setEditing(false);
    onSaved?.();
  };

  const handleCancel = () => {
    setValue(grade.score ?? "");
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="text-white">{grade.score !== null ? `${grade.score}/${maxScore}` : "-"}</span>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="p-1 rounded-lg hover:bg-white/15 transition-colors duration-200"
        >
          <Pencil className="h-4 w-4 text-white/70" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        min={0}
        max={maxScore}
        value={value}
        onChange={(event) => setValue(event.target.value === "" ? "" : Number(event.target.value))}
        className="w-20 bg-white/10 border-white/20 text-white"
      />
      <button
        type="button"
        onClick={handleSave}
        className="p-1 rounded-lg hover:bg-white/15 transition-colors duration-200"
      >
        <Check className="h-4 w-4 text-green-400" />
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="p-1 rounded-lg hover:bg-white/15 transition-colors duration-200"
      >
        <X className="h-4 w-4 text-red-400" />
      </button>
    </div>
  );
}

