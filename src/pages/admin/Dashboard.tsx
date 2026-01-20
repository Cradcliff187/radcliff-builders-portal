import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContentCounts } from "@/hooks/useAdminCMS";
import { 
  FileText, 
  FolderOpen, 
  BookOpen, 
  Download, 
  Users,
  Settings,
  BarChart3,
  Quote
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const Dashboard = () => {
  const { data: counts } = useContentCounts();

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
    {
      title: "Testimonials",
      description: "Manage client testimonials",
      icon: Quote,
      path: "/admin/testimonials",
      color: "bg-amber-500/10 text-amber-600",
      count: counts?.testimonials,
    },
    {
      title: "Site Settings",
      description: "Phone, email, stats, and social links",
      icon: Settings,
      path: "/admin/settings",
      color: "bg-slate-500/10 text-slate-600",
    },
    {
      title: "Google Tools",
      description: "Analytics, Search Console & more",
      icon: BarChart3,
      path: "/admin/google-tools",
      color: "bg-indigo-500/10 text-indigo-600",
    },
  ];

  return (
    <AdminLayout title="Content Sections" hideBackLink>
      <p className="text-muted-foreground mb-8">
        Select a section to manage content
      </p>

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
    </AdminLayout>
  );
};

export default Dashboard;
