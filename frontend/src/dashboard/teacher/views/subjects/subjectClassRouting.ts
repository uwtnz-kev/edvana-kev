export const SUBJECT_CLASS_QUERY_KEY = "classId";

export function getClassIdFromSearchParams(searchParams: URLSearchParams) {
  const classId = searchParams.get(SUBJECT_CLASS_QUERY_KEY)?.trim();
  return classId ? classId.toLowerCase() : null;
}

export function buildClassSearch(classId: string | null | undefined) {
  return classId ? `?${SUBJECT_CLASS_QUERY_KEY}=${encodeURIComponent(classId)}` : "";
}

export function appendClassIdToPath(path: string, classId: string | null | undefined) {
  const search = buildClassSearch(classId);
  return search ? `${path}${search}` : path;
}
