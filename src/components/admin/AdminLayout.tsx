import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, LogOut } from "lucide-react";

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
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link to="/admin/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img 
                  src="/src/assets/rcg-logo-transparent.png" 
                  alt="RCG Logo" 
                  className="h-10"
                />
                <div className="flex flex-col">
                  <span className="text-white font-montserrat font-bold text-sm uppercase tracking-wide">
                    RCG Construction
                  </span>
                  <span className="text-gold text-xs font-montserrat uppercase tracking-wider">
                    Admin Portal
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("/", "_blank")}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 uppercase tracking-wider"
              >
                View Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 uppercase tracking-wider"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 lg:px-20 py-8">
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
          <h1 className="text-4xl font-montserrat font-bold text-navy uppercase tracking-wide">
            {title}
          </h1>
        </div>

        {children}
      </main>
    </div>
  );
}
