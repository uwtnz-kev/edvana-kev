import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Shield,
  UserCheck,
  Users,
  GraduationCap,
  FolderOpen,
  UserCog,
  Settings,
  HelpCircle,
  Menu,
  ChevronDown,
  Sliders,
  User,
  Package
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Overview",
    href: "/dashboard/schooladmin",
    icon: BarChart3,
  },
  {
    label: "Roles & Permissions",
    href: "/dashboard/schooladmin/roles",
    icon: Shield,
  },
  {
    label: "Classes",
    href: "/dashboard/schooladmin/classes",
    icon: Users,
  },
  {
    label: "Subjects",
    href: "/dashboard/schooladmin/subjects",
    icon: BookOpen,
  },
  {
    label: "Teachers",
    href: "/dashboard/schooladmin/teachers",
    icon: UserCheck,
  },
  {
    label: "Students",
    href: "/dashboard/schooladmin/students",
    icon: GraduationCap,
  },
  {
    label: "Parents",
    href: "/dashboard/schooladmin/parents",
    icon: UserCog,
  },
  {
    label: "Resources",
    href: "/dashboard/schooladmin/resources",
    icon: FolderOpen,
  },
  {
    label: "Edvana Bank",
    href: "/dashboard/schooladmin/edvana-bank",
    icon: Package,
  },
  {
    label: "Settings",
    href: "/dashboard/schooladmin/settings",
    icon: Settings,
    hasDropdown: true,
    subItems: [
      {
        label: "General Settings",
        href: "/dashboard/schooladmin/settings/general",
        icon: Sliders,
      },
      {
        label: "Account Settings",
        href: "/dashboard/schooladmin/settings/account",
        icon: User,
      },
    ],
  },
  {
    label: "Support",
    href: "/dashboard/schooladmin/support",
    icon: HelpCircle,
  },
];

interface SchoolAdminSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function SchoolAdminSidebar({ isMobileOpen, setIsMobileOpen }: SchoolAdminSidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Settings"]);

  const closeMobile = () => setIsMobileOpen(false);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-blue-900/50 backdrop-blur-sm z-30 lg:hidden"
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
            {!isCollapsed && (
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-blue-900">Admin Dashboard</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden lg:flex h-8 w-8 p-0 hover:backdrop-blur-sm hover:bg-white/20 text-blue-900 hover:text-white rounded-lg"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            )}
            {isCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex h-8 w-8 p-0 hover:backdrop-blur-sm hover:bg-white/20 text-blue-900 hover:text-white mx-auto rounded-lg"
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href ||
                (item.subItems && item.subItems.some(subItem => location.pathname === subItem.href)) ||
                (item.href === "/dashboard/schooladmin/settings" && location.pathname.startsWith("/dashboard/schooladmin/settings"));
              const isExpanded = expandedItems.includes(item.label);

              return (
                <div key={item.href || item.label}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={cn(
                        "flex items-center justify-between w-full gap-3 px-4 py-3 rounded-xl hover:text-white transition-all duration-200 group relative",
                        "hover:backdrop-blur-sm hover:bg-white/20",
                        isActive && "bg-brand-accent/20 font-medium border border-brand-accent/30 shadow-lg shadow-brand-accent/20",
                        isCollapsed && "lg:justify-center lg:px-2"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn(
                          "h-5 w-5 flex-shrink-0 transition-colors duration-200",
                          isActive ? "text-white" : "text-blue-900",
                          "group-hover:text-white"
                        )} />
                        {!isCollapsed && (
                          <span className={cn(
                            "truncate font-medium",
                            isActive ? "text-white" : "text-blue-900",
                            "group-hover:text-white"
                          )}>
                            {item.label}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isExpanded ? "rotate-180" : "",
                          isActive ? "text-white" : "text-blue-900",
                          "group-hover:text-white"
                        )} />
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={closeMobile}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl hover:text-white transition-all duration-200 group relative",
                        "hover:backdrop-blur-sm hover:bg-white/20",
                        isActive && "bg-brand-accent/20 font-medium border border-brand-accent/30 shadow-lg shadow-brand-accent/20",
                        isCollapsed && "lg:justify-center lg:px-2"
                      )}
                    >
                      <Icon className={cn(
                        "h-5 w-5 flex-shrink-0 transition-colors duration-200",
                        isActive ? "text-white" : "text-blue-900",
                        "group-hover:text-white"
                      )} />
                      {!isCollapsed && (
                        <span className={cn(
                          "truncate font-medium",
                          isActive ? "text-white" : "text-blue-900",
                          "group-hover:text-white"
                        )}>
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
                              "flex items-center gap-3 px-4 py-2 rounded-lg hover:text-white transition-all duration-200 group relative text-sm",
                              "hover:backdrop-blur-sm hover:bg-white/20",
                              isSubActive && "bg-brand-teal/20 font-medium border border-brand-teal/30 shadow-lg shadow-brand-teal/20"
                            )}
                          >
                            <SubIcon className={cn(
                              "h-4 w-4 flex-shrink-0 transition-colors duration-200",
                              isSubActive ? "text-white" : "text-blue-900",
                              "group-hover:text-white"
                            )} />
                            <span className={cn(
                              "truncate font-medium",
                              isSubActive ? "text-white" : "text-blue-900",
                              "group-hover:text-white"
                            )}>
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
        </div>
      </aside>
    </>
  );
}