import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import rcgLogo from "@/assets/rcg-logo-transparent.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div>
            <img 
              src={rcgLogo} 
              alt="Radcliff Construction Group" 
              className="h-16 w-auto mb-6 object-contain"
              style={{
                filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
                imageRendering: '-webkit-optimize-contrast',
                maxWidth: '240px'
              }}
            />
            <p className="text-white/80 text-sm leading-relaxed">
              Build Trusted Relationships. Deliver Exceptional Results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold uppercase tracking-wider mb-4 text-sm">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/projects", label: "Projects" },
                { to: "/industries", label: "Industries" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/80 hover:text-secondary transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold uppercase tracking-wider mb-4 text-sm">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="tel:859-816-2314"
                className="flex items-center gap-2 text-white/80 hover:text-secondary transition-colors"
              >
                <Phone className="w-4 h-4" />
                859-816-2314
              </a>
              <a
                href="mailto:info@radcliffconstructiongroup.com"
                className="flex items-center gap-2 text-white/80 hover:text-secondary transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@radcliffconstructiongroup.com
              </a>
              <div className="flex items-start gap-2 text-white/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Regional Construction Services</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-heading font-semibold uppercase tracking-wider mb-4 text-sm">
              Certifications
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>ROSS Certified</li>
              <li>ICRA Certified</li>
              <li>Licensed & Bonded</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="font-body text-xs" style={{ color: '#F4F7F9' }}>
            &copy; 2025 Radcliff Construction Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
