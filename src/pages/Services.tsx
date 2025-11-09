import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card } from "@/components/ui/card";
import { CheckCircle, Building2, FileCheck, ClipboardList, Users, Wrench } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Healthcare Renovations & Compliance",
      description: "ICRA and OSHA 30 certified renovations in occupied medical facilities. From patient rooms to surgical suites, we deliver infection control, safety, and zero interruptions to care.",
      features: [
        "Full ICRA and OSHA 30 certification",
        "Infection control barriers and protocols",
        "Phased scheduling to maintain operations",
        "Regulatory compliance built in",
      ],
    },
    {
      icon: FileCheck,
      title: "Professional & Office Renovations",
      description: "Tenant improvements, office upgrades, and professional facility renovations designed around your business hours. We work when you don't—so your team stays productive.",
      features: [
        "After-hours and weekend scheduling",
        "Minimal disruption to staff and clients",
        "Security-conscious site management",
        "Fast-track delivery options",
      ],
    },
    {
      icon: Wrench,
      title: "Retail & Commercial Buildouts",
      description: "New construction, tenant improvements, and renovations for retail, restaurant, and commercial spaces. Fast timelines. Flexible scheduling. Zero excuses.",
      features: [
        "Accelerated project timelines",
        "Coordinated tenant and property management",
        "Code compliance expertise",
        "Budget transparency from day one",
      ],
    },
    {
      icon: ClipboardList,
      title: "Full Project Management",
      description: "From preconstruction through closeout, we handle it all—planning, permits, coordination, safety, quality control, and communication. You get one point of contact and zero surprises.",
      features: [
        "Preconstruction planning and budgeting",
        "Permit and regulatory coordination",
        "On-site safety and quality control",
        "Real-time project updates",
      ],
    },
  ];

  const process = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We begin by understanding your unique requirements, regulatory needs, and operational constraints to develop a comprehensive project plan.",
    },
    {
      number: "02",
      title: "Compliance Review",
      description: "Our team conducts thorough regulatory and code compliance reviews to ensure all certifications and approvals are in place before work begins.",
    },
    {
      number: "03",
      title: "Phased Execution",
      description: "Strategic phasing minimizes disruption to your operations while maintaining the highest standards of safety, quality, and regulatory compliance.",
    },
    {
      number: "04",
      title: "Quality Delivery",
      description: "We deliver your completed project on schedule and on budget, with comprehensive documentation and ongoing support as needed.",
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="mb-6 uppercase">Our Services</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            From healthcare renovations to commercial buildouts, we deliver precision, safety, and results—with minimal disruption to your operations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="p-8 rounded-none hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-none bg-secondary/10 flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-semibold uppercase mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="mb-6 uppercase">Our Process</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A proven methodology that delivers compliant, efficient results every time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-6xl font-heading font-bold text-secondary/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-heading font-semibold uppercase mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Highlight */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="mb-6 uppercase text-white">Certified Excellence</h2>
          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Our OSHA 30 and ICRA certifications ensure your project meets the highest standards for safety, compliance, and quality in sensitive environments.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
            {/* OSHA 30 Certification */}
            <div className="flex flex-col items-center gap-3 w-40">
              <div className="flex items-center justify-center h-32">
                <img 
                  src="/assets/certifications/osha-logo-new.png" 
                  alt="OSHA 30 Certified"
                  className="h-32 w-auto object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
              <span className="text-white font-heading font-semibold uppercase tracking-wider text-sm text-center">
                OSHA 30 Certified
              </span>
            </div>

            {/* ICRA Certification */}
            <div className="flex flex-col items-center gap-3 w-40">
              <div className="flex items-center justify-center h-32">
                <img 
                  src="/assets/certifications/icra-logo.png" 
                  alt="ICRA Certified"
                  className="h-24 w-auto object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
              <span className="text-white font-heading font-semibold uppercase tracking-wider text-sm text-center">
                ICRA Certified
              </span>
            </div>

            {/* Licensed */}
            <div className="flex flex-col items-center gap-3 w-40">
              <div className="flex items-center justify-center h-32">
                <FileCheck className="w-16 h-16 text-secondary" />
              </div>
              <span className="text-white font-heading font-semibold uppercase tracking-wider text-sm text-center">
                Licensed
              </span>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
};

export default Services;
