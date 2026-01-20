import { ShieldCheck } from "lucide-react";

const TrustBadges = () => {
  const certifications = [
    { label: "ICRA Certified" },
    { label: "OSHA 30 Certified" },
  ];

  return (
    <section className="bg-white py-3 border-b border-border" aria-label="Certifications">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex justify-center items-center gap-x-6">
          {certifications.map((cert) => (
            <div
              key={cert.label}
              className="flex items-center gap-2 pr-6 border-r border-border last:border-r-0 last:pr-0"
            >
              <ShieldCheck className="h-5 w-5 text-secondary flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                {cert.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
