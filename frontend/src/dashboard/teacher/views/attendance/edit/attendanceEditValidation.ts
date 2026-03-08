// Defines validation rules for the attendance edit form.
export function normalizeAttendanceNote(note: string) {
  // Empty notes are stored as undefined to preserve existing update behavior.
  return note.trim() || undefined;
}
