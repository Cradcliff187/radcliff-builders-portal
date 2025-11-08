import { Handshake, Award, Zap, MapPin } from "lucide-react";

const pillars = [
  {
    icon: Handshake,
    title: "Partnership First",
    description: "We're not just contractors—we're your partners. From the first site walk to project closeout, we're with you every step of the way.",
  },
  {
    icon: Award,
    title: "Certified & Safe",
    description: "OSHA 30 and ICRA certified with rigorous safety protocols. We operate with the certifications and licensing that sensitive environments demand.",
  },
  {
    icon: Zap,
    title: "Precision & Consistency",
    description: "Every project. On time. On budget. With minimal disruption. That's our standard—and our reputation depends on it.",
  },
  {
    icon: MapPin,
    title: "Regional Reach",
    description: "Headquartered in Kentucky with deep regional roots and the reach to serve multi-site clients across state lines.",
  },
];

const FourPillars = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-none bg-secondary/10 mb-6 group-hover:bg-secondary/20 transition-colors">
                <pillar.icon className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="mb-4 uppercase">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourPillars;
