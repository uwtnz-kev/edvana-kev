import React, { useState } from 'react';
import { X, Download, Calendar, BookOpen, GraduationCap, User, Star, FileText, File, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EdvanaBankPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    type: 'Exam' | 'Resource';
    subject: string;
    grade: string;
    combination?: string;
    publishedDate: string;
    author: string;
    description: string;
    tags: string[];
    downloadCount: number;
    rating: number;
  } | null;
}

interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'essay' | 'short-answer';
  points: number;
  options?: string[];
}

export function EdvanaBankPreviewModal({ isOpen, onClose, item }: EdvanaBankPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'content'>('overview');

  if (!isOpen || !item) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getGradeCombination = () => {
    if (item.combination) {
      return `${item.grade} ${item.combination}`;
    }
    return item.grade;
  };

  // Mock exam questions based on subject and grade
  const generateMockQuestions = (): Question[] => {
    const subjectQuestions: { [key: string]: Question[] } = {
      'Physics': [
        {
          id: 1,
          question: "A ball is thrown vertically upward with an initial velocity of 20 m/s. Calculate the maximum height reached by the ball. (Take g = 10 m/s²)",
          type: 'short-answer',
          points: 10
        },
        {
          id: 2,
          question: "Which of the following statements about Newton's First Law of Motion is correct?",
          type: 'multiple-choice',
          points: 5,
          options: [
            "An object at rest will remain at rest unless acted upon by an unbalanced force",
            "Force equals mass times acceleration",
            "For every action, there is an equal and opposite reaction",
            "Energy cannot be created or destroyed"
          ]
        },
        {
          id: 3,
          question: "Explain the concept of electromagnetic induction and provide two practical applications.",
          type: 'essay',
          points: 15
        }
      ],
      'Mathematics': [
        {
          id: 1,
          question: "Find the derivative of f(x) = 3x³ - 2x² + 5x - 7",
          type: 'short-answer',
          points: 8
        },
        {
          id: 2,
          question: "What is the value of ∫(2x + 3)dx from x = 0 to x = 2?",
          type: 'multiple-choice',
          points: 6,
          options: ["8", "10", "12", "14"]
        },
        {
          id: 3,
          question: "Prove that the sum of angles in a triangle equals 180 degrees using coordinate geometry.",
          type: 'essay',
          points: 12
        }
      ],
      'Chemistry': [
        {
          id: 1,
          question: "Balance the following chemical equation: C₂H₆ + O₂ → CO₂ + H₂O",
          type: 'short-answer',
          points: 8
        },
        {
          id: 2,
          question: "Which functional group is present in alcohols?",
          type: 'multiple-choice',
          points: 4,
          options: ["-OH (hydroxyl)", "-COOH (carboxyl)", "-CHO (aldehyde)", "-NH₂ (amino)"]
        },
        {
          id: 3,
          question: "Describe the mechanism of electrophilic aromatic substitution with benzene.",
          type: 'essay',
          points: 18
        }
      ],
      'default': [
        {
          id: 1,
          question: `Sample question for ${item.subject} - ${item.grade}`,
          type: 'short-answer',
          points: 10
        },
        {
          id: 2,
          question: "Multiple choice question example",
          type: 'multiple-choice',
          points: 5,
          options: ["Option A", "Option B", "Option C", "Option D"]
        }
      ]
    };

    return subjectQuestions[item.subject] || subjectQuestions['default'];
  };

  const mockQuestions = generateMockQuestions();

  const renderExamContent = () => (
    <div className="space-y-6">
      {/* Exam Overview */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-900/60">Duration:</span>
            <span className="ml-2 text-blue-900 font-medium">3 hours</span>
          </div>
          <div>
            <span className="text-blue-900/60">Total Points:</span>
            <span className="ml-2 text-blue-900 font-medium">
              {mockQuestions.reduce((sum, q) => sum + q.points, 0)} points
            </span>
          </div>
          <div>
            <span className="text-blue-900/60">Questions:</span>
            <span className="ml-2 text-blue-900 font-medium">{mockQuestions.length} questions</span>
          </div>
          <div>
            <span className="text-blue-900/60">Format:</span>
            <span className="ml-2 text-blue-900 font-medium">Mixed (MCQ + Essays)</span>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div>
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Sample Questions</h3>
        <div className="space-y-4">
          {mockQuestions.map((question) => (
            <div key={question.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-900">Q{question.id}</span>
                  <Badge variant="outline" className="border-white/20 text-blue-900/60 text-xs">
                    {question.type.replace('-', ' ')}
                  </Badge>
                </div>
                <span className="text-sm text-blue-900/70">{question.points} pts</span>
              </div>
              
              <p className="text-blue-900 mb-3">{question.question}</p>
              
              {question.options && (
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-blue-900/80">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResourceContent = () => (
    <div className="space-y-6">
      {/* Resource Info */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-900/60">File Type:</span>
            <span className="ml-2 text-blue-900 font-medium">PDF Document</span>
          </div>
          <div>
            <span className="text-blue-900/60">File Size:</span>
            <span className="ml-2 text-blue-900 font-medium">2.4 MB</span>
          </div>
          <div>
            <span className="text-blue-900/60">Pages:</span>
            <span className="ml-2 text-blue-900 font-medium">24 pages</span>
          </div>
          <div>
            <span className="text-blue-900/60">Language:</span>
            <span className="ml-2 text-blue-900 font-medium">English</span>
          </div>
        </div>
      </div>

      {/* PDF Preview Placeholder */}
      <div>
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Document Preview</h3>
        <div className="bg-white/5 rounded-xl p-8 border border-white/10">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-32 bg-white/10 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center">
              <FileText className="w-8 h-8 text-blue-900/50 mb-2" />
              <div className="text-xs text-blue-900/60">PDF</div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-blue-900">Preview not available</h4>
              <p className="text-sm text-blue-900/70 max-w-md">
                This resource contains {item.subject} materials for {getGradeCombination()} students. 
                Download the full document to access all content including diagrams, exercises, and detailed explanations.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-blue-900/60">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>High-quality content</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Recently updated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Outline */}
      <div>
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Content Outline</h3>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <ul className="space-y-2 text-sm text-blue-900">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 flex-shrink-0"></span>
              <span>Introduction to {item.subject} concepts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 flex-shrink-0"></span>
              <span>Theoretical framework and key principles</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 flex-shrink-0"></span>
              <span>Practical examples and case studies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 flex-shrink-0"></span>
              <span>Practice exercises and solutions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 flex-shrink-0"></span>
              <span>Additional resources and references</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-blue-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Badge 
              variant="secondary" 
              className={`${item.type === 'Exam' ? 'bg-red-100/20 text-red-700' : 'bg-blue-100/20 text-blue-700'}`}
            >
              {item.type}
            </Badge>
            <h2 className="text-xl font-semibold text-blue-900">Preview</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-white/20 text-blue-900"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Basic Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">{item.title}</h1>
            <p className="text-blue-900/70 mb-4">{item.description}</p>
            
            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-blue-900/70">
                <BookOpen className="w-4 h-4" />
                <span>{item.subject}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-900/70">
                <GraduationCap className="w-4 h-4" />
                <span>{getGradeCombination()}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-900/70">
                <User className="w-4 h-4" />
                <span>{item.author}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-900/70">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(item.publishedDate)}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex bg-white/10 rounded-xl p-1 w-fit">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'overview'
                    ? 'bg-brand-accent text-white shadow-lg'
                    : 'text-blue-900 hover:bg-white/20'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'content'
                    ? 'bg-brand-accent text-white shadow-lg'
                    : 'text-blue-900 hover:bg-white/20'
                }`}
              >
                {item.type === 'Exam' ? 'Questions' : 'Content'}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                  <div className="flex items-center gap-2 text-blue-900/70 justify-center mb-1">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{item.downloadCount}</div>
                  <div className="text-sm text-blue-900/70">Downloads</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                  <div className="flex items-center gap-2 text-blue-900/70 justify-center mb-1">
                    <Star className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{item.rating}</div>
                  <div className="text-sm text-blue-900/70">Rating</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                  <div className="flex items-center gap-2 text-blue-900/70 justify-center mb-1">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{item.type}</div>
                  <div className="text-sm text-blue-900/70">Type</div>
                </div>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div>
                  <h3 className="font-medium text-blue-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="border-white/20 text-blue-900/70"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            item.type === 'Exam' ? renderExamContent() : renderResourceContent()
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-white/10">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-white/10 border-white/20 text-blue-900 hover:bg-white/20"
          >
            Close
          </Button>
          <Button
            className="flex-1 bg-brand-accent hover:bg-brand-accent/80 text-white"
            disabled
          >
            <Download className="w-4 h-4 mr-2" />
            Download {item.type}
          </Button>
        </div>
      </div>
    </div>
  );
}