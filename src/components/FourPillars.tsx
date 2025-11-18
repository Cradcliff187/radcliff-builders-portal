import { Handshake, Award, Zap, MapPin } from "lucide-react";
import PageContainer from "@/components/PageContainer";

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
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-none bg-secondary/10 mb-6 group-hover:bg-secondary/20 transition-colors flex items-center justify-center">
                <pillar.icon className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
              </div>
              <h3 className="mb-4 uppercase">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default FourPillars;
