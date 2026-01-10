import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PartnerLogos from "@/components/PartnerLogos";
import ContentComingSoon from "@/components/ContentComingSoon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useCMSContent";
import { handleImageError } from "@/lib/imageUtils";

type Industry = "All" | "Healthcare" | "Professional" | "Retail" | "Commercial";

const Projects = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("All");
  const { data: allProjects = [], isLoading } = useProjects();

  const industries: Industry[] = ["All", "Healthcare", "Professional", "Retail", "Commercial"];

  const filteredProjects = selectedIndustry === "All"
    ? allProjects
    : allProjects.filter((p) => p.industry === selectedIndustry);

  return (
    <main id="main-content" className="min-h-screen">
      <SEO
        title="Our Projects | Radcliff Construction Group (RCG)"
        description="View Radcliff Construction Group's portfolio of healthcare, professional, retail, and commercial renovation projects. ICRA-certified construction across Greater Cincinnati, Dayton, Lexington, and Northern Kentucky."
      />
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 bg-primary text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 uppercase leading-tight tracking-wider">Our Projects</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Real projects. Real results. See how we deliver renovations and buildouts that meet deadlines, budgets, and expectations—every time.
          </p>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-24 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
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
              <div className="col-span-full">
                <ContentComingSoon
                  title={`${selectedIndustry} Projects Coming Soon`}
                  message={`We're currently updating our ${selectedIndustry.toLowerCase()} project portfolio. Check back soon to see our latest work in this sector.`}
                />
              </div>
            ) : (
              filteredProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.slug}`}>
                  <Card
                    className="overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={`${project.industry} renovation project: ${project.title}`}
                        loading="lazy"
                        onError={(e) => handleImageError(e)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-1">
                          {project.industry}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 min-h-[144px]">
                      <h3 className="text-xl mb-3 break-words">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 break-words">
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
