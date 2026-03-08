// Renders the create grade list form fields, roster table, and submit actions.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeacherGradeListDatePicker } from "@/dashboard/teacher/components/grades/create/TeacherGradeListDatePicker";
import { assessmentOptions } from "./gradeListHelpers";
import { GradeListStudentsTable } from "./GradeListStudentsTable";
import type { useGradeListState } from "./useGradeListState";

type Props = { state: ReturnType<typeof useGradeListState> };

export function CreateGradeListForm({ state }: Props) {
  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2"><label className="text-sm font-medium text-white/80">Subject</label><div className="h-10 rounded-xl border border-white/10 bg-white/10 px-3 flex items-center text-white/90">{state.selectedSubject?.name}</div></div>
        <div className="space-y-2"><label className="text-sm font-medium text-white/80">Class</label><Select value={state.classId} onValueChange={state.setClassId} disabled={!state.subjectId}><SelectTrigger className="bg-white/10 border-white/10 text-white"><SelectValue placeholder="Select class" /></SelectTrigger><SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl text-white">{state.classOptions.map((className) => <SelectItem key={className} value={className} className="focus:bg-white/10">{className}</SelectItem>)}</SelectContent></Select>{state.isSubmitted && !state.classId ? <p className="mt-1 text-sm font-medium text-red-600">Class is required.</p> : null}</div>
        <div className="space-y-2"><label className="text-sm font-medium text-white/80">Assessment Type</label>{state.lockedAssessmentType ? <div className="h-10 rounded-xl border border-white/10 bg-white/10 px-3 flex items-center text-white/90 capitalize">{state.lockedAssessmentType}</div> : <Select value={state.assessmentType} onValueChange={(value) => state.setAssessmentType(value as typeof state.assessmentType)}><SelectTrigger className="bg-white/10 border-white/10 text-white"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl text-white">{assessmentOptions.map((option) => <SelectItem key={option.value} value={option.value} className="focus:bg-white/10">{option.label}</SelectItem>)}</SelectContent></Select>}{state.isSubmitted && !state.effectiveAssessmentType ? <p className="mt-1 text-sm font-medium text-red-600">Assessment type is required.</p> : null}</div>
        <div className="space-y-2 lg:col-span-2"><label className="text-sm font-medium text-white/80">Title</label><Input value={state.title} onChange={(event) => state.setTitle(event.target.value)} placeholder="Term 1 Midterm Grades" className="bg-white/10 border-white/10 text-white placeholder:text-white/50" />{state.isSubmitted && !state.title.trim() ? <p className="mt-1 text-sm font-medium text-red-600">Title is required.</p> : null}</div>
        <div className="space-y-2"><label className="text-sm font-medium text-white/80">Date</label><div className="w-full [&_button]:h-10 [&_button]:w-full [&_button]:rounded-xl"><TeacherGradeListDatePicker value={state.date} onChange={state.setDate} /></div>{state.isSubmitted && !state.date ? <p className="mt-1 text-sm font-medium text-red-600">Date is required.</p> : null}</div>
        <div className="space-y-2"><label className="text-sm font-medium text-white/80">Max Score</label><Input type="number" min={1} step="0.01" value={state.maxScore} onChange={(event) => state.setMaxScore(event.target.value)} placeholder="100" className="bg-white/10 border-white/10 text-white placeholder:text-white/50" />{state.isSubmitted && !state.validMaxScore ? <p className="mt-1 text-sm font-medium text-red-600">Enter a valid max score greater than 0.</p> : null}</div>
      </div>
      <GradeListStudentsTable state={state} />
      <div className="flex items-center justify-end gap-3"><Button type="button" onClick={state.backToGrades} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl">Cancel</Button><Button type="button" onClick={state.saveGradeList} className="bg-white/15 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl px-6">Save Grade List</Button></div>
    </div>
  );
}


