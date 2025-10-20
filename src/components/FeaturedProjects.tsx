import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import retailImage from "@/assets/project-retail.webp";
import educationImage from "@/assets/project-education.webp";
import commercialImage from "@/assets/project-commercial.webp";

const projects = [
  {
    id: 1,
    title: "Retail Excellence Center",
    industry: "Retail",
    image: retailImage,
  },
  {
    id: 2,
    title: "University Learning Commons",
    industry: "Education",
    image: educationImage,
  },
  {
    id: 3,
    title: "Corporate Office Campus",
    industry: "Commercial",
    image: commercialImage,
  },
];

const FeaturedProjects = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="mb-6 uppercase">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of exceptional construction projects across multiple industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <p className="text-secondary text-sm font-heading font-semibold uppercase tracking-wider mb-2">
                  {project.industry}
                </p>
                <h3 className="text-xl mb-0">{project.title}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
