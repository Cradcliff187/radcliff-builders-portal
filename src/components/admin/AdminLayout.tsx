import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, LogOut, Home } from "lucide-react";
import rcgLogo from "@/assets/rcg-logo-transparent.png";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of the admin portal.",
    });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-light-grey">
      {/* Header */}
      <header className="bg-navy border-b border-navy/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 md:h-16">
            <div className="flex items-center gap-2 md:gap-6">
              <Link to="/admin/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img 
                  src={rcgLogo} 
                  alt="RCG Logo" 
                  className="h-8 md:h-10"
                />
                <div className="flex flex-col">
                  <span className="text-white font-montserrat font-bold text-xs md:text-sm uppercase tracking-wide">
                    Content Manager
                  </span>
                  <span className="text-gold text-[10px] md:text-xs font-montserrat uppercase tracking-wider">
                    Team Portal
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-2 border-navy bg-white text-navy hover:bg-navy hover:text-white transition-colors rounded-none uppercase tracking-wider text-xs md:text-sm w-full sm:w-auto"
              >
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-2 border-navy bg-white text-navy hover:bg-navy hover:text-white transition-colors rounded-none uppercase tracking-wider text-xs md:text-sm w-full sm:w-auto"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 lg:px-20 py-6 md:py-8">
        <div className="mb-6">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center text-navy hover:text-gold transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-montserrat font-bold text-navy uppercase tracking-wide">
            {title}
          </h1>
        </div>

        {children}
      </main>
    </div>
  );
}
