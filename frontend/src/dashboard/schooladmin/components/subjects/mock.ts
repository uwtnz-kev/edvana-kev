import { Subject, SubjectStatus } from './types';

// Generate random date within last 180 days
const getRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 180);
  const randomDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
  return randomDate.toISOString();
};

// Generate random mock metrics
const getRandomStudentCount = () => Math.floor(Math.random() * 40) + 15; // 15-55 students
const getRandomPassingRate = () => Math.floor(Math.random() * 40) + 60; // 60-100% passing rate

// Rwandan teacher names
const teachers = [
  "Mr. Jean Baptiste Uwimana",
  "Ms. Marie Claire Mukamana", 
  "Mr. Paul Nkubana",
  "Ms. Agnes Nyirahabimana",
  "Mr. Emmanuel Bizimana",
  "Ms. Claudine Uwizeyimana",
  "Mr. David Habimana",
  "Ms. Grace Mukandayisenga",
  "Mr. Eric Ndayisaba",
  "Ms. Josephine Mukarugwiza",
  "Mr. Innocent Nzeyimana",
  "Ms. Immaculee Uwimana",
  "Mr. Alexis Rugema",
  "Ms. Beatrice Nyiramana",
  "Mr. Vincent Habyarimana"
];

// Available class options
const classOptions = [
  "P1 A", "P1 B", "P2 A", "P2 B", "P3 A", "P3 B", 
  "P4 A", "P4 B", "P5 A", "P5 B", "P6 A", "P6 B",
  "S1 A", "S1 B", "S2 A", "S2 B", "S3 A", "S3 B",
  "S4 A", "S4 B", "S5 A", "S5 B", "S6 A", "S6 B"
];

// Generate random classes assignment
const getRandomClasses = () => {
  const numClasses = Math.floor(Math.random() * 4) + 1; // 1-4 classes
  const shuffled = [...classOptions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numClasses);
};

