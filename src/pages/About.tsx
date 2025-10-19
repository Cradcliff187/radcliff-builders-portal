import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Award, Users, Target, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Partnership First",
      description: "We believe in building relationships, not just buildings. Every project is a partnership.",
    },
    {
      icon: Award,
      title: "Quality Commitment",
      description: "From concept to completion, we maintain the highest standards of craftsmanship and safety.",
    },
    {
      icon: Target,
      title: "On-Time Delivery",
      description: "Strategic planning and efficient execution ensure your project stays on schedule and budget.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "We invest in our team and technology to deliver innovative construction solutions.",
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="mb-6 uppercase">Built on Relationships</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Radcliff Construction Group is your trusted partner for exceptional construction across healthcare, education, retail, and commercial sectors.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mb-6 uppercase">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Radcliff Construction Group was founded on a simple principle: exceptional results come from trusted relationships. With deep roots in the region and decades of combined experience, we've built our reputation project by project, partnership by partnership.
                </p>
                <p>
                  We specialize in construction that requires precision, expertise, and accountability. From healthcare facilities that demand ICRA certification to educational spaces that inspire learning, retail environments that elevate brands, and commercial projects that drive business success.
                </p>
                <p>
                  Our team combines technical excellence with genuine partnership. We listen, we plan, and we deliver—every time, on schedule, and on budget.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card p-8 rounded-lg text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">100+</p>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="bg-card p-8 rounded-lg text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">25+</p>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div className="bg-card p-8 rounded-lg text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">98%</p>
                <p className="text-muted-foreground">Client Satisfaction</p>
              </div>
              <div className="bg-card p-8 rounded-lg text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">4</p>
                <p className="text-muted-foreground">Industry Sectors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="mb-6 uppercase">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide every project and partnership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-6">
                  <value.icon className="w-10 h-10 text-secondary" />
                </div>
                <h3 className="mb-4 uppercase text-xl">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
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

export default About;
