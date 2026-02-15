export interface EdvanaBankItem {
  id: string;
  title: string;
  type: 'exam' | 'resource';
  subject: string;
  gradeId: string;
  combinationId?: string;
  subGradeId?: string;
  createdAt: string;
  author: string;
  description: string;
  tags: string[];
  downloads: number;
  rating: number;
  fileSize?: string;
  pages?: number;
  duration?: number; // in minutes for exams
}

export const edvanaBankData: EdvanaBankItem[] = [
  {
    id: 'eb001',
    title: 'S6 Physics National Exam - 2023',
    type: 'exam',
    subject: 'Physics',
    gradeId: 'S6',
    combinationId: 'MCB',
    createdAt: '2023-12-15T10:00:00Z',
    author: 'National Examination Board',
    description: 'Comprehensive national examination for S6 Physics students covering mechanics, thermodynamics, waves, and modern physics.',
    tags: ['Physics', 'National Exam', 'S6', 'MCB', 'Final Exam'],
    downloads: 324,
    rating: 4.9,
    duration: 180
  },
  {
    id: 'eb002',
    title: 'Chemistry Organic Compounds Study Guide',
    type: 'resource',
    subject: 'Chemistry',
    gradeId: 'S5',
    combinationId: 'PCM',
    createdAt: '2023-11-20T14:30:00Z',
    author: 'Dr. Marie Uwimana',
    description: 'Comprehensive study guide covering organic chemistry fundamentals, reaction mechanisms, and nomenclature for S5 PCM students.',
    tags: ['Chemistry', 'Organic', 'S5', 'PCM', 'Study Guide'],
    downloads: 198,
    rating: 4.7,
    fileSize: '3.2 MB',
    pages: 42
  },
  {
    id: 'eb003',
    title: 'Mathematics Calculus Final Assessment',
    type: 'exam',
    subject: 'Mathematics',
    gradeId: 'S6',
    combinationId: 'PCM',
    createdAt: '2023-10-05T09:15:00Z',
    author: 'Rwanda Education Board',
    description: 'Final examination covering differential and integral calculus, limits, and applications for S6 PCM students.',
    tags: ['Mathematics', 'Calculus', 'S6', 'PCM', 'Assessment'],
    downloads: 276,
    rating: 4.8,
    duration: 150
  },
  {
    id: 'eb004',
    title: 'Biology Genetics Interactive Resource Pack',
    type: 'resource',
    subject: 'Biology',
    gradeId: 'S5',
    combinationId: 'MCB',
    createdAt: '2023-09-12T16:45:00Z',
    author: 'Prof. Jean Habimana',
    description: 'Interactive resource pack covering genetics, heredity, DNA structure, and molecular biology concepts with practice exercises.',
    tags: ['Biology', 'Genetics', 'S5', 'MCB', 'Interactive'],
    downloads: 167,
    rating: 4.6,
    fileSize: '5.8 MB',
    pages: 68
  },
  {
    id: 'eb005',
    title: 'History of Rwanda Midterm Exam',
    type: 'exam',
    subject: 'History',
    gradeId: 'S4',
    subGradeId: 'S4A',
    createdAt: '2023-08-28T11:20:00Z',
    author: 'Ministry of Education',
    description: 'Midterm examination covering Rwandan history from pre-colonial era through independence and modern development.',
    tags: ['History', 'Rwanda', 'S4', 'Midterm', 'Culture'],
    downloads: 203,
    rating: 4.5,
    duration: 120
  },
  {
    id: 'eb006',
    title: 'English Literature Analysis Workbook',
    type: 'resource',
    subject: 'English',
    gradeId: 'S5',
    combinationId: 'HEG',
    createdAt: '2023-07-15T13:10:00Z',
    author: 'Ms. Grace Mukamana',
    description: 'Comprehensive workbook for literary analysis techniques with focus on African literature and poetry interpretation.',
    tags: ['English', 'Literature', 'S5', 'HEG', 'Analysis'],
    downloads: 142,
    rating: 4.4,
    fileSize: '2.1 MB',
    pages: 38
  },
  {
    id: 'eb007',
    title: 'Economics Market Structures Quiz',
    type: 'exam',
    subject: 'Economics',
    gradeId: 'S6',
    combinationId: 'Commerce',
    createdAt: '2023-06-30T08:40:00Z',
    author: 'Mr. Patrick Nzeyimana',
    description: 'Assessment quiz on market structures, competition types, and economic analysis for S6 Commerce students.',
    tags: ['Economics', 'Markets', 'S6', 'Commerce', 'Quiz'],
    downloads: 189,
    rating: 4.6,
    duration: 90
  },
  {
    id: 'eb008',
    title: 'Geography Climate Change Project Guide',
    type: 'resource',
    subject: 'Geography',
    gradeId: 'S3',
    subGradeId: 'S3B',
    createdAt: '2023-05-22T15:25:00Z',
    author: 'Dr. Alice Mutagoma',
    description: 'Project-based learning resource focusing on climate change impacts in East Africa with research methodologies.',
    tags: ['Geography', 'Climate', 'S3', 'Project', 'Environment'],
    downloads: 134,
    rating: 4.3,
    fileSize: '4.7 MB',
    pages: 29
  },
  {
    id: 'eb009',
    title: 'French Grammar Practice Examination',
    type: 'exam',
    subject: 'French',
    gradeId: 'S2',
    subGradeId: 'S2C',
    createdAt: '2023-04-18T12:55:00Z',
    author: 'Mme. Claudine Uwera',
    description: 'Comprehensive French grammar examination covering verb conjugations, sentence structure, and vocabulary for S2 students.',
    tags: ['French', 'Grammar', 'S2', 'Language', 'Practice'],
    downloads: 156,
    rating: 4.2,
    duration: 105
  },
  {
    id: 'eb010',
    title: 'Computer Science Programming Fundamentals',
    type: 'resource',
    subject: 'Computer Science',
    gradeId: 'S4',
    combinationId: 'PCM',
    createdAt: '2023-03-25T10:30:00Z',
    author: 'Mr. Eric Mutabazi',
    description: 'Introduction to programming concepts, algorithms, and data structures with practical examples in Python.',
    tags: ['Computer Science', 'Programming', 'S4', 'PCM', 'Algorithms'],
    downloads: 221,
    rating: 4.7,
    fileSize: '6.3 MB',
    pages: 85
  },
  {
    id: 'eb011',
    title: 'Kinyarwanda Literature Final Exam',
    type: 'exam',
    subject: 'Kinyarwanda',
    gradeId: 'S5',
    combinationId: 'Arts',
    createdAt: '2023-02-14T14:20:00Z',
    author: 'Mwalimu Emmanuel Rwagasana',
    description: 'Final examination on traditional and contemporary Kinyarwanda literature with cultural context analysis.',
    tags: ['Kinyarwanda', 'Literature', 'S5', 'Arts', 'Final'],
    downloads: 267,
    rating: 4.8,
    duration: 180
  },
  {
    id: 'eb012',
    title: 'Art and Design Portfolio Development',
    type: 'resource',
    subject: 'Art',
    gradeId: 'S6',
    combinationId: 'Arts',
    createdAt: '2023-01-20T16:15:00Z',
    author: 'Ms. Olive Nyirahabimana',
    description: 'Complete guide for creating professional art portfolios with techniques, examples, and assessment criteria.',
    tags: ['Art', 'Portfolio', 'S6', 'Arts', 'Design'],
    downloads: 89,
    rating: 4.1,
    fileSize: '8.4 MB',
    pages: 52
  },
  {
    id: 'eb013',
    title: 'Physics Waves and Optics Test',
    type: 'exam',
    subject: 'Physics',
    gradeId: 'S5',
    combinationId: 'PCM',
    createdAt: '2022-12-08T09:45:00Z',
    author: 'Dr. David Mugisha',
    description: 'Unit test covering wave properties, interference, diffraction, and geometric optics for S5 PCM students.',
    tags: ['Physics', 'Waves', 'Optics', 'S5', 'PCM'],
    downloads: 178,
    rating: 4.5,
    duration: 120
  },
  {
    id: 'eb014',
    title: 'Business Studies Entrepreneurship Manual',
    type: 'resource',
    subject: 'Business Studies',
    gradeId: 'S4',
    combinationId: 'Commerce',
    createdAt: '2022-11-15T11:30:00Z',
    author: 'Mrs. Janet Uwimana',
    description: 'Comprehensive manual on entrepreneurship principles, business planning, and startup development for Commerce students.',
    tags: ['Business', 'Entrepreneurship', 'S4', 'Commerce', 'Planning'],
    downloads: 145,
    rating: 4.4,
    fileSize: '3.9 MB',
    pages: 47
  },
  {
    id: 'eb015',
    title: 'Chemistry Acids and Bases Laboratory Assessment',
    type: 'exam',
    subject: 'Chemistry',
    gradeId: 'S4',
    combinationId: 'MCB',
    createdAt: '2022-10-12T13:25:00Z',
    author: 'Prof. Sarah Mukamana',
    description: 'Practical laboratory assessment on acids, bases, pH measurements, and neutralization reactions.',
    tags: ['Chemistry', 'Laboratory', 'Acids', 'Bases', 'S4', 'MCB'],
    downloads: 192,
    rating: 4.6,
    duration: 150
  }
];

