// Renders the question type select using the shared builder type options.
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QuestionBuilderQuestionType } from "@/dashboard/teacher/components/questions/questionsStore";
import { QUESTION_TYPE_OPTIONS } from "@/dashboard/teacher/components/questions/helpers/questionBuilderHelpers";

type Props = {
  value: QuestionBuilderQuestionType;
  onChange: (value: QuestionBuilderQuestionType) => void;
};

export function QuestionTypeSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-[#3B240F]">Question Type</label>
      <Select value={value} onValueChange={(next) => onChange(next as QuestionBuilderQuestionType)}>
        <SelectTrigger className="h-12 rounded-2xl border border-white/20 bg-white/20 text-[#3B240F]">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border border-white/20 bg-white/80 text-[#3B240F] backdrop-blur-xl">
          {QUESTION_TYPE_OPTIONS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}


