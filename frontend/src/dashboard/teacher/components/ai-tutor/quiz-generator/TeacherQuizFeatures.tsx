import { Sparkles, ClipboardCheck, Users } from "lucide-react";

function FeatureCard({
  icon,
  title,
  desc,
  bullets,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets: string[];
  iconBg: string;
}) {
  return (
    <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B6F52]/25 hover:-translate-y-1">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${iconBg}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-white font-semibold text-base group-hover:text-white transition-colors duration-300">{title}</h3>
          <p className="text-white/60 text-sm">{desc}</p>
        </div>
      </div>

      <ul className="space-y-1 text-white/60 text-sm pl-5 list-disc">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function TeacherQuizFeatures() {
  return (
    <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:shadow-xl hover:shadow-[#8B6F52]/20 transition-all duration-300">
      <h2 className="text-xl font-bold text-white mb-6 group-hover:text-white transition-colors duration-300">
        Quiz Generator Features
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FeatureCard
          icon={<Sparkles className="h-5 w-5 text-white" />}
          title="Fast Drafting"
          desc="Generate draft questions from any topic and adjust difficulty."
          bullets={[
            "Topic based generation",
            "MCQ, open, or mixed",
            "Difficulty adjustment",
          ]}
          iconBg="bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80"
        />

        <FeatureCard
          icon={<ClipboardCheck className="h-5 w-5 text-white" />}
          title="Teacher Controls"
          desc="Edit questions and prepare answer keys."
          bullets={[
            "Edit before publishing",
            "Answer key placeholders",
            "Reusable templates",
          ]}
          iconBg="bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80"
        />

        <FeatureCard
          icon={<Users className="h-5 w-5 text-white" />}
          title="Class Publishing"
          desc="Send quizzes to classes and track progress."
          bullets={[
            "Publish to classes",
            "Track submissions",
            "Quick duplicate",
          ]}
          iconBg="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>
    </div>
  );
}
