import { Building2, Clock, DollarSign, Wrench } from "lucide-react";

interface ProjectStatsBarProps {
  squareFootage?: number;
  durationWeeks?: number;
  projectValue?: string;
  projectType?: string;
}

const ProjectStatsBar = ({
  squareFootage,
  durationWeeks,
  projectValue,
  projectType,
}: ProjectStatsBarProps) => {
  const stats = [
    {
      icon: Building2,
      value: squareFootage ? `${squareFootage.toLocaleString()} SF` : null,
      label: "Square Footage",
    },
    {
      icon: Clock,
      value: durationWeeks ? `${durationWeeks} Weeks` : null,
      label: "Duration",
    },
    {
      icon: DollarSign,
      value: projectValue || null,
      label: "Project Value",
    },
    {
      icon: Wrench,
      value: projectType || null,
      label: "Project Type",
    },
  ].filter((stat) => stat.value !== null);

  if (stats.length === 0) return null;

  return (
    <section className="bg-primary py-8 border-b border-primary/20">
      <div className="container mx-auto px-6 lg:px-20">
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${stats.length} gap-6`}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-white text-lg md:text-xl font-heading font-bold uppercase tracking-wide">
                {stat.value}
              </div>
              <div className="text-white/70 text-xs uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectStatsBar;
