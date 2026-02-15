export interface Resource {
  id: string;
  title: string;
  type: string;
  subject: string;
  grade: string;
  author: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  description: string;
  tags: string[];
}

export const mockBankItems: Resource[] = [
  {
    id: '1',
    title: 'S6 Physics National Exam - 2022',
    type: 'Assessment',
    subject: 'Physics',
    grade: 'S6',
    author: 'National Examination Board',
    uploadDate: '2022-12-15',
    downloads: 234,
    rating: 4.9,
    description: 'Complete national examination for S6 Physics students covering mechanics, thermodynamics, and modern physics.',
    tags: ['Physics', 'National Exam', 'S6', 'MCB', '2022']
  },
  {
    id: '2',
    title: 'Chemistry Organic Compounds - S5 MCB',
    type: 'Study Guide',
    subject: 'Chemistry',
    grade: 'S5',
    author: 'Dr. Marie Uwimana',
    uploadDate: '2023-08-20',
    downloads: 189,
    rating: 4.7,
    description: 'Comprehensive study guide on organic chemistry for S5 MCB students with practice problems.',
    tags: ['Chemistry', 'Organic', 'S5', 'MCB', 'Study Guide']
  },
  {
    id: '3',
    title: 'Mathematics Calculus Final Exam - S6 PCM',
    type: 'Assessment',
    subject: 'Mathematics',
    grade: 'S6',
    author: 'Rwanda Education Board',
    uploadDate: '2023-11-30',
    downloads: 312,
    rating: 4.8,
    description: 'Final examination covering differential and integral calculus for S6 PCM students.',
    tags: ['Mathematics', 'Calculus', 'S6', 'PCM', 'Final Exam']
  },
  {
    id: '4',
    title: 'Biology Genetics Resource Pack - S5',
    type: 'Resource',
    subject: 'Biology',
    grade: 'S5',
    author: 'Prof. Jean Habimana',
    uploadDate: '2023-09-12',
    downloads: 167,
    rating: 4.6,
    description: 'Interactive resource pack covering genetics, heredity, and molecular biology concepts.',
    tags: ['Biology', 'Genetics', 'S5', 'MCB', 'Interactive']
  },
  {
    id: '5',
    title: 'History of Rwanda - S4 National Exam',
    type: 'Assessment',
    subject: 'History',
    grade: 'S4',
    author: 'Ministry of Education',
    uploadDate: '2023-07-25',
    downloads: 298,
    rating: 4.9,
    description: 'Comprehensive examination on Rwandan history from pre-colonial to modern times.',
    tags: ['History', 'Rwanda', 'S4', 'National Exam', 'Culture']
  },
  {
    id: '6',
    title: 'English Literature Analysis - S5 HEG',
    type: 'Resource',
    subject: 'English',
    grade: 'S5',
    author: 'Ms. Grace Mukamana',
    uploadDate: '2023-10-08',
    downloads: 142,
    rating: 4.5,
    description: 'Literary analysis techniques and examples for S5 HEG students studying African literature.',
    tags: ['English', 'Literature', 'S5', 'HEG', 'Analysis']
  },
  {
    id: '7',
    title: 'Economics Market Structures - S6 Commerce',
    type: 'Study Guide',
    subject: 'Economics',
    grade: 'S6',
    author: 'Mr. Patrick Nzeyimana',
    uploadDate: '2023-06-18',
    downloads: 203,
    rating: 4.7,
    description: 'Detailed study guide on market structures, competition, and economic analysis.',
    tags: ['Economics', 'Markets', 'S6', 'Commerce', 'Competition']
  },
  {
    id: '8',
    title: 'Geography Climate Change Project - S5',
    type: 'Resource',
    subject: 'Geography',
    grade: 'S5',
    author: 'Dr. Alice Mutagoma',
    uploadDate: '2023-04-22',
    downloads: 156,
    rating: 4.6,
    description: 'Project-based learning resource on climate change impacts in East Africa.',
    tags: ['Geography', 'Climate', 'S5', 'Project', 'Environment']
  },
  {
    id: '9',
    title: 'French Grammar Practice - S4 Exam',
    type: 'Assessment',
    subject: 'French',
    grade: 'S4',
    author: 'Mme. Claudine Uwera',
    uploadDate: '2023-05-30',
    downloads: 134,
    rating: 4.4,
    description: 'Comprehensive French grammar examination with conjugations and sentence structure.',
    tags: ['French', 'Grammar', 'S4', 'Language', 'Practice']
  },
  {
    id: '10',
    title: 'Computer Science Algorithms - S6 Tech',
    type: 'Resource',
    subject: 'Computer Science',
    grade: 'S6',
    author: 'Mr. Eric Mutabazi',
    uploadDate: '2023-03-15',
    downloads: 178,
    rating: 4.8,
    description: 'Advanced algorithms and data structures for S6 computer science students.',
    tags: ['Computer Science', 'Algorithms', 'S6', 'Programming', 'Data Structures']
  },
  {
    id: '11',
    title: 'Kinyarwanda Literature Exam - S5',
    type: 'Assessment',
    subject: 'Kinyarwanda',
    grade: 'S5',
    author: 'Mwalimu Emmanuel Rwagasana',
    uploadDate: '2023-02-28',
    downloads: 267,
    rating: 4.9,
    description: 'Traditional and modern Kinyarwanda literature examination with cultural context.',
    tags: ['Kinyarwanda', 'Literature', 'S5', 'Culture', 'Traditional']
  },
  {
    id: '12',
    title: 'Art and Design Portfolio Guide - S6',
    type: 'Resource',
    subject: 'Art',
    grade: 'S6',
    author: 'Ms. Olive Nyirahabimana',
    uploadDate: '2023-01-20',
    downloads: 89,
    rating: 4.3,
    description: 'Complete guide for creating art portfolios with techniques and examples.',
    tags: ['Art', 'Portfolio', 'S6', 'Design', 'Creative']
  }
];

