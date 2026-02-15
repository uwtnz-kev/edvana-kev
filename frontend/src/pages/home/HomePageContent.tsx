import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  MessageSquare, 
  ArrowRight, 
  Play,
  GraduationCap,
  UserCheck,
  Heart,
  Shield
} from 'lucide-react';
import { cn } from '@/utils/cn';

export function HomePageContent() {
  const roles = [
    {
      icon: GraduationCap,
      title: 'Students',
      description: 'Interactive learning, assignments, and progress tracking tailored to Rwanda\'s CBC curriculum.',
      color: 'glass-brand-accent'
    },
    {
      icon: UserCheck,
      title: 'Teachers',
      description: 'Comprehensive tools for lesson planning, student assessment, and classroom management.',
      color: 'glass-brand-teal'
    },
    {
      icon: Heart,
      title: 'Parents',
      description: 'Stay connected with your child\'s educational journey through real-time progress updates.',
      color: 'glass-brand-primary'
    },
    {
      icon: Shield,
      title: 'Administrators',
      description: 'Advanced analytics, user management, and institutional oversight capabilities.',
      color: 'glass-effect'
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'CBC Curriculum Aligned',
      description: 'Fully aligned with Rwanda\'s Competence-Based Curriculum for effective learning outcomes.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards and reports to track student progress and institutional performance.'
    },
    {
      icon: MessageSquare,
      title: 'Collaborative Tools',
      description: 'Seamless communication between students, teachers, parents, and administrators.'
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Customized experiences and permissions for each user type in the educational ecosystem.'
    }
  ];

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Transform Education with{' '}
            <span className="text-brand-accent">Edvana</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
            A modern, role-based educational platform built specifically for Rwanda's CBC curriculum. 
            Empowering students, teachers, parents, and administrators with comprehensive tools for 
            educational excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Button className="glass-brand-accent px-8 py-4 rounded-xl text-white font-semibold text-lg glass-transition glass-hover border-0">
              <ArrowRight className="mr-3 h-5 w-5" />
              Get Started
            </Button>
            <Button className="glass-effect px-8 py-4 rounded-xl text-white font-semibold text-lg glass-transition glass-hover border-0">
              <Play className="mr-3 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Mission Statement Card */}
        <div className="glass-dashboard rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Our Mission</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            To revolutionize education in Rwanda by providing an integrated, technology-driven platform 
            that enhances learning experiences, improves educational outcomes, and fosters collaboration 
            between all stakeholders in the educational ecosystem.
          </p>
        </div>
      </section>

      {/* Roles Section */}
      <section id="features" className="container mx-auto px-6 mb-20">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Built for Every Role</h2>
        <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
          Edvana provides specialized dashboards and tools for each member of the educational community
        </p>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-2 gap-8">
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={index}
                className="glass-card rounded-2xl p-6 glass-transition glass-hover cursor-pointer border-0 h-full"
              >
                <CardContent className="p-0 text-center">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6", role.color)}>
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-4">{role.title}</h4>
                  <p className="text-white/70 leading-relaxed">{role.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 mb-20">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Powerful Features</h2>
        <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
          Everything you need to enhance teaching, learning, and educational management
        </p>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="glass-card rounded-2xl p-8 glass-transition glass-hover border-0"
              >
                <CardContent className="p-0 flex items-start space-x-6">
                  <div className="glass-brand-teal w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                    <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-6 mb-20">
        <div className="glass-dashboard rounded-3xl p-8 md:p-12">
          <h2 className="text-4xl font-bold text-white text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="glass-brand-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Sign Up</h4>
              <p className="text-white/70">Choose your role and create your account to get started with Edvana.</p>
            </div>
            <div className="text-center">
              <div className="glass-brand-teal w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Explore</h4>
              <p className="text-white/70">Access your personalized dashboard with tools designed for your specific role.</p>
            </div>
            <div className="text-center">
              <div className="glass-brand-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Achieve</h4>
              <p className="text-white/70">Collaborate, learn, and track progress to achieve educational excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6">
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Education?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of educators, students, and parents who are already using Edvana to 
            enhance their educational experience.
          </p>
          <Button className="glass-brand-accent px-8 py-4 rounded-xl text-white font-semibold text-lg glass-transition glass-hover border-0">
            <ArrowRight className="mr-3 h-5 w-5" />
            Get Started Today
          </Button>
        </div>
      </section>
    </main>
  );
}