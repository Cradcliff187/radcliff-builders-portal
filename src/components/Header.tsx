import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import rcgLogo from "@/assets/rcg-logo-transparent.png";
import rcgLogoColor from "@/assets/rcg-logo-color.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/team", label: "Team" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/industries", label: "Industries" },
    { to: "/insights", label: "Insights" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-primary shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center p-6">
            {/* Desktop: New Color Logo */}
            <img 
              src={rcgLogoColor} 
              alt="Radcliff Construction Group" 
              className="hidden md:block h-16 w-auto transition-all duration-300 object-contain hover:scale-105 transform-gpu"
              style={{
                filter: 'brightness(1.1) contrast(1.15) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                imageRendering: '-webkit-optimize-contrast',
                maxWidth: '280px'
              }}
            />
            {/* Mobile: New Color Logo */}
            <img 
              src={rcgLogoColor} 
              alt="RCG" 
              className="block md:hidden h-12 w-auto transition-all duration-300 object-contain hover:scale-105 transform-gpu"
              style={{
                filter: 'brightness(1.1) contrast(1.15) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                imageRendering: '-webkit-optimize-contrast',
                maxWidth: '200px'
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-heading font-semibold uppercase tracking-wider transition-colors ${
                  location.pathname === link.to
                    ? "text-secondary"
                    : "text-white hover:text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="secondary" size="sm" asChild>
              <Link to="/contact">Request Consultation</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-6 bg-primary border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-3 text-sm font-heading font-semibold uppercase tracking-wider transition-colors ${
                  location.pathname === link.to
                    ? "text-secondary"
                    : "text-white hover:text-secondary"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="secondary" size="sm" className="mt-4 w-full" asChild>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Request Consultation
              </Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
