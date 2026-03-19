// Orchestrates the teacher schedule workspace using extracted view modules.
import { CalendarDays } from "lucide-react";
import { TeacherScheduleNote } from "../components/schedule";
import { ScheduleCardsList, ScheduleFilters, ScheduleHeader, useScheduleViewState } from "./schedule";
import { scheduleData } from "./schedule/scheduleViewHelpers";
import { TeacherFeatureClassEntryGate } from "./shared/TeacherFeatureClassEntryGate";

export default function ScheduleView() {
  return (
    <TeacherFeatureClassEntryGate
      entryPath="/dashboard/teacher/schedule"
      featureKey="schedule"
      title="Schedule"
      subtitle="Choose a class to open the teaching schedule"
      icon={CalendarDays}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
    >
      {({ onBackToEntry }) => <ScheduleScopedView onBackToEntry={onBackToEntry} />}
    </TeacherFeatureClassEntryGate>
  );
}

function ScheduleScopedView({ onBackToEntry }: { onBackToEntry: () => void }) {
  const state = useScheduleViewState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto max-w-7xl space-y-6">
        <ScheduleHeader showBack onBack={onBackToEntry} />

        <TeacherScheduleNote />

        <ScheduleFilters
          selectedDay={state.selectedDay}
          onDayChange={state.setSelectedDay}
          selectedSubject={state.selectedSubject}
          onSubjectChange={state.setSelectedSubject}
          days={scheduleData.days}
          subjects={state.subjects}
        />

        <ScheduleCardsList schedule={state.filteredScheduleData} />
      </div>
    </div>
  );
}
