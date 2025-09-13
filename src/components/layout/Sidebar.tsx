import { Link, useLocation } from "react-router-dom";
import { Home, Upload, Award, Users, Settings, Code2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Submit Project", href: "/submit", icon: Upload },
    { name: "My Badges", href: "/badges", icon: Award },
    { name: "Reviews", href: "/reviews", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 glass border-r border-glass-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-glass-border">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <Code2 className="w-5 h-5 text-background" />
          </div>
          <span className="text-xl font-bold gradient-text">SkillChain</span>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-glass-border">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/alexjohnson.png" alt="Alex Johnson" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Alex Johnson</p>
            <p className="text-xs text-muted-foreground truncate">@alexjohnson</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-glass-border">
        <Button 
          variant="outline" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link to="/login">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;