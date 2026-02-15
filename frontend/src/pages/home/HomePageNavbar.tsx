import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap, UserPlus, Building2, UserPlus2 } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  DropdownButton,
  DropdownOption,
} from "@/components/ui/dropdown-button";

export function HomePageNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#contact", label: "Contact" },
  ];

  //Drop Down button
  const signUpOptions: DropdownOption[] = [
    {
      label: "School Inquiry",
      value: "school-inquiry",
      icon: <Building2 className="h-4 w-4 text-white" />,
      className: 'text-white hover:text-white hover:bg-white/10',
      onClick: () => (window.location.href = "/school-inquiry"),
    },
    {
      label: "Student Sign Up",
      value: "student-signup",
      icon: <UserPlus className="h-4 w-4 text-white" />,
      onClick: () => (window.location.href = "/selfstudent/student-signup"),
      
    },
        {
      label: "Teacher Sign Up",
      value: "teacher-signup",
      icon: <UserPlus2 className="h-4 w-4 text-white" />,
      onClick: () => (window.location.href = "/selfteacher/teacher-signup"),
      
    },
  ];

  return (
    <nav
      className={cn(
        "fixed z-50 glass-transition duration-300",
        isScrolled
          ? "top-4 left-4 right-4 glass-navbar py-2.5 rounded-xl" // reduced by 20%
          : "top-0 left-0 right-0 bg-transparent py-6"
      )}
    >
      <div
        className={cn("mx-auto px-6", isScrolled ? "max-w-7xl" : "container")}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 glass-brand-accent rounded-full flex items-center justify-center">
              <GraduationCap className="text-white" size={18} />
            </div>
            <h1 className="text-xl font-bold text-white">Edvana</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white glass-transition text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a href="/login">
              <Button className="glass-button px-4 py-2 rounded-lg text-white hover:bg-white/20 glass-transition border-0 text-sm">
                Login
              </Button>
            </a>

            <DropdownButton
              variant="accent"
              size="default"
              options={signUpOptions}
              placeholder="Sign Up"
              className="h-10 glass-buttonNC text-white bg-brand-accent hover:bg-brand-accent/20 glass-transition border-0 text-sm"
            />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden glass-effect p-2 rounded-lg text-white border-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-card rounded-xl p-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-white/80 hover:text-white glass-transition py-2 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="/login">
              <Button className="glass-button w-full py-2 text-white hover:bg-white/20 glass-transition border-0 mt-3 text-sm">
                Login
              </Button>
            </a>
            <DropdownButton
              variant="accent"
              size="default"
              options={signUpOptions}
              placeholder="Sign Up"
              className="glass-buttonNC w-full text-white bg-brand-accent hover:bg-brand-accent/50 glass-transition border-0 mt-2 text-sm"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
