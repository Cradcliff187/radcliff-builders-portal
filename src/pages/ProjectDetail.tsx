import { Link, useParams } from "react-router-dom";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { useProjects } from "@/hooks/useCMSContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, MapPin, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { format } from "date-fns";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = useProjectDetail(slug || "");
  const { data: allProjects = [] } = useProjects();

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-6 lg:px-20">
            <Skeleton className="h-12 w-3/4 mb-8" />
            <Skeleton className="h-64 w-full mb-12" />
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-32 w-full" />
              </div>
              <Skeleton className="h-96" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Header />
        <div className="pt-32 pb-24 text-center">
          <div className="container mx-auto px-6 lg:px-20">
            <h1 className="mb-6">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center text-secondary hover:underline"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Get related projects (same industry, exclude current)
  const relatedProjects = allProjects
    .filter((p: any) => p.industry === project.industry && p.id !== project.id)
    .slice(0, 3);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-white/70 mb-6">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/projects" className="hover:text-white">
              Projects
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">{project.title}</span>
          </nav>

          <h1 className="mb-6">{project.title}</h1>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 bg-secondary text-white text-xs uppercase tracking-wider rounded-none">
                {project.industry}
              </span>
            </div>
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
            )}
            {project.square_footage && (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{project.square_footage.toLocaleString()} sq ft</span>
              </div>
            )}
            {project.completion_date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Completed {format(new Date(project.completion_date), "MMMM yyyy")}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {(project.project_images?.length > 0 || project.image_url) && (
        <section className="py-12 bg-light-grey">
          <div className="container mx-auto px-6 lg:px-20">
            <ProjectImageGallery
              images={project.project_images || []}
              primaryImage={project.image_url}
            />
          </div>
        </section>
      )}

      {/* Project Overview */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="mb-6">Project Overview</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.detailed_description || project.description}
                </p>
              </div>

              {project.challenges && (
                <div>
                  <h3 className="mb-4">The Challenge</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              )}

              {project.solutions && (
                <div>
                  <h3 className="mb-4">Our Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.solutions}
                  </p>
                </div>
              )}

              {project.outcomes && (
                <div>
                  <h3 className="mb-4">Results</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.outcomes}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <Card className="p-6 rounded-none sticky top-32">
                <h4 className="mb-6 uppercase tracking-wider text-sm font-heading font-semibold">
                  Project Details
                </h4>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Industry</dt>
                    <dd className="font-semibold">{project.industry}</dd>
                  </div>
                  {project.client_name && (
                    <div>
                      <dt className="text-sm text-muted-foreground mb-1">Client</dt>
                      <dd className="font-semibold">{project.client_name}</dd>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <dt className="text-sm text-muted-foreground mb-1">Location</dt>
                      <dd className="font-semibold">{project.location}</dd>
                    </div>
                  )}
                  {project.square_footage && (
                    <div>
                      <dt className="text-sm text-muted-foreground mb-1">Size</dt>
                      <dd className="font-semibold">{project.square_footage.toLocaleString()} sq ft</dd>
                    </div>
                  )}
                  {project.project_value && (
                    <div>
                      <dt className="text-sm text-muted-foreground mb-1">Project Value</dt>
                      <dd className="font-semibold">{project.project_value}</dd>
                    </div>
                  )}
                  {(project.start_date || project.completion_date) && (
                    <div>
                      <dt className="text-sm text-muted-foreground mb-1">Timeline</dt>
                      <dd className="font-semibold">
                        {project.start_date && format(new Date(project.start_date), "MMM yyyy")}
                        {project.start_date && project.completion_date && " - "}
                        {project.completion_date && format(new Date(project.completion_date), "MMM yyyy")}
                      </dd>
                    </div>
                  )}
                </dl>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-light-grey">
          <div className="container mx-auto px-6 lg:px-20">
            <h2 className="mb-12 text-center">More {project.industry} Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject: any) => (
                <Link key={relatedProject.id} to={`/projects/${relatedProject.slug}`}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={relatedProject.image_url}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-secondary text-sm font-heading font-semibold uppercase tracking-wider mb-2">
                        {relatedProject.industry}
                      </p>
                      <h3 className="text-xl mb-0">{relatedProject.title}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </>
  );
};

export default ProjectDetail;
