import { FileCheck } from "lucide-react";
import { handleImageError } from "@/lib/imageUtils";

type BaseCertification = {
  label: string;
};

type ImageCertification = BaseCertification & {
  image: string;
  alt?: string;
  link?: string;
};

type IconCertification = BaseCertification & {
  icon: React.ComponentType<{ className?: string }>;
};

type Certification = ImageCertification | IconCertification;

const certifications: Certification[] = [
  { image: "/assets/certifications/osha-logo-new.png", label: "OSHA 30 Certified" },
  { image: "/assets/certifications/icra-logo.png", label: "ICRA Certified" },
  { 
    image: "https://seal-cincinnati.bbb.org/seals/blue-seal-280-80-bbb-90053745.png", 
    label: "BBB Accredited",
    link: "https://www.bbb.org/us/ky/erlanger/profile/construction/radcliff-construction-group-llc-0292-90053745/#sealclick",
    alt: "Radcliff Construction Group, LLC BBB Business Review"
  },
  { icon: FileCheck, label: "Licensed" },
];

const Certifications = () => {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white uppercase tracking-wide mb-6">
            Fully Licensed and Certified
          </h2>
          <p className="text-white/90 text-lg max-w-3xl mx-auto">
            Your peace of mind is our priority. We maintain the highest industry standards and certifications.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12">
          {certifications.map((cert) => (
            <div key={cert.label} className="flex flex-col items-center gap-3 w-40">
              <div className="flex items-center justify-center h-32">
                {'icon' in cert ? (
                  <cert.icon className="w-16 h-16 text-secondary" />
                ) : (
                  (() => {
                    const imgElement = (
                      <img 
                        src={cert.image} 
                        alt={'alt' in cert && cert.alt ? cert.alt : cert.label}
                        loading="lazy"
                        onError={(e) => handleImageError(e)}
                        className={`${
                          cert.label === "OSHA 30 Certified" ? "h-32" : "h-24"
                        } w-auto object-contain transition-transform duration-300 hover:scale-110`}
                      />
                    );
                    
                    if ('link' in cert && cert.link) {
                      return (
                        <a 
                          href={cert.link}
                          target="_blank"
                          rel="nofollow noopener"
                          aria-label="View Radcliff Construction Group BBB Business Profile (opens in new tab)"
                        >
                          {imgElement}
                        </a>
                      );
                    }
                    
                    return imgElement;
                  })()
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
