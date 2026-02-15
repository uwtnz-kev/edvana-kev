import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, Mail, Phone } from "lucide-react";

interface TeacherCardProps {
  name: string;
  subject: string;
  email: string;
  phone: string;
  classes: number;
  students: number;
  iconColor?: string;
}

export default function TeacherCard({ 
  name, 
  subject, 
  email, 
  phone, 
  classes, 
  students, 
  iconColor = "from-brand-teal to-brand-accent"
}: TeacherCardProps) {
  return (
    <Card className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${iconColor} rounded-xl flex items-center justify-center shadow-lg`}>
            <UserCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg text-blue-900 font-semibold">{name}</CardTitle>
            <p className="text-sm text-black/70">{subject}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 text-brand-teal mr-2" />
            <span className="text-black/80">{email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 text-brand-teal mr-2" />
            <span className="text-black/80">{phone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-black/70">Classes:</span>
            <span className="font-medium text-blue-900">{classes}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-black/70">Students:</span>
            <span className="font-medium text-blue-900">{students}</span>
          </div>
          <div className="pt-3 border-t border-white/25 flex space-x-2">
            <Button variant="ghost" className="flex-1 hover:backdrop-blur-sm hover:bg-brand-accent/10 rounded-xl text-xs text-brand-accent">
              Edit
            </Button>
            <Button variant="ghost" className="flex-1 hover:backdrop-blur-sm hover:bg-brand-teal/10 rounded-xl text-xs text-brand-teal">
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}