
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookText,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  Menu,
  PlaySquare,
  Upload,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon: Icon, label, isActive, onClick }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
      isActive
        ? "bg-sidebar-primary text-sidebar-primary-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    )}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
);

export function AppSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const navItems = [
    { to: "/", icon: Home, label: "Inicio" },
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/user-stories", icon: BookText, label: "Historias de Usuario" },
    { to: "/test-cases", icon: ClipboardList, label: "Casos de Prueba" },
    { to: "/test-plans", icon: FileText, label: "Planes de Prueba" },
    { to: "/executions", icon: PlaySquare, label: "Ejecuciones" },
    { to: "/reports", icon: BarChart3, label: "Reportes" },
    { to: "/documents", icon: Upload, label: "Documentos" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => isMobile && setIsOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar flex flex-col border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-qa-purple">QA Analyst</h1>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
                onClick={closeSidebar}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
