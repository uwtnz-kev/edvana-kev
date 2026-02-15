import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from "@/components/ui/card";

interface PerformanceChartProps {
  title: string;
}

const mockData = [
  { month: 'Jan', students: 120, teachers: 15, performance: 85 },
  { month: 'Feb', students: 135, teachers: 16, performance: 88 },
  { month: 'Mar', students: 142, teachers: 18, performance: 91 },
  { month: 'Apr', students: 155, teachers: 19, performance: 87 },
  { month: 'May', students: 168, teachers: 20, performance: 93 },
  { month: 'Jun', students: 175, teachers: 22, performance: 89 }
];

export default function PerformanceChart({ title }: PerformanceChartProps) {
  return (
    <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
          <p className="text-sm text-black/60 mt-1">Monthly overview of school metrics</p>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#1e3a8a' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#1e3a8a' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="performance" 
                fill="hsl(172, 69%, 41%)"
                radius={[4, 4, 0, 0]}
                name="Performance %"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}