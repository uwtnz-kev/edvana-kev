// Renders the subject display, class display, and title input for assignment authoring.
import { BookOpen, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { seedClasses2 } from "@/dashboard/teacher/components/assignments";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import type { AssignmentFieldProps } from "./assignmentCreateTypes";

type Props = AssignmentFieldProps & {
  subjectName: string;
  isClassLocked: boolean;
  onClassChange: (value: string) => void;
};

export function TeacherAssignmentBasicFieldsSection({
  subjectName,
  values,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  onClassChange,
  isClassLocked,
}: Props) {
  const subjectTheme = getSubjectIconTheme(subjectName);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="w-full">
        <label className="mb-2 block text-sm text-white">Subject</label>
        <div className="inline-flex h-12 w-full items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3">
          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-xl ${subjectTheme.bgClass} ${subjectTheme.iconClass}`}>
            <BookOpen className="h-4 w-4" />
          </span>
          <span className="truncate text-sm font-medium text-white">{subjectName}</span>
        </div>
      </div>

      <div className="w-full">
        <label htmlFor="assignment-class-trigger" className="mb-2 block text-sm text-white">Class</label>
        {isClassLocked ? (
          <div id="assignment-class-trigger" className="inline-flex h-12 w-full items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3">
            <span className={`inline-flex h-7 w-7 items-center justify-center rounded-xl ${subjectTheme.bgClass} ${subjectTheme.iconClass}`}>
              <GraduationCap className="h-4 w-4" />
            </span>
            <span className="truncate text-sm font-medium text-white">{values.classLabel}</span>
          </div>
        ) : (
          <Select value={values.classId} onValueChange={onClassChange}>
            <SelectTrigger id="assignment-class-trigger" className="h-12 w-full rounded-2xl border border-white/20 bg-white/20 text-white data-[placeholder]:text-white [&>svg]:text-white">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-white/25 bg-white/25 text-white backdrop-blur-xl">
              {seedClasses2.map((item) => <SelectItem key={item.id} value={item.id} className="text-white focus:bg-white/30 focus:text-white">{item.label}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
        {!isClassLocked && touched.classId && errors.classId ? <p className="mt-1 text-sm font-medium text-red-600">{errors.classId}</p> : null}
      </div>

      <div className="space-y-2 lg:col-span-2">
        <label htmlFor="assignment-title" className="text-sm text-white">Title</label>
        <Input id="assignment-title" value={values.title} onChange={(event) => onFieldChange("title", event.target.value)} onBlur={() => onFieldBlur("title")} placeholder="Quarter 3 Performance Task" className="border-white/20 bg-white/20 text-white placeholder:text-white/70" />
        {touched.title && errors.title ? <p className="mt-1 text-sm font-medium text-red-600">{errors.title}</p> : null}
      </div>
    </div>
  );
}
