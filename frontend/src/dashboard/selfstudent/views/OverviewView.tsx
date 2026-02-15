import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import { Badge } from '../../../components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  Star
} from 'lucide-react';

export function OverviewView() {
  // Mock data - in a real app, this would come from API
  const currentCourses = [
    {
      id: 1,
      title: 'Mathematics - Primary 4',
      progress: 75,
      nextLesson: 'Multiplication Tables',
      dueDate: '2025-01-15',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Kinyarwanda Language',
      progress: 60,
      nextLesson: 'Reading Comprehension',
      dueDate: '2025-01-12',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Science & Technology',
      progress: 90,
      nextLesson: 'Final Assessment',
      dueDate: '2025-01-20',
      status: 'almost-complete'
    }
  ];

  const upcomingAssessments = [
    {
      id: 1,
      title: 'Mathematics Quiz 3',
      subject: 'Mathematics',
      date: '2025-01-10',
      duration: '30 minutes',
      type: 'quiz'
    },
    {
      id: 2,
      title: 'Science Project Presentation',
      subject: 'Science',
      date: '2025-01-15',
      duration: '45 minutes',
      type: 'presentation'
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: 'Perfect Score',
      description: 'Scored 100% on Kinyarwanda Quiz',
      date: '2025-01-05',
      icon: '🏆'
    },
    {
      id: 2,
      title: 'Study Streak',
      description: '20 days consecutive learning',
      date: '2025-01-03',
      icon: '🔥'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="glass-card-elevated p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Welcome back, Student! 👋
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              You're making great progress. Keep up the excellent work!
            </p>
          </div>
          <div className="sm:hidden md:block">
            <div className="text-left sm:text-right">
              <div className="text-sm text-gray-500">Today's Goal</div>
              <div className="text-base sm:text-lg font-semibold text-brand-teal">2 lessons completed ✓</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="glass-card-interactive">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <BookOpen className="h-6 sm:h-8 w-6 sm:w-8 text-brand-teal flex-shrink-0" />
              <div className="ml-2 sm:ml-4 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Courses</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-interactive">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <Clock className="h-6 sm:h-8 w-6 sm:w-8 text-brand-accent flex-shrink-0" />
              <div className="ml-2 sm:ml-4 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Study Time</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">24h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-interactive">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <Trophy className="h-6 sm:h-8 w-6 sm:w-8 text-brand-brown flex-shrink-0" />
              <div className="ml-2 sm:ml-4 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Achievements</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-interactive">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center">
              <TrendingUp className="h-6 sm:h-8 w-6 sm:w-8 text-brand-teal flex-shrink-0" />
              <div className="ml-2 sm:ml-4 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Avg Score</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Current Courses */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-brand-teal" />
              Continue Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {currentCourses.map((course) => (
              <div key={course.id} className="glass-card p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base truncate">{course.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                      <PlayCircle className="h-3 sm:h-4 w-3 sm:w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">Next: {course.nextLesson}</span>
                    </p>
                  </div>
                  <Badge variant={course.status === 'almost-complete' ? 'default' : 'secondary'} className="self-start sm:ml-2">
                    {course.progress}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Due </span>{course.dueDate}
                    </span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full mt-3 bg-brand-teal/80 hover:bg-brand-teal text-white text-xs sm:text-sm"
                >
                  Continue Learning
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Assessments */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-brand-accent" />
              Upcoming Assessments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {upcomingAssessments.map((assessment) => (
              <div key={assessment.id} className="glass-card p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-2 sm:space-y-0">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{assessment.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{assessment.subject}</p>
                  </div>
                  <Badge variant="outline" className="self-start sm:ml-2 text-xs">
                    {assessment.type}
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 space-y-1 sm:space-y-0">
                  <span className="flex items-center">
                    <Calendar className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                    {assessment.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                    {assessment.duration}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full mt-3 glass-button-secondary text-xs sm:text-sm"
                >
                  Prepare
                </Button>
              </div>
            ))}
            
            <Button variant="ghost" className="w-full text-brand-teal">
              View All Assessments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="glass-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-brand-brown" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center glass-card p-3 sm:p-4">
                <div className="text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">{achievement.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{achievement.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                </div>
                <CheckCircle2 className="h-4 sm:h-5 w-4 sm:w-5 text-brand-teal flex-shrink-0" />
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-brand-teal">
            View All Achievements
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}