import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Home,
  Search,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";

export default function EdvanaNotFound() {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [floatingElements, setFloatingElements] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setFloatingElements(elements);

    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-brown to-brand-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute glass-effect rounded-full opacity-20 animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: Math.random() * 80 + 20 + "px",
              height: Math.random() * 80 + 20 + "px",
              animationDelay: `${element.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Decorative Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 glass-brand-accent rounded-full w-32 h-32 opacity-30 animate-bounce" />
        <div className="absolute top-32 right-20 glass-brand-teal rounded-lg w-24 h-24 opacity-25 animate-pulse" />
        <div className="absolute bottom-20 left-1/4 glass-brand-primary rounded-full w-40 h-40 opacity-20 animate-bounce" />
        <div className="absolute bottom-32 right-1/3 glass-effect rounded-lg w-28 h-28 opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div
          className={cn(
            "text-center max-w-2xl mx-auto transition-all duration-1000 transform",
            isAnimating
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          )}
        >
          {/* 404 Header */}
          <div className="mb-8 relative">
            <div className="glass-dashboard rounded-3xl p-8 mb-6 relative overflow-hidden">
              <div className="absolute inset-0 glass-brand-accent opacity-10 animate-pulse rounded-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <AlertTriangle
                    className="text-brand-accent animate-bounce"
                    size={48}
                  />
                  <span className="text-8xl md:text-9xl font-bold text-white tracking-wider">
                    4<span className="text-brand-accent animate-pulse">0</span>4
                  </span>
                  <Search
                    className="text-brand-teal animate-bounce"
                    size={48}
                  />
                </div>
                <div className="w-32 h-1 bg-gradient-to-r from-brand-accent to-brand-teal mx-auto rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div
            className={cn(
              "glass-card rounded-2xl p-8 transition-all duration-1000 transform",
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            )}
            style={{ transitionDelay: "0.3s" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-white/80 mb-6 leading-relaxed">
              The page you're looking for seems to have vanished into the
              digital void. Don't worry, even the best explorers sometimes take
              a wrong turn!
            </p>
            <div className="glass-effect rounded-xl p-4 mb-8">
              <p className="text-white/70 text-sm">
                <strong className="text-brand-accent">Edvana Tip:</strong> Use
                the navigation to explore our educational platform or return to
                discover amazing learning tools.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center mt-8 transition-all duration-1000 transform",
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            )}
            style={{ transitionDelay: "0.6s" }}
          >
            <Button
              onClick={handleGoHome}
              className="glass-brand-accent px-8 py-4 rounded-xl text-white font-semibold text-lg glass-transition glass-hover border-0 group"
            >
              <Home className="mr-3 h-5 w-5 group-hover:animate-bounce" />
              Back to Home
            </Button>
            <Button
              onClick={handleGoBack}
              className="glass-effect px-8 py-4 rounded-xl text-white font-semibold text-lg glass-transition glass-hover border-0 group"
            >
              <ArrowLeft className="mr-3 h-5 w-5 group-hover:animate-bounce" />
              Go Back
            </Button>
          </div>

          {/* Refresh */}
          <div
            className={cn(
              "mt-8 transition-all duration-1000 transform flex justify-center",
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            )}
            style={{ transitionDelay: "0.9s" }}
          >
            <button
              onClick={() => window.location.reload()}
              className="glass-button inline-flex items-center px-6 py-3 rounded-lg text-white/80 hover:text-white glass-transition border-0 group text-sm"
            >
              <RefreshCw className="mr-2 h-4 w-4 group-hover:animate-spin" />
              Try Refreshing
            </button>
          </div>
        </div>
      </div>

      {/* Footer Dots */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.3}s`, animationDuration: "2s" }}
          />
        ))}
      </div>
    </div>
  );
}
