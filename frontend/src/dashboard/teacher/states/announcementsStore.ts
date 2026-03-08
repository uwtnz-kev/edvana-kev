/**
 * announcementsStore
 * ------------------
 * Manages state and data helpers for the teacher dashboard teacher dashboard feature.
 */
import { useSyncExternalStore } from "react";
import type {
  CreateAnnouncementInput,
  TeacherAnnouncement,
  UpdateAnnouncementInput,
} from "@/dashboard/teacher/types/announcementTypes";

const KEY = "teacher.announcements.v1";
const listeners = new Set<() => void>();
const seed: TeacherAnnouncement[] = [
  { id: "ann-001", title: "Quarter Review Reminder", body: "Submit your quarter review outline before advisory time tomorrow morning.", subject: "Mathematics", classLabel: "S3A", createdAt: "2026-03-06T08:30:00.000Z", status: "published" },
  { id: "ann-002", title: "Lab Safety Checklist", body: "Bring goggles and complete the pre-lab checklist before entering the room.", subject: "Biology", classLabel: "S3B", createdAt: "2026-03-05T10:00:00.000Z", status: "draft" },
  { id: "ann-003", title: "Reading Circle Update", body: "Group three will present first on Monday, followed by the reflective journal share-out.", subject: "English", classLabel: "All Classes", createdAt: "2026-03-04T07:45:00.000Z", status: "published" },
];
let cache: TeacherAnnouncement[] | null = null;

function storage() { try { return localStorage; } catch { return null; } }
function emit() { listeners.forEach((listener) => listener()); }
function clone(items: TeacherAnnouncement[]) { return items.map((item) => ({ ...item })); }
function buildId() { return crypto?.randomUUID?.() ?? `ann-${Date.now()}`; }

function read() {
  if (cache) return cache;
  const store = storage();
  if (!store) return (cache = clone(seed));
  try {
    const raw = store.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as TeacherAnnouncement[]) : clone(seed);
  } catch {
    cache = clone(seed);
  }
  if (!store.getItem(KEY)) store.setItem(KEY, JSON.stringify(cache));
  return cache;
}

function write(items: TeacherAnnouncement[]) {
  cache = clone(items);
  storage()?.setItem(KEY, JSON.stringify(cache));
  emit();
  return cache;
}

export function subscribeAnnouncements(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAnnouncementsStore() {
  return useSyncExternalStore(subscribeAnnouncements, read, read);
}

export function getAnnouncementById(id: string) {
  return read().find((item) => item.id === id) ?? null;
}

export function createAnnouncement(input: CreateAnnouncementInput) {
  const item: TeacherAnnouncement = { ...input, id: buildId(), createdAt: input.createdAt ?? new Date().toISOString() };
  write([item, ...read()]);
  return item;
}

export function updateAnnouncement(id: string, updates: UpdateAnnouncementInput) {
  const items = read();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const next = [...items];
  next[index] = { ...next[index], ...updates, id, createdAt: next[index].createdAt };
  write(next);
  return next[index];
}

export function deleteAnnouncement(id: string) {
  const next = read().filter((item) => item.id !== id);
  if (next.length === read().length) return false;
  write(next);
  return true;
}

export function publishAnnouncement(id: string) {
  return updateAnnouncement(id, { status: "published" });
}

