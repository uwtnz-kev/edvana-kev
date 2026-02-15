import React from 'react';
import { BookOpen, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function QuickActions() {
  const handleEmailSupport = () => {
    window.location.href = 'mailto:support@edvana.com';
  };

  const handleKnowledgeBase = () => {
    // Placeholder action - could open in new tab
    console.log('Knowledge Base clicked');
  };

  const handleLiveChat = () => {
    // Coming soon functionality
    console.log('Live Chat coming soon');
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-teal/20 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-brand-teal" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Quick Actions</h3>
          <p className="text-sm text-blue-900/70">Get help quickly with these options</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Knowledge Base */}
        <Button
          onClick={handleKnowledgeBase}
          variant="outline"
          className="h-auto p-4 bg-white/20 border-white/20 hover:bg-white/30 text-blue-900 hover:text-white rounded-xl flex flex-col items-center gap-2 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
          aria-label="Browse knowledge base articles"
        >
          <BookOpen className="w-6 h-6" />
          <div className="text-center">
            <div className="font-medium">Knowledge Base</div>
            <div className="text-xs opacity-70">Browse help articles</div>
          </div>
          <ExternalLink className="w-3 h-3 opacity-50" />
        </Button>

        {/* Email Support */}
        <Button
          onClick={handleEmailSupport}
          className="h-auto p-4 bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl flex flex-col items-center gap-2 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
          aria-label="Send email to support team"
        >
          <Mail className="w-6 h-6" />
          <div className="text-center">
            <div className="font-medium">Email Support</div>
            <div className="text-xs opacity-90">support@edvana.com</div>
          </div>
        </Button>

        {/* Live Chat */}
        <Button
          onClick={handleLiveChat}
          variant="outline"
          className="h-auto p-4 bg-white/20 border-white/20 hover:bg-white/30 text-blue-900 hover:text-white rounded-xl flex flex-col items-center gap-2 relative focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
          aria-label="Start live chat (coming soon)"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="text-center">
            <div className="font-medium">Live Chat</div>
            <div className="text-xs opacity-70">Instant support</div>
          </div>
          <Badge 
            variant="secondary" 
            className="absolute -top-1 -right-1 text-xs bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            Coming Soon
          </Badge>
        </Button>
      </div>
    </div>
  );
}