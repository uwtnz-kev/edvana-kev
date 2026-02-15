import api from "./axios";

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  price: number;
  imageUrl: string;
  modules: number;
  students: number;
}

export interface Progress {
  courseId: number;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: Date;
}

export const studentAPI = {
  getEnrolledCourses: async (): Promise<Course[]> => {
    return [
      {
        id: 1,
        title: "Mathematics - Primary 4",
        description: "Competence-based mathematics curriculum for Primary 4 students",
        category: "Mathematics",
        level: "Primary 4",
        duration: "36 weeks",
        instructor: "Mr. Jean Baptiste",
        price: 0,
        imageUrl: "/api/placeholder/300/200",
        modules: 12,
        students: 245,
      },
      {
        id: 2,
        title: "Kinyarwanda - Primary 4",
        description: "Mother tongue language development",
        category: "Languages",
        level: "Primary 4",
        duration: "36 weeks",
        instructor: "Ms. Marie Claire",
        price: 0,
        imageUrl: "/api/placeholder/300/200",
        modules: 10,
        students: 245,
      },
    ];
  },

  getProgress: async (): Promise<Progress[]> => {
    return [
      {
        courseId: 1,
        progress: 65,
        completedLessons: 13,
        totalLessons: 20,
        lastAccessed: new Date(),
      },
      {
        courseId: 2,
        progress: 40,
        completedLessons: 8,
        totalLessons: 20,
        lastAccessed: new Date(),
      },
    ];
  },

  getAvailableCourses: async (): Promise<Course[]> => {
    return [
      {
        id: 3,
        title: "Science - Primary 4",
        description: "Hands-on science exploration",
        category: "Science",
        level: "Primary 4",
        duration: "36 weeks",
        instructor: "Dr. Patrick Uwimana",
        price: 0,
        imageUrl: "/api/placeholder/300/200",
        modules: 8,
        students: 189,
      },
    ];
  },
};