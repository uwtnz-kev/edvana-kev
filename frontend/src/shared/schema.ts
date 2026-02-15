import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull().default("student"), // student, teacher, admin
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  instructor: text("instructor").notNull(),
  instructorAvatar: text("instructor_avatar"),
  category: text("category").notNull(),
  level: text("level").notNull(), // beginner, intermediate, advanced
  duration: text("duration").notNull(),
  rating: real("rating").notNull().default(0),
  studentsCount: integer("students_count").notNull().default(0),
  price: integer("price").notNull(),
  imageUrl: text("image_url"),
  totalLessons: integer("total_lessons").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  duration: text("duration").notNull(),
  moduleNumber: integer("module_number").notNull(),
  lessonNumber: integer("lesson_number").notNull(),
  isCompleted: boolean("is_completed").default(false),
  videoUrl: text("video_url"),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  progress: real("progress").notNull().default(0),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  totalQuestions: integer("total_questions").notNull().default(0),
  timeLimit: integer("time_limit"), // in minutes
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id").notNull().references(() => assessments.id),
  question: text("question").notNull(),
  options: text("options").array().notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  questionNumber: integer("question_number").notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id),
  isCompleted: boolean("is_completed").default(false),
  completedAt: timestamp("completed_at"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolledAt: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Lesson = typeof lessons.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Question = typeof questions.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
