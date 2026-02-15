import { Teacher, TeacherStatus, TeacherSpecialization, TeacherQualification, TeacherRole, ClassAssignment, SubjectAssignment } from './types';

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

const rwandanFirstNames = [
  'Uwimana', 'Mukamana', 'Niyonsenga', 'Uwimpuhwe', 'Mukashema', 'Nzeyimana', 
  'Uwamahoro', 'Mukansanga', 'Niyitegeka', 'Uwizeyimana', 'Mukamusoni', 'Nzayisenga',
  'Uwamutomane', 'Mukamugema', 'Niyonkuru', 'Uwimungu', 'Mukantwari', 'Nzabonimpa',
  'Uwayezu', 'Mukandanga', 'Niyomugabo', 'Uwimukiza', 'Mukamwezi', 'Nzeyemana',
  'Uwamutoma', 'Mukansege', 'Niyomukuru', 'Uwizeza', 'Mukanshyaka', 'Nzabonimana'
];

const rwandanLastNames = [
  'Mukamugaba', 'Niyonkuru', 'Uwizeye', 'Mukansanga', 'Nzeyimana', 'Uwimana',
  'Mukamana', 'Niyonsenga', 'Uwimpuhwe', 'Mukashema', 'Nzayisenga', 'Uwamahoro',
  'Mukamugema', 'Niyitegeka', 'Uwizeyimana', 'Mukamusoni', 'Nzabonimpa', 'Uwamutomane',
  'Mukamwezi', 'Niyomugabo', 'Uwimukiza', 'Mukandanga', 'Nzeyemana', 'Uwamutoma',
  'Mukansege', 'Niyomukuru', 'Uwizeza', 'Mukanshyaka', 'Nzabonimana', 'Uwayezu'
];

const subjects = [
  'MATH-L1', 'ENG-L1', 'KIN-L1', 'SCI-L1', 'SOC-L1', 'MATH-L2', 'ENG-L2', 'KIN-L2',
  'PHYS-U1', 'CHEM-U1', 'BIO-U1', 'HIST-U1', 'GEO-U1', 'LIT-U1', 'ART-P1', 'PE-P1',
  'TECH-U2', 'COMP-U2', 'ECON-U2', 'PSYC-U2'
];

const classes = [
  'P1-A', 'P1-B', 'P2-A', 'P2-B', 'P3-A', 'P3-B', 'P4-A', 'P4-B', 'P5-A', 'P5-B',
  'P6-A', 'P6-B', 'S1-A', 'S1-B', 'S2-A', 'S2-B', 'S3-A', 'S3-B', 'S4-SCI', 'S4-ART',
  'S5-SCI', 'S5-ART', 'S6-SCI', 'S6-ART'
];

const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateClassAssignments = (assignedClasses: string[]): ClassAssignment[] => {
  return assignedClasses.map((classCode, index) => ({
    id: `ca-${Math.random().toString(36).substr(2, 9)}`,
    className: classCode.replace('-', ' ').toUpperCase(),
    level: classCode.startsWith('P') ? `Primary ${classCode.charAt(1)}` : `Senior ${classCode.charAt(1)}`,
    section: classCode.split('-')[1]?.toUpperCase() || 'A',
    isClassTeacher: index === 0 // First class is main class teacher
  }));
};

