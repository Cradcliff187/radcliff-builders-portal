import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="mb-6 uppercase text-white">Ready to Start Your Project?</h2>
        <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Let's discuss how RCG can bring your construction vision to life with partnership and professionalism.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Request Consultation</Link>
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            asChild 
            className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-navy backdrop-blur-sm"
          >
            <a href="tel:859-816-2314">
              <Phone className="w-5 h-5" />
              859-816-2314
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-white/80">
          <Mail className="w-5 h-5" />
          <a href="mailto:info@radcliffcg.com" className="hover:text-secondary transition-colors">
            info@radcliffcg.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
