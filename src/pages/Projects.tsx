import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import retailImage from "@/assets/project-retail.webp";
import educationImage from "@/assets/project-education.webp";
import commercialImage from "@/assets/project-commercial.webp";
import healthcareImage from "@/assets/hero-healthcare.webp";

type Industry = "All" | "Healthcare" | "Education" | "Retail" | "Commercial";

const projects = [
  {
    id: 1,
    title: "Regional Medical Center Expansion",
    industry: "Healthcare",
    description: "300,000 sq ft hospital expansion with state-of-the-art patient care facilities",
    image: healthcareImage,
  },
  {
    id: 2,
    title: "Retail Excellence Center",
    industry: "Retail",
    description: "Modern retail space featuring innovative display systems and customer experience zones",
    image: retailImage,
  },
  {
    id: 3,
    title: "University Learning Commons",
    industry: "Education",
    description: "75,000 sq ft collaborative learning facility with advanced technology integration",
    image: educationImage,
  },
  {
    id: 4,
    title: "Corporate Office Campus",
    industry: "Commercial",
    description: "120,000 sq ft Class A office space with sustainable design features",
    image: commercialImage,
  },
  {
    id: 5,
    title: "Surgical Center Renovation",
    industry: "Healthcare",
    description: "Complete renovation of outpatient surgical facility meeting all ICRA standards",
    image: healthcareImage,
  },
  {
    id: 6,
    title: "K-12 STEM Building",
    industry: "Education",
    description: "New 45,000 sq ft science and technology facility for growing school district",
    image: educationImage,
  },
];

const Projects = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("All");

  const industries: Industry[] = ["All", "Healthcare", "Education", "Retail", "Commercial"];

  const filteredProjects = selectedIndustry === "All"
    ? projects
    : projects.filter((p) => p.industry === selectedIndustry);

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
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
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
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
};

export default Projects;
