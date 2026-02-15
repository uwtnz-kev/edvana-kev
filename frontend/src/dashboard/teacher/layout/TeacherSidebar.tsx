import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  FileText,
  Bot,
  ClipboardList,
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
  Package,
  Users,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Overview", href: "/dashboard/teacher", icon: BarChart3 },
  { label: "Subjects", href: "/dashboard/teacher/subjects", icon: BookOpen },
  { label: "Students", href: "/dashboard/teacher/students", icon: Users },
  { label: "Assignments", href: "/dashboard/teacher/assignments", icon: ClipboardList },
  { label: "Exams", href: "/dashboard/teacher/exams", icon: FileText },
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
  { label: "Resources", href: "/dashboard/teacher/resources", icon: Package },
  { label: "Schedule", href: "/dashboard/teacher/schedule", icon: Calendar },
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
        className="fixed top-20 left-4 z-[100] lg:hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-[#FF715B]/20 hover:border-[#FF715B]/40 text-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={cn(
          "fixed lg:static left-0 top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-full bg-white/5 backdrop-blur-lg border-r border-white/10 shadow-xl transition-all duration-300 z-40 rounded-r-xl lg:rounded-none overflow-hidden",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto max-h-screen">
          <div className="p-4 border-b border-white/10">
            {!isCollapsed ? (
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">My Dashboard</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden lg:flex h-8 w-8 p-0 hover:bg-white/10 text-white/60 hover:text-white rounded-lg"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex h-8 w-8 p-0 hover:bg-white/10 text-white/60 hover:text-white mx-auto rounded-lg"
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
                        "flex items-center justify-between w-full gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white transition-all duration-200 group relative",
                        "hover:bg-gradient-to-r hover:from-[#FF715B]/10 hover:to-[#FF715B]/5 hover:shadow-lg hover:shadow-[#FF715B]/10",
                        isActive &&
                          "bg-gradient-to-r from-[#FF715B]/20 to-[#FF715B]/10 text-white font-medium border border-[#FF715B]/30 shadow-lg shadow-[#FF715B]/20",
                        isCollapsed && "lg:justify-center lg:px-2"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0 transition-colors duration-200",
                            isActive ? "text-[#FF715B]" : "text-white/70",
                            "group-hover:text-[#FF715B]"
                          )}
                        />
                        {!isCollapsed && <span className="truncate font-medium">{item.label}</span>}
                      </div>

                      {!isCollapsed && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isExpanded ? "rotate-180" : "",
                            isActive ? "text-[#FF715B]" : "text-white/50"
                          )}
                        />
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={closeMobile}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:text-white transition-all duration-200 group relative",
                        "hover:bg-gradient-to-r hover:from-[#FF715B]/10 hover:to-[#FF715B]/5 hover:shadow-lg hover:shadow-[#FF715B]/10",
                        isActive &&
                          "bg-gradient-to-r from-[#FF715B]/20 to-[#FF715B]/10 text-white font-medium border border-[#FF715B]/30 shadow-lg shadow-[#FF715B]/20",
                        isCollapsed && "lg:justify-center lg:px-2"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0 transition-colors duration-200",
                          isActive ? "text-[#FF715B]" : "text-white/70",
                          "group-hover:text-[#FF715B]"
                        )}
                      />
                      {!isCollapsed && <span className="truncate font-medium">{item.label}</span>}
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
                              "flex items-center gap-3 px-4 py-2 rounded-lg text-white/70 hover:text-white transition-all duration-200 group relative text-sm",
                              "hover:bg-gradient-to-r hover:from-[#1EA896]/10 hover:to-[#1EA896]/5",
                              isSubActive &&
                                "bg-gradient-to-r from-[#1EA896]/20 to-[#1EA896]/10 text-white font-medium border border-[#1EA896]/30 shadow-lg shadow-[#1EA896]/20"
                            )}
                          >
                            <SubIcon
                              className={cn(
                                "h-4 w-4 flex-shrink-0 transition-colors duration-200",
                                isSubActive ? "text-[#1EA896]" : "text-white/60",
                                "group-hover:text-[#1EA896]"
                              )}
                            />
                            <span className="truncate font-medium">{subItem.label}</span>
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            {!isCollapsed ? (
              <div className="text-center space-y-1">
                <div className="w-8 h-8 mx-auto bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xs font-bold">E</span>
                </div>
                <p className="text-xs text-white/60 font-medium">Edvana Dashboard</p>
                <p className="text-xs text-white/40">v1.0.0</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">E</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
