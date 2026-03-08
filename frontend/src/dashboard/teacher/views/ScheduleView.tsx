// Orchestrates the teacher schedule workspace using extracted view modules.
import { TeacherScheduleNote } from "../components/schedule";
import { ScheduleCardsList, ScheduleFilters, ScheduleHeader, useScheduleViewState } from "./schedule";
import { scheduleData } from "./schedule/scheduleViewHelpers";

export default function ScheduleView() {
  const state = useScheduleViewState();

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto max-w-7xl space-y-6">
        <ScheduleHeader />

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
