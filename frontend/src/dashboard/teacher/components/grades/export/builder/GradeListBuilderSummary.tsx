// Renders the student score table and save action for the draft.
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { BuilderRow } from "./gradeListBuilderHelpers";

type Props = {
  ready: boolean;
  rows: BuilderRow[];
  saveDraft: () => void;
  setScore: (studentId: string, value: string) => void;
};

export function GradeListBuilderSummary({ ready, rows, saveDraft, setScore }: Props) {
  if (!ready) return <div className="text-sm text-[#6B4F3A]">Select grade, subject, semester, and type to load students.</div>;

  return (
    <>
      <div className="rounded-2xl bg-white/10 border border-white/15 overflow-hidden">
        <div className="max-h-72 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/10"><tr className="text-[#3B240F]"><th className="px-4 py-3 text-left font-medium">Student</th><th className="px-4 py-3 text-left font-medium">Score</th></tr></thead>
            <tbody>{rows.map((row) => <tr key={row.studentId} className="border-t border-white/10 hover:bg-white/10 transition"><td className="px-4 py-3 text-[#3B240F]">{row.studentName}</td><td className="px-4 py-3"><Input value={row.score} onChange={(event) => setScore(row.studentId, event.target.value)} placeholder="Score" type="number" className="w-28 bg-white/10 border-white/20 text-[#3B240F] placeholder:text-[#6B4F3A]" /></td></tr>)}</tbody>
          </table>
          {rows.length === 0 ? <div className="p-6 text-center text-[#6B4F3A]">No students found</div> : null}
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button type="button" onClick={saveDraft} className="h-9 px-4 rounded-xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 text-white hover:opacity-90 transition text-sm font-medium flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save
        </button>
      </div>
    </>
  );
}
