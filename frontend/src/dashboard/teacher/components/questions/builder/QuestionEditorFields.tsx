// Renders question-type-specific editor controls used inside the main editor panel.
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QuestionBuilderQuestion } from "@/dashboard/teacher/components/questions/questionsStore";

type Props = {
  question: QuestionBuilderQuestion;
  onPatch: (patch: Partial<QuestionBuilderQuestion>) => void;
};

export function QuestionEditorFields({ question, onPatch }: Props) {
  if (question.questionType === "multiple_choice") return <MultipleChoiceEditor question={question} onPatch={onPatch} />;
  if (question.questionType === "matching") return <MatchingEditor question={question} onPatch={onPatch} />;
  if (question.questionType === "identification") return <IdentificationEditor question={question} onPatch={onPatch} />;
  if (question.questionType === "short_answer") return <ShortAnswerEditor question={question} onPatch={onPatch} />;
  return <TrueFalseEditor question={question} onPatch={onPatch} />;
}

function MultipleChoiceEditor({ question, onPatch }: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm text-white">Options</label>
      {question.options.map((option, index) => (
        <Input key={`${question.id}-option-${index}`} value={option} onChange={(event) => { const next = [...question.options]; next[index] = event.target.value; onPatch({ options: next }); }} placeholder={`Option ${String.fromCharCode(65 + index)}`} className="h-12 border-white/20 bg-white/20 text-white placeholder:text-white/70" />
      ))}
      <div className="space-y-2">
        <label className="text-sm text-white">Correct Answer</label>
        <Select value={question.correctAnswer} onValueChange={(next) => onPatch({ correctAnswer: next })}>
          <SelectTrigger className="h-12 rounded-2xl border border-white/20 bg-white/20 text-white data-[placeholder]:text-white/70"><SelectValue placeholder="Select correct answer" /></SelectTrigger>
          <SelectContent className="rounded-2xl border border-white/20 bg-[#1b2430]/95 text-white backdrop-blur-xl">
            {question.options.map((option, index) => <SelectItem key={`${question.id}-correct-${index}`} value={`Option ${String.fromCharCode(65 + index)}`}>{option || `Option ${String.fromCharCode(65 + index)}`}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function MatchingEditor({ question, onPatch }: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm text-white">Matching Pairs</label>
      {question.matchingPairs.map((pair, index) => (
        <div key={pair.id} className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input value={pair.left} onChange={(event) => onPatch({ matchingPairs: question.matchingPairs.map((entry) => entry.id === pair.id ? { ...entry, left: event.target.value } : entry) })} placeholder={`Left item ${index + 1}`} className="h-12 border-white/20 bg-white/20 text-white placeholder:text-white/70" />
          <Input value={pair.right} onChange={(event) => onPatch({ matchingPairs: question.matchingPairs.map((entry) => entry.id === pair.id ? { ...entry, right: event.target.value } : entry) })} placeholder={`Right item ${index + 1}`} className="h-12 border-white/20 bg-white/20 text-white placeholder:text-white/70" />
        </div>
      ))}
    </div>
  );
}

function IdentificationEditor({ question, onPatch }: Props) {
  return <SimpleAnswerField label="Expected Answer" value={question.identificationAnswer} onChange={(value) => onPatch({ identificationAnswer: value })} multiline={false} />;
}

function ShortAnswerEditor({ question, onPatch }: Props) {
  return <SimpleAnswerField label="Expected Answer" value={question.shortAnswer} onChange={(value) => onPatch({ shortAnswer: value })} multiline />;
}

function TrueFalseEditor({ question, onPatch }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white">Correct Answer</label>
      <Select value={question.trueFalseAnswer} onValueChange={(next) => onPatch({ trueFalseAnswer: next as "true" | "false" })}>
        <SelectTrigger className="h-12 rounded-2xl border border-white/20 bg-white/20 text-white data-[placeholder]:text-white/70"><SelectValue placeholder="Select true or false" /></SelectTrigger>
        <SelectContent className="rounded-2xl border border-white/20 bg-[#1b2430]/95 text-white backdrop-blur-xl">
          <SelectItem value="true">True</SelectItem>
          <SelectItem value="false">False</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function SimpleAnswerField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white">{label}</label>
      {multiline ? (
        <Textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder="Enter expected long answer" className="min-h-[100px] border-white/20 bg-white/20 text-white placeholder:text-white/70" />
      ) : (
        <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Enter expected answer" className="h-12 border-white/20 bg-white/20 text-white placeholder:text-white/70" />
      )}
    </div>
  );
}


