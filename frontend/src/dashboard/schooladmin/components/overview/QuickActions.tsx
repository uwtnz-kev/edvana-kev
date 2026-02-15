import { UserPlus, Users, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuickActions() {
  const handleAddTeacher = () => {
    console.log("Add Teacher clicked");
    // Navigate to add teacher form
  };

  const handleAddClass = () => {
    console.log("Add Class clicked");
    // Navigate to add class form
  };

  const handleAddSubject = () => {
    console.log("Add Subject clicked");
    // Navigate to add subject form
  };

  return (
    <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Quick Actions</h3>
          <p className="text-sm text-black/60 mt-1">Common tasks and shortcuts</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={handleAddTeacher}
            className="flex flex-col items-center gap-3 h-auto p-6 bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 text-brand-accent hover:text-brand-accent transition-all"
            variant="outline"
          >
            <UserPlus className="h-8 w-8" />
            <div className="text-center">
              <p className="font-medium">Add Teacher</p>
              <p className="text-xs opacity-80">Register new faculty</p>
            </div>
          </Button>
          
          <Button
            onClick={handleAddClass}
            className="flex flex-col items-center gap-3 h-auto p-6 bg-brand-teal/10 hover:bg-brand-teal/20 border border-brand-teal/20 text-brand-teal hover:text-brand-teal transition-all"
            variant="outline"
          >
            <Users className="h-8 w-8" />
            <div className="text-center">
              <p className="font-medium">Add Class</p>
              <p className="text-xs opacity-80">Create new class</p>
            </div>
          </Button>
          
          <Button
            onClick={handleAddSubject}
            className="flex flex-col items-center gap-3 h-auto p-6 bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/20 text-brand-primary hover:text-brand-primary transition-all"
            variant="outline"
          >
            <BookOpen className="h-8 w-8" />
            <div className="text-center">
              <p className="font-medium">Add Subject</p>
              <p className="text-xs opacity-80">Setup curriculum</p>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
}