export const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Algebra - Complete Study Guide',
    type: 'Study Guide',
    subject: 'Mathematics',
    grade: 'Grade 9',
    author: 'Ms. Sarah Johnson',
    uploadDate: '2024-03-15',
    downloads: 156,
    rating: 4.8,
    description: 'Comprehensive study guide covering basic algebraic concepts, equations, and problem-solving techniques.',
    tags: ['Algebra', 'Math', 'Grade 9', 'Study Guide']
  },
  {
    id: '2',
    title: 'Biology Cell Structure Quiz',
    type: 'Assessment',
    subject: 'Biology',
    grade: 'Grade 10',
    author: 'Dr. Michael Chen',
    uploadDate: '2024-03-14',
    downloads: 89,
    rating: 4.6,
    description: 'Interactive quiz testing knowledge of cell organelles, functions, and cellular processes.',
    tags: ['Biology', 'Cells', 'Quiz', 'Grade 10']
  },
  {
    id: '3',
    title: 'World War II Timeline Worksheet',
    type: 'Worksheet',
    subject: 'History',
    grade: 'Grade 11',
    author: 'Mr. David Wilson',
    uploadDate: '2024-03-13',
    downloads: 234,
    rating: 4.9,
    description: 'Interactive worksheet helping students organize key events and dates from World War II.',
    tags: ['History', 'WWII', 'Timeline', 'Grade 11']
  },
  {
    id: '4',
    title: 'Shakespeare Romeo & Juliet Analysis',
    type: 'Lesson Plan',
    subject: 'English',
    grade: 'Grade 12',
    author: 'Ms. Emily Davis',
    uploadDate: '2024-03-12',
    downloads: 178,
    rating: 4.7,
    description: 'Detailed lesson plan for analyzing themes, characters, and literary devices in Romeo & Juliet.',
    tags: ['English', 'Shakespeare', 'Literature', 'Grade 12']
  },
  {
    id: '5',
    title: 'Physics: Motion and Forces Lab',
    type: 'Lab Activity',
    subject: 'Physics',
    grade: 'Grade 11',
    author: 'Mr. Robert Kim',
    uploadDate: '2024-03-11',
    downloads: 145,
    rating: 4.5,
    description: 'Hands-on laboratory experiment exploring Newton\'s laws of motion and force calculations.',
    tags: ['Physics', 'Motion', 'Forces', 'Lab', 'Grade 11']
  },
  {
    id: '6',
    title: 'Chemical Equations Balancing Practice',
    type: 'Worksheet',
    subject: 'Chemistry',
    grade: 'Grade 10',
    author: 'Ms. Lisa Zhang',
    uploadDate: '2024-03-10',
    downloads: 267,
    rating: 4.8,
    description: 'Practice worksheet with 50+ chemical equations for students to balance with solutions.',
    tags: ['Chemistry', 'Equations', 'Balancing', 'Practice']
  },
  {
    id: '7',
    title: 'French Conversation Starters',
    type: 'Teaching Material',
    subject: 'French',
    grade: 'Grade 9',
    author: 'Mme. Claire Dubois',
    uploadDate: '2024-03-09',
    downloads: 123,
    rating: 4.4,
    description: 'Collection of conversation prompts and vocabulary to improve French speaking skills.',
    tags: ['French', 'Speaking', 'Conversation', 'Vocabulary']
  },
  {
    id: '8',
    title: 'Geometry Theorems Reference Sheet',
    type: 'Reference',
    subject: 'Mathematics',
    grade: 'Grade 10',
    author: 'Mr. Thomas Lee',
    uploadDate: '2024-03-08',
    downloads: 201,
    rating: 4.9,
    description: 'Quick reference guide with all essential geometry theorems, formulas, and proofs.',
    tags: ['Math', 'Geometry', 'Theorems', 'Reference']
  },
  {
    id: '9',
    title: 'Art History Renaissance Period',
    type: 'Presentation',
    subject: 'Art',
    grade: 'Grade 12',
    author: 'Ms. Anna Rodriguez',
    uploadDate: '2024-03-07',
    downloads: 167,
    rating: 4.6,
    description: 'Comprehensive presentation covering Renaissance art, artists, and cultural impact.',
    tags: ['Art', 'Renaissance', 'History', 'Presentation']
  },
  {
    id: '10',
    title: 'Environmental Science Field Study',
    type: 'Project',
    subject: 'Environmental Science',
    grade: 'Grade 11',
    author: 'Dr. James Park',
    uploadDate: '2024-03-06',
    downloads: 134,
    rating: 4.7,
    description: 'Comprehensive field study project examining local ecosystem health and biodiversity.',
    tags: ['Environment', 'Field Study', 'Ecosystem', 'Project']
  },
  {
    id: '11',
    title: 'Spanish Grammar Exercises',
    type: 'Worksheet',
    subject: 'Spanish',
    grade: 'Grade 10',
    author: 'Sr. Carlos Martinez',
    uploadDate: '2024-03-05',
    downloads: 189,
    rating: 4.5,
    description: 'Practice exercises covering verb conjugations, tenses, and sentence structure.',
    tags: ['Spanish', 'Grammar', 'Verbs', 'Practice']
  },
  {
    id: '12',
    title: 'Computer Science Algorithms Guide',
    type: 'Study Guide',
    subject: 'Computer Science',
    grade: 'Grade 12',
    author: 'Ms. Rachel Tech',
    uploadDate: '2024-03-04',
    downloads: 156,
    rating: 4.8,
    description: 'Complete guide to sorting algorithms, search methods, and complexity analysis.',
    tags: ['Computer Science', 'Algorithms', 'Programming', 'Study Guide']
  }
];

export function getFilteredResources(
  resources: Resource[],
  searchQuery: string,
  category: string
): Resource[] {
  return resources.filter(resource => {
    const matchesSearch = searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = category === 'all' ||
      resource.type.toLowerCase().replace(/\s+/g, '-') === category;

    return matchesSearch && matchesCategory;
  });
}

export function getPaginatedResources(
  resources: Resource[],
  page: number,
  itemsPerPage: number
): { resources: Resource[]; totalPages: number } {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResources = resources.slice(startIndex, endIndex);
  const totalPages = Math.ceil(resources.length / itemsPerPage);

  return {
    resources: paginatedResources,
    totalPages
  };
}