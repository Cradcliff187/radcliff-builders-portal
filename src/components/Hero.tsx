import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-healthcare.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern healthcare facility interior"
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
      <div className="relative z-10 container mx-auto px-6 lg:px-20 text-center">
        <h1 className="text-white mb-6 uppercase leading-tight">
          Renovations and Buildouts Delivered<br />
          with Precision, Safety, and Trust.
        </h1>
        <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
          We don't just build—we partner with you to deliver exceptional results in healthcare, professional, and commercial environments that demand compliance, safety, and minimal disruption.
        </p>
        <Button variant="hero" size="lg" asChild>
          <Link to="/contact">Start a Conversation</Link>
        </Button>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
