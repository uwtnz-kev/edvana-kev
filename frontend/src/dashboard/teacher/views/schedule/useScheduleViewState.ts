// State hook for the teacher schedule workspace filters.
import { useMemo, useState } from "react";
import { getFilteredSchedule, getScheduleSubjects, scheduleData } from "./scheduleViewHelpers";

export function useScheduleViewState() {
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const subjects = useMemo(() => getScheduleSubjects(scheduleData), []);
  const filteredScheduleData = useMemo(() => {
    return getFilteredSchedule(scheduleData, selectedDay, selectedSubject);
  }, [selectedDay, selectedSubject]);

  return {
    filteredScheduleData,
    selectedDay,
    selectedSubject,
    setSelectedDay,
    setSelectedSubject,
    subjects,
  };
}
