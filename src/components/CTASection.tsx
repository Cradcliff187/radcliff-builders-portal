import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import PageContainer from "@/components/PageContainer";

const CTASection = () => {
  return (
    <section className="py-24 bg-primary text-white">
      <PageContainer className="text-center">
        <h2 className="mb-6 uppercase text-white">Ready to Build Something That Lasts?</h2>
        <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether it's a healthcare renovation, professional facility upgrade, or commercial buildout, we're here to deliver exceptional results with minimal disruption. Let's talk about your project.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Start a Conversation</Link>
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            asChild 
            className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-navy backdrop-blur-sm"
          >
            <a href="tel:859-802-0746" aria-label="Call Radcliff Construction Group at (859) 802-0746">
              <Phone className="w-5 h-5" />
              (859) 802-0746
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-white/80">
          <Mail className="w-5 h-5" />
          <a href="mailto:info@radcliffconstructiongroup.com" className="hover:text-secondary transition-colors">
            info@radcliffconstructiongroup.com
          </a>
        </div>
      </PageContainer>
    </section>
  );
};

export default CTASection;
