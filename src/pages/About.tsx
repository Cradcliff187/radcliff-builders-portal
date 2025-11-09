import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PartnerLogos from "@/components/PartnerLogos";
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
          <h1 className="mb-6 uppercase">Built on Relationships. Defined by Reliability.</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We're more than contractors—we're partners who show up, deliver, and stand behind every project we build.
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
                  Radcliff Construction Group was built on a simple belief: great projects come from great relationships.
                </p>
                <p>
                  We're not the biggest contractor in the region—but we're the one clients call back. Why? Because we show up, we listen, and we deliver. Every time. On budget. On schedule. With zero drama.
                </p>
                <p>
                  We specialize in renovations and buildouts in environments where downtime isn't an option—healthcare facilities, professional offices, retail spaces, and commercial properties. These aren't easy projects. They require ICRA and OSHA 30 certifications, strict safety protocols, flexible scheduling, and the kind of communication that keeps everyone aligned.
                </p>
                <p>
                  That's where we shine. We don't just manage projects—we solve problems. We coordinate with your teams. We minimize disruption. And when something unexpected happens (because it always does), we handle it without pointing fingers.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card p-8 rounded-none text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">100+</p>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="bg-card p-8 rounded-none text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">25+</p>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div className="bg-card p-8 rounded-none text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">98%</p>
                <p className="text-muted-foreground">Client Satisfaction</p>
              </div>
              <div className="bg-card p-8 rounded-none text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">4</p>
                <p className="text-muted-foreground">Industry Sectors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnerLogos />

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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-none bg-secondary/10 mb-6">
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
