import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import PartnerLogos from "@/components/PartnerLogos";
import TeamPreviewGrid from "@/components/TeamPreviewGrid";
import SEO from "@/components/SEO";
import { Award, Users, Target, TrendingUp } from "lucide-react";
import { useSiteSetting } from "@/hooks/useSiteSettings";

const About = () => {
  const { value: yearsExp } = useSiteSetting("stat_years_experience", "25+");
  const { value: projectsCompleted } = useSiteSetting("stat_projects_completed", "100+");
  const { value: satisfaction } = useSiteSetting("stat_client_satisfaction", "98%");

  const values = [
    {
      icon: Users,
      title: "Partnership",
      description: "We believe in building relationships, not just buildings. Every project is a partnership built on trust and communication.",
    },
    {
      icon: Award,
      title: "Reliability",
      description: "From concept to completion, we maintain the highest standards. On time. On budget. Every time.",
    },
    {
      icon: Target,
      title: "Safety",
      description: "OSHA 30 and ICRA certified with rigorous safety protocols. Your team's safety is our priority.",
    },
    {
      icon: TrendingUp,
      title: "Communication",
      description: "Real-time updates, transparent processes, and proactive problem-solving keep everyone aligned.",
    },
  ];

  return (
    <main id="main-content" className="min-h-screen">
      <SEO
        title="About Radcliff Construction Group | Healthcare & Commercial Contractor | Cincinnati Region"
        description="Radcliff Construction Group: Partnership-first construction specializing in $25K-$500K renovations for healthcare, office, and multi-site portfolios. ICRA and OSHA 30 certified."
      />
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 bg-primary text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 uppercase leading-tight tracking-wider">Built on Relationships. Defined by Reliability.</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            We're more than contractors—we're partners who show up, deliver, and stand behind every project we build.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
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
                <p className="font-semibold text-foreground">
                  We focus on small- to mid-sized projects and recurring work for clients managing multiple facilities and sites.
                </p>
                <p>
                  That's where we shine. We don't just manage projects—we solve problems. We coordinate with your teams. We minimize disruption. And when something unexpected happens (because it always does), we handle it without pointing fingers.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card p-8 rounded-none text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">{projectsCompleted}</p>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="bg-card p-8 rounded-none text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">{yearsExp}</p>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div className="bg-card p-8 rounded-none text-center">
                <p className="text-5xl font-heading font-bold text-secondary mb-2">{satisfaction}</p>
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
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

      <TeamPreviewGrid />

      <CTASection />
      <Footer />
    </main>
  );
};

export default About;
