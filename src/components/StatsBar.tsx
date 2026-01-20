import { Award, Briefcase, MapPin, Shield } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { useSiteSetting } from "@/hooks/useSiteSettings";

const StatsBar = () => {
  const { value: yearsExp } = useSiteSetting("stat_years_experience", "25+");
  const { value: projectsCompleted } = useSiteSetting("stat_projects_completed", "100+");
  const { value: coverage } = useSiteSetting("stat_coverage", "4-State");

  const stats = [
    {
      icon: Briefcase,
      number: yearsExp,
      label: "Years Experience",
    },
    {
      icon: Award,
      number: projectsCompleted,
      label: "Projects Completed",
    },
    {
      icon: Shield,
      number: "OSHA & ICRA",
      label: "Certified",
    },
    {
      icon: MapPin,
      number: coverage,
      label: "Coverage",
    },
  ];

  return (
    <section className="py-12 bg-primary">
      <PageContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <stat.icon className="w-8 h-8 text-secondary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="h-[88px] md:h-[100px] flex items-center justify-center mb-2">
                <div className="text-secondary text-4xl md:text-5xl font-heading font-bold leading-tight">
                  {stat.number}
                </div>
              </div>
              <div className="text-white/90 text-sm uppercase tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default StatsBar;