const generateSubjectAssignments = (assignedSubjects: string[], assignedClasses: string[]): SubjectAssignment[] => {
  const subjectNames = {
    'MATH': 'Mathematics',
    'ENG': 'English Language',
    'KIN': 'Kinyarwanda',
    'SCI': 'Science',
    'SOC': 'Social Studies',
    'PHYS': 'Physics',
    'CHEM': 'Chemistry',
    'BIO': 'Biology',
    'HIST': 'History',
    'GEO': 'Geography',
    'LIT': 'Literature',
    'ART': 'Arts',
    'PE': 'Physical Education',
    'TECH': 'Technology',
    'COMP': 'Computer Science',
    'ECON': 'Economics',
    'PSYC': 'Psychology'
  };

  return assignedSubjects.map(subjectCode => {
    const subjectPrefix = subjectCode.split('-')[0];
    const classesForSubject = getRandomItems(assignedClasses, Math.floor(Math.random() * assignedClasses.length) + 1);
    
    return {
      id: `sa-${Math.random().toString(36).substr(2, 9)}`,
      subjectName: subjectNames[subjectPrefix as keyof typeof subjectNames] || subjectPrefix,
      subjectCode: subjectCode,
      level: classesForSubject[0]?.startsWith('P') ? 'Primary' : 'Secondary',
      classesAssigned: classesForSubject.map(c => c.replace('-', ' ').toUpperCase())
    };
  });
};

export const TEACHERS: Teacher[] = Array.from({ length: 85 }, (_, index) => {
  const firstName = rwandanFirstNames[Math.floor(Math.random() * rwandanFirstNames.length)];
  const lastName = rwandanLastNames[Math.floor(Math.random() * rwandanLastNames.length)];
  const employeeId = `TCH${String(index + 1).padStart(3, '0')}`;
  const experience = Math.floor(Math.random() * 25) + 1;
  const hireYear = 2024 - experience + Math.floor(Math.random() * experience);
  const assignedSubjects = getRandomItems(subjects, Math.floor(Math.random() * 4) + 1);
  const assignedClasses = getRandomItems(classes, Math.floor(Math.random() * 3) + 1);
  
  // Assign roles based on experience and index
  let role: TeacherRole;
  if (index === 0) role = TeacherRole.PRINCIPAL;
  else if (index === 1) role = TeacherRole.VICE_PRINCIPAL;
  else if (index < 4) role = TeacherRole.DEAN;
  else if (index < 8) role = TeacherRole.DEPARTMENT_HEAD;
  else if (index < 15) role = TeacherRole.HEAD_TEACHER;
  else if (index < 25) role = TeacherRole.COORDINATOR;
  else role = TeacherRole.TEACHER;
  
  return {
    id: `teacher-${index + 1}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@schoolname.edu.rw`,
    phone: `+250 ${Math.floor(Math.random() * 900000000) + 700000000}`,
    employeeId,
    specialization: Object.values(TeacherSpecialization)[
      Math.floor(Math.random() * Object.values(TeacherSpecialization).length)
    ],
    qualification: Object.values(TeacherQualification)[
      Math.floor(Math.random() * Object.values(TeacherQualification).length)
    ],
    experience,
    status: index < 3 ? TeacherStatus.ARCHIVED : // 3 archived teachers
            index < 6 ? TeacherStatus.ON_LEAVE : // 3 on leave
            TeacherStatus.ACTIVE,
    subjects: assignedSubjects,
    classes: assignedClasses,
    hireDate: new Date(hireYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    salary: Math.floor(Math.random() * 200000) + 150000, // 150k - 350k RWF
    address: `${Math.floor(Math.random() * 999) + 1} ${['Kacyiru', 'Kimisagara', 'Gikondo', 'Remera', 'Kicukiro', 'Nyamirambo', 'Kimihurura', 'Gisozi'][Math.floor(Math.random() * 8)]}, Kigali`,
    emergencyContact: {
      name: `${rwandanFirstNames[Math.floor(Math.random() * rwandanFirstNames.length)]} ${rwandanLastNames[Math.floor(Math.random() * rwandanLastNames.length)]}`,
      phone: `+250 ${Math.floor(Math.random() * 900000000) + 700000000}`,
      relationship: ['Spouse', 'Parent', 'Sibling', 'Friend'][Math.floor(Math.random() * 4)]
    },
    updatedAt: generateRandomDate(new Date(2024, 0, 1), new Date()),
    role,
    classAssignments: generateClassAssignments(assignedClasses),
    subjectAssignments: generateSubjectAssignments(assignedSubjects, assignedClasses)
  };
});