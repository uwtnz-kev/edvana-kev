// Renders the builder filters and configuration controls.
import AssessmentItemSearchSelect from "@/dashboard/teacher/components/grades/AssessmentItemSearchSelect";
import {
  GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";
import { Input } from "@/components/ui/input";
import { assessmentTypeOptions, gradeOptions, semesterOptions, subjectOptions, type AssessmentType } from "./gradeListBuilderHelpers";

type Props = {
  assessmentType: AssessmentType;
  grade: string;
  maxScore: string;
  semester: string;
  setAssessmentType: (value: AssessmentType) => void;
  setGrade: (value: string) => void;
  setMaxScore: (value: string) => void;
  setSemester: (value: string) => void;
  setSubject: (value: string) => void;
  subject: string;
};

export function GradeListBuilderControls(props: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
      <AssessmentItemSearchSelect value={props.grade} onChange={props.setGrade} items={gradeOptions} placeholder="Select grade" />
      <AssessmentItemSearchSelect value={props.subject} onChange={props.setSubject} items={subjectOptions} placeholder="Select subject" />
      <GlassSelect value={props.semester} onValueChange={props.setSemester}>
        <GlassSelectTrigger className="w-full"><GlassSelectValue placeholder="Select semester" /></GlassSelectTrigger>
        <GlassSelectContent>{semesterOptions.map((option) => <GlassSelectItem key={option.value} value={option.value}>{option.label}</GlassSelectItem>)}</GlassSelectContent>
      </GlassSelect>
      <GlassSelect value={props.assessmentType} onValueChange={(value) => props.setAssessmentType(value as AssessmentType)}>
        <GlassSelectTrigger className="w-full"><GlassSelectValue placeholder="Type" /></GlassSelectTrigger>
        <GlassSelectContent>{assessmentTypeOptions.map((option) => <GlassSelectItem key={option.value} value={option.value}>{option.label}</GlassSelectItem>)}</GlassSelectContent>
      </GlassSelect>
      <Input value={props.maxScore} onChange={(event) => props.setMaxScore(event.target.value)} placeholder="Max score" type="number" className="bg-white/10 border-white/20 text-[#3B240F] placeholder:text-[#6B4F3A]" />
    </div>
  );
}


