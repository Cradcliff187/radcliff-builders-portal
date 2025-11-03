import { FileCheck, Lock } from "lucide-react";

const certifications = [
  { image: "/assets/certifications/osha-logo-new.png", label: "OSHA 30 Certified" },
  { image: "/assets/certifications/icra-logo.png", label: "ICRA Certified" },
  { icon: FileCheck, label: "Licensed" },
  { icon: Lock, label: "Bonded" },
];

const Certifications = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="mb-4 uppercase text-white">Licensed, Bonded, and Certified</h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
            Your peace of mind is our priority. We maintain the highest industry standards and certifications.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
          {certifications.map((cert) => (
            <div key={cert.label} className="flex flex-col items-center gap-3 w-40">
              <div className="flex items-center justify-center h-32">
                {'icon' in cert ? (
                  <cert.icon className="w-16 h-16 text-secondary" />
                ) : (
                  <img 
                    src={cert.image} 
                    alt={cert.label}
                    className={`${
                      cert.label === "OSHA 30 Certified" ? "h-32" : "h-24"
                    } w-auto object-contain transition-transform duration-300 hover:scale-110`}
                  />
                )}
              </div>
              <span className="text-white font-heading font-semibold uppercase tracking-wider text-sm text-center">
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
