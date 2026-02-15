export const CBC_LEVELS = {
  // Pre-Primary
  PP1: 'Pre-Primary 1',
  PP2: 'Pre-Primary 2',
  
  // Primary
  P1: 'Primary 1',
  P2: 'Primary 2',
  P3: 'Primary 3',
  P4: 'Primary 4',
  P5: 'Primary 5',
  P6: 'Primary 6',
  
  // Lower Secondary
  S1: 'Senior 1',
  S2: 'Senior 2',
  S3: 'Senior 3',
  
  // Upper Secondary
  S4: 'Senior 4',
  S5: 'Senior 5',
  S6: 'Senior 6',
} as const;

export const CBC_SUBJECTS = {
  // Core subjects
  MATHEMATICS: 'Mathematics',
  KINYARWANDA: 'Kinyarwanda',
  ENGLISH: 'English',
  FRENCH: 'French',
  SCIENCE: 'Science',
  SOCIAL_STUDIES: 'Social Studies',
  
  // Additional subjects
  ICT: 'ICT',
  ARTS_SPORTS: 'Arts and Sports',
  RELIGIOUS_MORAL: 'Religious and Moral Education',
  
  // Secondary specific
  PHYSICS: 'Physics',
  CHEMISTRY: 'Chemistry',
  BIOLOGY: 'Biology',
  HISTORY: 'History',
  GEOGRAPHY: 'Geography',
  LITERATURE: 'Literature',
  ECONOMICS: 'Economics',
} as const;

export const COMPETENCE_AREAS = {
  LITERACY: 'Literacy and Communication',
  NUMERACY: 'Numeracy and Problem Solving',
  SCIENCE_TECHNOLOGY: 'Science and Technology',
  SOCIAL_STUDIES: 'Social Studies',
  CREATIVE_ARTS: 'Creative and Performing Arts',
  PHYSICAL_EDUCATION: 'Physical Education and Sports',
  LIFE_SKILLS: 'Life Skills and Values',
} as const;

export const ASSESSMENT_TYPES = {
  FORMATIVE: 'Formative Assessment',
  SUMMATIVE: 'Summative Assessment',
  PEER: 'Peer Assessment',
  SELF: 'Self Assessment',
  PROJECT: 'Project-Based Assessment',
} as const;