// Helper functions for data manipulation
export const getItemsByType = (type: 'exam' | 'resource'): EdvanaBankItem[] => {
  return edvanaBankData.filter(item => item.type === type);
};

export const getItemsBySubject = (subject: string): EdvanaBankItem[] => {
  return edvanaBankData.filter(item => item.subject === subject);
};

export const getItemsByGrade = (gradeId: string): EdvanaBankItem[] => {
  return edvanaBankData.filter(item => item.gradeId === gradeId);
};

export const getItemsByCombination = (combinationId: string): EdvanaBankItem[] => {
  return edvanaBankData.filter(item => item.combinationId === combinationId);
};

export const getItemsBySubGrade = (subGradeId: string): EdvanaBankItem[] => {
  return edvanaBankData.filter(item => item.subGradeId === subGradeId);
};

export const searchItems = (query: string): EdvanaBankItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return edvanaBankData.filter(item =>
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.author.toLowerCase().includes(lowercaseQuery) ||
    item.subject.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getPaginatedItems = (
  items: EdvanaBankItem[],
  page: number,
  itemsPerPage: number
) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / itemsPerPage),
    currentPage: page,
    itemsPerPage
  };
};

export const getFilteredItems = (filters: {
  search?: string;
  type?: string;
  subject?: string;
  grade?: string;
  combination?: string;
  subgrade?: string;
}): EdvanaBankItem[] => {
  let filteredItems = edvanaBankData;

  if (filters.search && filters.search !== '') {
    filteredItems = searchItems(filters.search);
  }

  if (filters.type && filters.type !== 'all') {
    filteredItems = filteredItems.filter(item => item.type === filters.type);
  }

  if (filters.subject && filters.subject !== 'all') {
    filteredItems = filteredItems.filter(item => item.subject === filters.subject);
  }

  if (filters.grade && filters.grade !== 'all') {
    filteredItems = filteredItems.filter(item => item.gradeId === filters.grade);
  }

  if (filters.combination && filters.combination !== 'all') {
    filteredItems = filteredItems.filter(item => item.combinationId === filters.combination);
  }

  if (filters.subgrade && filters.subgrade !== 'all') {
    filteredItems = filteredItems.filter(item => item.subGradeId === filters.subgrade);
  }

  return filteredItems;
};

// Statistics helpers
export const getDataStats = () => {
  const totalItems = edvanaBankData.length;
  const exams = getItemsByType('exam').length;
  const resources = getItemsByType('resource').length;
  const totalDownloads = edvanaBankData.reduce((sum, item) => sum + item.downloads, 0);
  const averageRating = edvanaBankData.reduce((sum, item) => sum + item.rating, 0) / totalItems;

  return {
    totalItems,
    exams,
    resources,
    totalDownloads,
    averageRating: Math.round(averageRating * 10) / 10
  };
};