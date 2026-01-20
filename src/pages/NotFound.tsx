import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Add noindex meta tag for 404 pages
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex, nofollow");
    
    // Cleanup on unmount - restore default
    return () => {
      if (metaRobots) {
        metaRobots.setAttribute("content", "index, follow");
      }
    };
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Page Not Found | Radcliff Construction Group"
        description="The page you're looking for doesn't exist. Return to our homepage to explore our healthcare and commercial construction services."
      />
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center px-6">
          <h1 className="mb-4 text-6xl md:text-8xl font-heading font-bold text-primary">404</h1>
          <p className="mb-8 text-2xl md:text-3xl font-heading text-foreground">Page Not Found</p>
          <p className="mb-12 text-lg text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;