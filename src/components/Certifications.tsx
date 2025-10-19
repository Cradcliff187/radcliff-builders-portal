import { Shield, FileCheck, Award, Lock } from "lucide-react";

const certifications = [
  { icon: Award, label: "ROSS Certified" },
  { icon: Shield, label: "ICRA Certified" },
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
              <cert.icon className="w-12 h-12 text-secondary" />
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
