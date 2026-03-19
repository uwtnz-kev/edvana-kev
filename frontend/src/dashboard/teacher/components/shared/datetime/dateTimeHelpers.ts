// Formatting and parsing helpers for the teacher date-time picker.
import type { Meridiem } from "./dateTimeConstants";

export function buildMinuteOptions(step: number) {
  const safeStep = Number.isFinite(step) && step > 0 ? Math.floor(step) : 15;
  const options: string[] = [];
  for (let minute = 0; minute < 60; minute += safeStep) options.push(String(minute).padStart(2, "0"));
  if (!options.includes("00")) options.unshift("00");
  return options;
}

export function toTimeParts(date: Date) {
  const hours24 = date.getHours();
  return {
    hour: String(hours24 % 12 || 12),
    minute: String(date.getMinutes()).padStart(2, "0"),
    meridiem: (hours24 >= 12 ? "PM" : "AM") as Meridiem,
  };
}

// Snap arbitrary minutes to the nearest available select option.
export function snapMinute(minute: string, minuteOptions: string[]) {
  if (minuteOptions.length === 0) return "00";
  if (minuteOptions.includes(minute)) return minute;
  const target = Number(minute);
  if (!Number.isFinite(target)) return minuteOptions[0];
  return minuteOptions.reduce((best, option) => {
    return Math.abs(Number(option) - target) < Math.abs(Number(best) - target) ? option : best;
  }, minuteOptions[0]);
}

function to24Hour(hour: string, meridiem: Meridiem) {
  const parsedHour = Number(hour);
  if (!Number.isFinite(parsedHour)) return null;
  const normalizedHour = parsedHour % 12;
  if (meridiem === "AM") return normalizedHour;
  return normalizedHour + 12;
}

export function buildDateWithTime(baseDate: Date, hour: string, minute: string, meridiem: Meridiem) {
  const hour24 = to24Hour(hour, meridiem);
  const minuteNumber = Number(minute);
  if (hour24 === null || !Number.isFinite(minuteNumber)) return baseDate;
  const next = new Date(baseDate);
  next.setHours(hour24, minuteNumber, 0, 0);
  return next;
}

export function formatTriggerLabel(value: Date | null, placeholder: string) {
  if (!value) return placeholder;
  return value.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
