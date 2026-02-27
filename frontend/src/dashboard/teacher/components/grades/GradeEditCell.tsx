import { useState } from "react";
import { Check, X, Pencil } from "lucide-react";
import { StudentGrade } from "./gradesTypes";
import { updateStudentGrade } from "./gradesStore";
import { Input } from "@/components/ui/input";

interface Props {
  grade: StudentGrade;
  maxScore: number;
  onSaved?: () => void;
}

export default function GradeEditCell({ grade, maxScore, onSaved }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<number | "">(grade.score ?? "");

  function handleSave() {
    const numeric = value === "" ? null : Number(value);

    updateStudentGrade({
      ...grade,
      score: numeric,
      updatedAt: new Date().toISOString(),
    });

    setEditing(false);
    onSaved?.(); // trigger parent refresh
  }

  function handleCancel() {
    setValue(grade.score ?? "");
    setEditing(false);
  }

  if (!editing) {
    return (
      <div className="flex items-center justify-between gap-2">
        <span className="text-[#3B240F]">
          {grade.score !== null ? `${grade.score}/${maxScore}` : "—"}
        </span>

        <button
          onClick={() => setEditing(true)}
          className="p-1 rounded-lg hover:bg-white/15 transition"
        >
          <Pencil className="h-4 w-4 text-[#6B4F3A]" />
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
        onChange={(e) =>
          setValue(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-20 bg-white/10 border-white/20 text-[#3B240F]"
      />

      <button
        onClick={handleSave}
        className="p-1 rounded-lg hover:bg-white/15 transition"
      >
        <Check className="h-4 w-4 text-green-500" />
      </button>

      <button
        onClick={handleCancel}
        className="p-1 rounded-lg hover:bg-white/15 transition"
      >
        <X className="h-4 w-4 text-red-500" />
      </button>
    </div>
  );
} 