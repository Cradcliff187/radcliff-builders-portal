import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, 
  FolderOpen, 
  BookOpen, 
  Download, 
  LogOut,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import rcgLogo from "@/assets/rcg-logo-transparent.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been logged out successfully",
      });
      navigate("/admin");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const sections = [
    {
      title: "Articles",
      description: "Manage blog posts and insights",
      icon: FileText,
      path: "/admin/articles",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Projects",
      description: "Manage project portfolio",
      icon: FolderOpen,
      path: "/admin/projects",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Case Studies",
      description: "Manage success stories",
      icon: BookOpen,
      path: "/admin/case-studies",
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Resources",
      description: "Manage downloadable resources",
      icon: Download,
      path: "/admin/resources",
      color: "bg-orange-500/10 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-navy text-white py-6 border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={rcgLogo} alt="RCG" className="h-12" />
              <div>
                <h1 className="text-xl font-heading font-semibold uppercase tracking-wide">
                  Content Manager
                </h1>
                <p className="text-white/60 text-sm">Team Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-white hover:text-secondary"
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  View Site
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:text-secondary"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 lg:px-20 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-heading font-semibold uppercase tracking-wide mb-2">
            Content Sections
          </h2>
          <p className="text-muted-foreground">
            Select a section to manage content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Link key={section.path} to={section.path}>
              <Card className="p-6 rounded-none hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className={`w-12 h-12 rounded-none ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <section.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-semibold uppercase mb-2">
                  {section.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {section.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
