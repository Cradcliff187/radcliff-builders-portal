import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import heroImage from "@/assets/hero-healthcare.jpg";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? {}
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
          }
        }
      };

  const itemVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" as const }
        }
      };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern healthcare facility interior"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        {/* Stronger overlay to obscure diagonal lines */}
        <div className="absolute inset-0 bg-navy/85" />
        
        {/* Top gradient scrim under header area */}
        <div 
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 text-center"
      >
        <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 uppercase leading-tight font-heading font-bold tracking-wider">
          Your Trusted Partner for Compliant, Efficient Renovations in Sensitive Environments
        </motion.h1>
        <motion.p variants={itemVariants} className="text-white/90 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
          ICRA-certified healthcare renovations • Professional office buildouts • Retail & multi-site rollouts • Commercial construction — Serving Greater Cincinnati, Dayton, Lexington & Northern Kentucky
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Start a Conversation</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
