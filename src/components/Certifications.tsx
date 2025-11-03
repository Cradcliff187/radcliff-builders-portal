import { FileCheck, Lock } from "lucide-react";

const certifications = [
  { image: "/assets/certifications/osha-30-logo-v4.png", label: "OSHA 30 Certified" },
  { image: "/assets/certifications/icra-logo.png", label: "ICRA Certified" },
  { icon: FileCheck, label: "Licensed" },
  { icon: Lock, label: "Bonded" },
];

const Certifications = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
          {certifications.map((cert) => (
            <div key={cert.label} className="flex flex-col items-center gap-3">
              {'icon' in cert ? (
                <cert.icon className="w-16 h-16 text-secondary" />
              ) : (
                <img 
                  src={cert.image} 
                  alt={cert.label}
                  className="h-16 w-16 object-contain transition-transform duration-300 hover:scale-110"
                />
              )}
              <span className="text-white font-heading font-semibold uppercase tracking-wider text-sm">
                {cert.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
