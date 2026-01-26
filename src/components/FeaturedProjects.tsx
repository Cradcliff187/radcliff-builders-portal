import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFeaturedProjects } from "@/hooks/useCMSContent";
import PageContainer from "@/components/PageContainer";
import { handleImageError } from "@/lib/imageUtils";

const FeaturedProjects = () => {
  const { data: projects = [], isLoading } = useFeaturedProjects();
  return (
    <section className="py-24 bg-card">
      <PageContainer>
        <div className="text-center mb-16">
          <h2 className="mb-6 uppercase">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of exceptional construction projects across multiple industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full rounded-none" />
                <div className="p-6 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </Card>
            ))
          ) : (
            projects.map((project) => (
              <Link key={project.id} to={`/projects/${project.slug}`}>
                <Card
                  className="overflow-hidden group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={`${project.industry} project: ${project.title}`}
                      loading="lazy"
                      onError={(e) => handleImageError(e)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 sm:p-6 min-h-[144px]">
                    <p className="text-secondary text-sm font-heading font-semibold uppercase tracking-wider mb-2 break-words">
                      {project.industry}
                    </p>
                    <h3 className="text-lg sm:text-xl mb-2 break-words">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 break-words">
                      {project.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </PageContainer>
    </section>
  );
};

export default FeaturedProjects;
