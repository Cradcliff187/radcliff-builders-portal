import { Handshake, Award, Zap, MapPin } from "lucide-react";

const pillars = [
  {
    icon: Handshake,
    title: "Partnership",
    description: "We build lasting relationships based on trust, transparency, and mutual success.",
  },
  {
    icon: Award,
    title: "Certified",
    description: "ROSS and ICRA certified with full licensing and bonding for your peace of mind.",
  },
  {
    icon: Zap,
    title: "Efficient",
    description: "Strategic project management that delivers on time and on budget, every time.",
  },
  {
    icon: MapPin,
    title: "Regional",
    description: "Deep roots in the region with the expertise to serve your portfolio nationwide.",
  },
];

const FourPillars = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-6 group-hover:bg-secondary/20 transition-colors">
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
