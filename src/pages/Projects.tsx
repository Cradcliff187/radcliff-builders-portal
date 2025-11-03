import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PartnerLogos from "@/components/PartnerLogos";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useCMSContent";

type Industry = "All" | "Healthcare" | "Professional" | "Retail" | "Commercial";

const Projects = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("All");
  const { data: allProjects = [], isLoading } = useProjects();

  const industries: Industry[] = ["All", "Healthcare", "Professional", "Retail", "Commercial"];

  const filteredProjects = selectedIndustry === "All"
    ? allProjects
    : allProjects.filter((p) => p.industry === selectedIndustry);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="mb-6 uppercase">Our Projects</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of exceptional construction projects delivered with precision and partnership
          </p>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {industries.map((industry) => (
              <Button
                key={industry}
                variant={selectedIndustry === industry ? "secondary" : "outline"}
                onClick={() => setSelectedIndustry(industry)}
              >
                {industry}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full rounded-none" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </Card>
              ))
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No projects found.</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.slug}`}>
                  <Card
                    className="overflow-hidden group hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-1">
                          {project.industry}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl mb-3">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <CTASection />
      <PartnerLogos />
      <Footer />
    </main>
  );
};

export default Projects;
