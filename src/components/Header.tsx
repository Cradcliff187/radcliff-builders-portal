import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
    // { to: "/insights", label: "Insights" }, // Hidden until content is ready
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
                className={`relative text-sm font-heading font-semibold uppercase tracking-wider transition-colors
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-secondary 
                  after:transition-transform after:duration-200 after:ease-out after:origin-left
                  ${location.pathname === link.to
                    ? "text-secondary after:w-full after:scale-x-100"
                    : "text-white hover:text-secondary after:w-full after:scale-x-0 hover:after:scale-x-100"
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden overflow-hidden bg-primary border-t border-white/10"
            >
              <div className="py-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
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
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                >
                  <Button variant="secondary" size="sm" className="mt-4 w-full" asChild>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Request Consultation
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
