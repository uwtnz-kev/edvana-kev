// Provides small formatting and range helpers for the date picker.
export function formatDateTriggerLabel(value: Date | null, placeholder: string) {
  if (!value) return placeholder;
  return value.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Radix calendar expects a predicate for disabling days outside the allowed range.
export function isDateDisabled(date: Date, minDate?: Date, maxDate?: Date) {
  const beforeMin = minDate ? date < minDate : false;
  const afterMax = maxDate ? date > maxDate : false;
  return beforeMin || afterMax;
}
