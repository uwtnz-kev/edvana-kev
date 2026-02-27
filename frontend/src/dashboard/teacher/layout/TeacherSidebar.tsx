import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  FileText,
  Bot,
  ClipboardList,
  ClipboardCheck,
  HelpCircle,
  Settings,
  User,
  Sliders,
  Menu,
  X,
  ChevronDown,
  MessageSquare,
  Brain,
  Calendar,
  Award,
  Users,
  /*Package,*/
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Overview", href: "/dashboard/teacher", icon: BarChart3 },
  { label: "Subjects", href: "/dashboard/teacher/subjects", icon: BookOpen },
  { label: "Assignments", href: "/dashboard/teacher/assignments", icon: ClipboardList },
  { label: "Exams", href: "/dashboard/teacher/exams", icon: FileText },
  { label: "Grades", href: "/dashboard/teacher/grades", icon: Award },
  { label: "Attendance", href: "/dashboard/teacher/attendance", icon: ClipboardCheck },
  { label: "Schedule", href: "/dashboard/teacher/schedule", icon: Calendar },
  { label: "Students", href: "/dashboard/teacher/students", icon: Users },
  { label: "Parents", href: "/dashboard/teacher/parents", icon: Users },
  
  {
    label: "AI Tutor",
    href: "/dashboard/teacher/ai-tutor",
    icon: Bot,
    hasDropdown: true,
    subItems: [
      { label: "AI Chatbot", href: "/dashboard/teacher/ai-tutor/chatbot", icon: MessageSquare },
      { label: "Quiz Generator", href: "/dashboard/teacher/ai-tutor/quiz-generator", icon: Brain },
    ],
  },
  /*{ label: "Resources", href: "/dashboard/teacher/resources", icon: Package },*/
  {
    label: "Settings",
    href: "/dashboard/teacher/settings",
    icon: Settings,
    hasDropdown: true,
    subItems: [
      { label: "General Settings", href: "/dashboard/teacher/settings/general", icon: Sliders },
      { label: "Account Settings", href: "/dashboard/teacher/settings/account", icon: User },
    ],
  },
  { label: "Support", href: "/dashboard/teacher/support", icon: HelpCircle },
];

export default function TeacherSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["AI Tutor"]);

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const closeMobile = () => setIsMobileOpen(false);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMobile}
        className="fixed top-20 left-4 z-[100] lg:hidden bg-white/25 backdrop-blur-xl border border-white/30 hover:bg-white/35 hover:border-white/45 text-[#3B240F] rounded-lg shadow-[0_10px_30px_rgba(59,36,15,0.25)]"
      >
        {isMobileOpen ? <X className="h-5 w-5 text-[#3B240F]" /> : <Menu className="h-5 w-5 text-[#3B240F]" />}
      </Button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={cn(
          "fixed lg:static left-0 top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-full bg-white/18 backdrop-blur-xl border-r border-white/25 shadow-[0_18px_50px_rgba(59,36,15,0.25)] transition-all duration-300 z-40 rounded-r-xl lg:rounded-none overflow-hidden",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto max-h-screen">
          <div className="p-4 border-b border-white/25">
            {!isCollapsed ? (
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#3B240F]">
                  My Dashboard
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden lg:flex h-8 w-8 p-0 hover:bg-white/20 text-[#6B4F3A] hover:text-[#3B240F] rounded-lg"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex h-8 w-8 p-0 hover:bg-white/20 text-[#6B4F3A] hover:text-[#3B240F] mx-auto rounded-lg"
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.href ||
                (item.subItems && item.subItems.some((s) => location.pathname === s.href));
              const isExpanded = expandedItems.includes(item.label);

              return (
                <div key={item.href || item.label}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={cn(
                        "flex items-center justify-between w-full gap-3 px-4 py-3 rounded-xl text-[#6B4F3A] hover:text-[#3B240F] transition-all duration-200 group relative",
                        "hover:bg-white/22",
                        isActive &&
                          "bg-white/28 text-[#3B240F] font-medium border border-white/35 shadow-[0_14px_35px_rgba(59,36,15,0.18)]",
                        isCollapsed && "lg:justify-center lg:px-2"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0 transition-colors duration-200",
                            isActive ? "text-[#7A5A3A]" : "text-[#6B4F3A]",
                            "group-hover:text-[#7A5A3A]"
                          )}
                        />
                        {!isCollapsed && (
                          <span className="truncate font-medium">
                            {item.label}
                          </span>
                        )}
                      </div>

                      {!isCollapsed && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isExpanded ? "rotate-180" : "",
                            isActive ? "text-[#7A5A3A]" : "text-[#6B4F3A]"
                          )}
                        />
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={closeMobile}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-[#6B4F3A] hover:text-[#3B240F] transition-all duration-200 group relative",
                        "hover:bg-white/22",
                        isActive &&
                          "bg-white/28 text-[#3B240F] font-medium border border-white/35 shadow-[0_14px_35px_rgba(59,36,15,0.18)]",
                        isCollapsed && "lg:justify-center lg:px-2"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0 transition-colors duration-200",
                          isActive ? "text-[#7A5A3A]" : "text-[#6B4F3A]",
                          "group-hover:text-[#7A5A3A]"
                        )}
                      />
                      {!isCollapsed && (
                        <span className="truncate font-medium">
                          {item.label}
                        </span>
                      )}
                    </NavLink>
                  )}

                  {item.hasDropdown && item.subItems && isExpanded && !isCollapsed && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = location.pathname === subItem.href;

                        return (
                          <NavLink
                            key={subItem.href}
                            to={subItem.href}
                            onClick={closeMobile}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2 rounded-lg text-[#6B4F3A] hover:text-[#3B240F] transition-all duration-200 group relative text-sm",
                              "hover:bg-white/22",
                              isSubActive &&
                                "bg-white/30 text-[#3B240F] font-medium border border-white/35 shadow-[0_12px_28px_rgba(59,36,15,0.16)]"
                            )}
                          >
                            <SubIcon
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-colors duration-200",
                                isSubActive ? "text-[#7A5A3A]" : "text-[#6B4F3A]",
                                "group-hover:text-[#7A5A3A]"
                              )}
                            />
                            <span className="truncate font-medium">
                              {subItem.label}
                            </span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/25">
            {!isCollapsed ? (
              <div className="text-center space-y-1">
                <div className="w-8 h-8 mx-auto bg-gradient-to-br from-[#7A5A3A] to-[#3B240F] rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(59,36,15,0.25)]">
                  <span className="text-[#F8F4E1] text-xs font-bold">E</span>
                </div>
                <p className="text-xs text-[#6B4F3A] font-medium">
                  Edvana Dashboard
                </p>
                <p className="text-xs text-[#6B4F3A]">v1.0.0</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7A5A3A] to-[#3B240F] rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(59,36,15,0.25)]">
                  <span className="text-[#F8F4E1] text-xs font-bold">E</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}