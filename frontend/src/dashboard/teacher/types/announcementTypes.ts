/**
 * announcementTypes
 * -----------------
 * Defines types used by the teacher dashboard teacher dashboard feature.
 */
export type AnnouncementStatus = "draft" | "published";

export type AnnouncementAttachment = {
  name: string;
  size: number;
  type: string;
};

export interface TeacherAnnouncement {
  id: string;
  title: string;
  body: string;
  subject: string;
  classLabel: string;
  createdAt: string;
  status: AnnouncementStatus;
  attachment?: AnnouncementAttachment | null;
}

export type CreateAnnouncementInput = Omit<TeacherAnnouncement, "id" | "createdAt"> & {
  createdAt?: string;
};

export type UpdateAnnouncementInput = Partial<Omit<TeacherAnnouncement, "id" | "createdAt">>;

