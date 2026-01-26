import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { useSiteSetting } from "@/hooks/useSiteSettings";

const CTASection = () => {
  const { value: phoneNumber } = useSiteSetting("phone_number", "859-816-2314");
  const { value: emailPrimary } = useSiteSetting("email_primary", "info@radcliffconstructiongroup.com");

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
            <a href={`tel:${phoneNumber.replace(/[^0-9]/g, "")}`} aria-label={`Call Radcliff Construction Group at ${phoneNumber}`}>
              <Phone className="w-5 h-5" />
              {phoneNumber}
            </a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-white/80">
          <Mail className="w-5 h-5" aria-hidden="true" />
          <a href={`mailto:${emailPrimary}`} className="hover:text-secondary transition-colors" aria-label={`Email Radcliff Construction Group at ${emailPrimary}`}>
            {emailPrimary}
          </a>
        </div>
      </PageContainer>
    </section>
  );
};

export default CTASection;
