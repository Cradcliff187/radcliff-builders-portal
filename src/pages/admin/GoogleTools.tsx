import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  Search, 
  Building2, 
  Gauge,
  ExternalLink
} from "lucide-react";

const siteTools = [
  {
    title: "Google Analytics",
    description: "View site traffic, user behavior, and conversion metrics for teamradcliff.com",
    url: "https://analytics.google.com/analytics/web/",
    icon: BarChart3,
  },
  {
    title: "Google Search Console",
    description: "Monitor search performance, indexing status, and fix SEO issues",
    url: "https://search.google.com/search-console/",
    icon: Search,
  },
  {
    title: "Google Business Profile",
    description: "Manage your Google Business listing, reviews, and local SEO",
    url: "https://business.google.com/",
    icon: Building2,
  },
  {
    title: "PageSpeed Insights",
    description: "Test site performance and get optimization recommendations",
    url: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fteamradcliff.com",
    icon: Gauge,
  },
];

const GoogleTools = () => {
  return (
    <AdminLayout title="Google Tools & Analytics">
      <p className="text-muted-foreground mb-8">
        Quick access to site management and analytics tools. Links open in a new tab.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {siteTools.map((tool) => (
          <a
            key={tool.title}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <Card className="p-6 rounded-none hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-none bg-primary/10 text-primary flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  <tool.icon className="w-6 h-6" />
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="text-lg font-heading font-semibold uppercase tracking-wide mb-2">
                {tool.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {tool.description}
              </p>
            </Card>
          </a>
        ))}
      </div>

      <div className="bg-muted p-6 rounded-none">
        <h4 className="font-heading font-semibold uppercase tracking-wide mb-2">
          Need Help?
        </h4>
        <p className="text-muted-foreground text-sm">
          Make sure you're signed into the Google account that has access to RCG's properties. 
          Contact your administrator if you need access granted.
        </p>
      </div>
    </AdminLayout>
  );
};

export default GoogleTools;
