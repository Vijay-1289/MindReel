
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sparkles, BookOpen, Plus, LayoutDashboard } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">MindReel</span>
            </Link>
            <nav className="flex items-center gap-6">
              <NavLink to="/dashboard" icon={<LayoutDashboard className="h-4 w-4 mr-1" />} label="Decks" />
              <NavLink to="/create" icon={<Plus className="h-4 w-4 mr-1" />} label="Create" />
            </nav>
          </div>
        </header>
      )}
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isHomePage ? "pt-0" : "container py-6"
      )}>
        <Outlet />
      </main>
      
      {!isHomePage && (
        <footer className="border-t py-4 bg-background">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>MindReel</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Decks</Link>
              <Link to="/create" className="hover:text-foreground transition-colors">Create</Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};

export default Layout;
