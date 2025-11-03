import { Hospital, Briefcase, ShoppingBag, Building2 } from "lucide-react";

const industries = [
  {
    icon: Hospital,
    title: "Healthcare",
    description: "ICRA certified with specialized expertise in medical facilities, from clinics to hospitals.",
  },
  {
    icon: Briefcase,
    title: "Professional",
    description: "Modern office spaces, administrative facilities, and professional environments designed for productivity and client experience.",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description: "Building customer-focused spaces that enhance brand experience and drive business success.",
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Professional office spaces and commercial developments that meet modern business needs.",
  },
];

const Industries = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="mb-6 uppercase">Industries We Serve</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Specialized construction expertise across diverse sectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="bg-card p-8 rounded-none hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-none bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <industry.icon className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 uppercase text-2xl">{industry.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
