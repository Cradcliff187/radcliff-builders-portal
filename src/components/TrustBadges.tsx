import { ShieldCheck, CheckCircle, Clock, Star } from "lucide-react";
import { useSiteSetting } from "@/hooks/useSiteSettings";

const TrustBadges = () => {
  const { value: projectsCompleted } = useSiteSetting("stat_projects_completed", "100+");
  const { value: yearsExperience } = useSiteSetting("stat_years_experience", "25+");
  const { value: clientSatisfaction } = useSiteSetting("stat_client_satisfaction", "98%");

  const certificationBadges = [
    { icon: ShieldCheck, label: "ICRA Certified" },
    { icon: ShieldCheck, label: "OSHA 30 Certified" },
  ];

  const statBadges = [
    { icon: CheckCircle, label: `${projectsCompleted} Projects Completed` },
    { icon: Clock, label: `${yearsExperience} Years Combined Experience` },
  ];

  const satisfactionBadge = { icon: Star, label: `${clientSatisfaction} Client Satisfaction` };

  return (
    <section className="bg-white py-4 border-b border-border" aria-label="Trust credentials">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
          {/* Certifications - Always visible */}
          {certificationBadges.map((badge, index) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 pr-6 border-r border-border last:border-r-0 last:pr-0"
            >
              <badge.icon className="h-5 w-5 text-secondary flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{badge.label}</span>
            </div>
          ))}

          {/* Stats - Hidden on mobile */}
          {statBadges.map((badge) => (
            <div
              key={badge.label}
              className="hidden md:flex items-center gap-2 pr-6 border-r border-border"
            >
              <badge.icon className="h-5 w-5 text-secondary flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-muted-foreground whitespace-nowrap">{badge.label}</span>
            </div>
          ))}

          {/* Satisfaction - Always visible */}
          <div className="flex items-center gap-2">
            <satisfactionBadge.icon className="h-5 w-5 text-secondary flex-shrink-0" aria-hidden="true" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">{satisfactionBadge.label}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
