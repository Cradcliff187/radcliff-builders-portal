import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useContentCounts } from "@/hooks/useAdminCMS";
import { 
  FileText, 
  FolderOpen, 
  BookOpen, 
  Download, 
  LogOut,
  Home,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import rcgLogo from "@/assets/rcg-logo-transparent.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: counts } = useContentCounts();

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
      count: counts?.articles,
    },
    {
      title: "Projects",
      description: "Manage project portfolio",
      icon: FolderOpen,
      path: "/admin/projects",
      color: "bg-purple-500/10 text-purple-600",
      count: counts?.projects,
    },
    {
      title: "Case Studies",
      description: "Manage success stories",
      icon: BookOpen,
      path: "/admin/case-studies",
      color: "bg-green-500/10 text-green-600",
      count: counts?.caseStudies,
    },
    {
      title: "Resources",
      description: "Manage downloadable resources",
      icon: Download,
      path: "/admin/resources",
      color: "bg-orange-500/10 text-orange-600",
      count: counts?.resources,
    },
    {
      title: "Team Members",
      description: "Manage team member profiles",
      icon: Users,
      path: "/admin/team-members",
      color: "bg-teal-500/10 text-teal-600",
      count: counts?.teamMembers,
    },
    {
      title: "Partner Logos",
      description: "Manage partner and client logos",
      icon: Users,
      path: "/admin/partner-logos",
      color: "bg-pink-500/10 text-pink-600",
      count: counts?.partnerLogos,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-navy text-white py-6 border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-4">
              <img src={rcgLogo} alt="RCG" className="h-8 md:h-12" />
              <div>
                <h1 className="text-sm md:text-xl font-heading font-semibold uppercase tracking-wide">
                  Content Manager
                </h1>
                <p className="text-white/60 text-xs md:text-sm">Team Portal</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-2 border-navy bg-white text-navy hover:bg-navy hover:text-white transition-colors rounded-none uppercase tracking-wider text-xs md:text-sm w-full sm:w-auto"
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  View Site
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-2 border-navy bg-white text-navy hover:bg-navy hover:text-white transition-colors rounded-none uppercase tracking-wider text-xs md:text-sm w-full sm:w-auto"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 lg:px-20 py-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold uppercase tracking-wide mb-2">
            Content Sections
          </h2>
          <p className="text-muted-foreground">
            Select a section to manage content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.path} to={section.path}>
              <Card className="p-6 rounded-none hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-none ${section.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  {section.count !== undefined && (
                    <Badge variant="secondary" className="rounded-none font-semibold">
                      {section.count}
                    </Badge>
                  )}
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