// Realistic Rwandan curriculum subjects with new data model
export const SUBJECTS: Subject[] = [
  {
    id: "subj-001",
    name: "Kinyarwanda",
    code: "KIN-001",
    classes: ["P1 A", "P1 B", "P2 A"],
    teacherName: "Ms. Marie Claire Mukamana",
    numberOfStudents: 45,
    passingRate: 87,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-002",
    name: "English",
    code: "ENG-001",
    classes: ["P1 A", "P1 B", "P2 A", "P2 B"],
    teacherName: "Mr. Jean Baptiste Uwimana",
    numberOfStudents: 52,
    passingRate: 79,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-003",
    name: "Mathematics",
    code: "MATH-001",
    classes: ["P3 A", "P3 B", "P4 A"],
    teacherName: "Mr. Paul Nkubana",
    numberOfStudents: 38,
    passingRate: 92,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-004",
    name: "Science",
    code: "SCI-001",
    classes: ["P4 A", "P4 B", "P5 A"],
    teacherName: "Ms. Agnes Nyirahabimana",
    numberOfStudents: 41,
    passingRate: 85,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-005",
    name: "Social Studies",
    code: "SS-001",
    classes: ["P5 A", "P5 B", "P6 A"],
    teacherName: "Mr. Emmanuel Bizimana",
    numberOfStudents: 35,
    passingRate: 76,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-006",
    name: "French",
    code: "FR-001",
    classes: ["S1 A", "S1 B"],
    teacherName: "Ms. Claudine Uwizeyimana",
    numberOfStudents: 29,
    passingRate: 88,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-007",
    name: "Physics",
    code: "PHY-001",
    classes: ["S4 A", "S5 A", "S6 A"],
    teacherName: "Mr. David Habimana",
    numberOfStudents: 32,
    passingRate: 91,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-008",
    name: "Chemistry",
    code: "CHEM-001",
    classes: ["S4 B", "S5 B", "S6 B"],
    teacherName: "Ms. Grace Mukandayisenga",
    numberOfStudents: 27,
    passingRate: 84,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-009",
    name: "Biology",
    code: "BIO-001",
    classes: ["S2 A", "S3 A", "S4 A"],
    teacherName: "Mr. Eric Ndayisaba",
    numberOfStudents: 44,
    passingRate: 89,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-010",
    name: "History",
    code: "HIST-001",
    classes: ["S2 B", "S3 B"],
    teacherName: "Ms. Josephine Mukarugwiza",
    numberOfStudents: 31,
    passingRate: 82,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-011",
    name: "Geography",
    code: "GEO-001",
    classes: ["S1 A", "S2 A"],
    teacherName: "Mr. Innocent Nzeyimana",
    numberOfStudents: 36,
    passingRate: 78,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-012",
    name: "Computer Studies",
    code: "CS-001",
    classes: ["S5 A", "S6 A"],
    teacherName: "Ms. Immaculee Uwimana",
    numberOfStudents: 25,
    passingRate: 95,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-013",
    name: "Economics",
    code: "ECON-001",
    classes: ["S4 A", "S5 A"],
    teacherName: "Mr. Alexis Rugema",
    numberOfStudents: 33,
    passingRate: 86,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-014",
    name: "Physical Education",
    code: "PE-001",
    classes: ["P1 A", "P2 A", "P3 A", "P4 A"],
    teacherName: "Ms. Beatrice Nyiramana",
    numberOfStudents: 58,
    passingRate: 96,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-015",
    name: "Creative Arts",
    code: "ART-001",
    classes: ["P3 B", "P4 B", "P5 B"],
    teacherName: "Mr. Vincent Habyarimana",
    numberOfStudents: 42,
    passingRate: 90,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-016",
    name: "Entrepreneurship",
    code: "ENT-001",
    classes: ["S3 A", "S3 B"],
    teacherName: "Ms. Marie Claire Mukamana",
    numberOfStudents: 28,
    passingRate: 83,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-017",
    name: "Agriculture",
    code: "AGR-001",
    classes: ["P5 A", "P6 A"],
    teacherName: "Mr. Paul Nkubana",
    numberOfStudents: 34,
    passingRate: 88,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-018",
    name: "Music",
    code: "MUS-001",
    classes: ["S1 B", "S2 B"],
    teacherName: "Ms. Grace Mukandayisenga",
    numberOfStudents: 22,
    passingRate: 94,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-019",
    name: "Literature",
    code: "LIT-001",
    classes: ["S5 B", "S6 B"],
    teacherName: "Mr. Jean Baptiste Uwimana",
    numberOfStudents: 26,
    passingRate: 87,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-020",
    name: "Technical Drawing",
    code: "TD-001",
    classes: ["S4 B", "S5 B"],
    teacherName: "Mr. David Habimana",
    numberOfStudents: 19,
    passingRate: 91,
    status: "Active",
    updatedAt: getRandomDate()
  },
  // A few inactive subjects
  {
    id: "subj-021",
    name: "Latin",
    code: "LAT-001",
    classes: ["S6 A"],
    teacherName: "Ms. Agnes Nyirahabimana",
    numberOfStudents: 8,
    passingRate: 75,
    status: "Inactive",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-022",
    name: "Traditional Dance",
    code: "DANCE-001",
    classes: ["P2 B"],
    teacherName: "Mr. Eric Ndayisaba",
    numberOfStudents: 15,
    passingRate: 88,
    status: "Inactive",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-023",
    name: "Home Economics",
    code: "HE-001",
    classes: ["S2 A"],
    teacherName: "Ms. Josephine Mukarugwiza",
    numberOfStudents: 12,
    passingRate: 82,
    status: "Inactive",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-024",
    name: "Advanced Mathematics",
    code: "AMATH-001",
    classes: ["S6 A", "S6 B"],
    teacherName: "Mr. Innocent Nzeyimana",
    numberOfStudents: 18,
    passingRate: 93,
    status: "Active",
    updatedAt: getRandomDate()
  },
  {
    id: "subj-025",
    name: "Environmental Science",
    code: "ENV-001",
    classes: ["S3 A", "S4 A"],
    teacherName: "Ms. Beatrice Nyiramana",
    numberOfStudents: 37,
    passingRate: 85,
    status: "Active",
    updatedAt: getRandomDate()
  }
];