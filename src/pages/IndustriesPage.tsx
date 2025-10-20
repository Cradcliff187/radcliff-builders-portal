import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Hospital, GraduationCap, ShoppingBag, Building2, CheckCircle2 } from "lucide-react";

const industries = [
  {
    icon: Hospital,
    title: "Healthcare",
    description: "Specialized construction for medical facilities requiring the highest standards of safety, compliance, and precision.",
    features: [
      "ICRA Certified Teams",
      "Infection Control Protocols",
      "24/7 Occupied Facility Experience",
      "Medical Equipment Coordination",
      "HIPAA Compliant Practices",
    ],
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Creating inspiring learning environments from K-12 schools to universities, designed for both students and faculty.",
    features: [
      "Occupied Campus Experience",
      "Summer Schedule Expertise",
      "Technology Infrastructure",
      "Safety & Security Focus",
      "Flexible Learning Spaces",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description: "Building customer-focused retail spaces that enhance brand experience while meeting tight delivery schedules.",
    features: [
      "Fast-Track Scheduling",
      "Brand Standards Compliance",
      "After-Hours Construction",
      "Tenant Coordination",
      "Customer Experience Focus",
    ],
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Professional office and commercial spaces designed to meet modern business needs and sustainability goals.",
    features: [
      "Class A Office Experience",
      "Sustainable Building Practices",
      "Technology Integration",
      "Flexible Workspace Design",
      "Minimal Business Disruption",
    ],
  },
];

const IndustriesPage = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="mb-6 uppercase">Industries We Serve</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Specialized expertise across diverse construction sectors with a commitment to excellence
          </p>
        </div>
      </section>

      {/* Industries Detail */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="space-y-24">
            {industries.map((industry, index) => (
              <div
                key={industry.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-none bg-secondary/10 mb-6">
                    <industry.icon className="w-10 h-10 text-secondary" />
                  </div>
                  <h2 className="mb-6 uppercase">{industry.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {industry.description}
                  </p>
                  <ul className="space-y-3">
                    {industry.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-card p-12 rounded-none ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-square bg-muted rounded-none flex items-center justify-center">
                    <industry.icon className="w-32 h-32 text-secondary/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
};

export default IndustriesPage;
