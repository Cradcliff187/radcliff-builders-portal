import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTeamMembers } from "@/hooks/useCMSContent";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TeamMember {
  id: string;
  anchor_id: string;
  name: string;
  title: string;
  headshot_url: string;
  bio_short: string;
  bio_long: string;
}

const Team = () => {
  const location = useLocation();
  const { data: teamMembers, isLoading } = useTeamMembers();

  // Smooth scroll to anchor on page load
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <main id="main-content" className="min-h-screen">
      <SEO
        title="Our Team | Radcliff Construction Group (RCG)"
        description="Meet the Radcliff Construction Group leadership team. Decades of hands-on field experience, ICRA and OSHA 30 training, focused on minimizing disruption in active facilities."
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 bg-primary text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 uppercase leading-tight tracking-wider text-white">Meet the Team</h1>
          <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed">
            Hands-on leadership committed to safety, predictability, and partnership.
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Our leadership combines decades of hands-on field experience, ICRA and OSHA 30 training, and a relentless focus on minimizing disruption in active facilities.
          </p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-96 rounded-none" />
              ))}
            </div>
          ) : !teamMembers || teamMembers.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No team members available at this time.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  id={member.anchor_id}
                  className="bg-card rounded-none shadow-md hover:shadow-xl transition-all duration-300 scroll-mt-32 flex flex-col h-full"
                >
                  <div className="p-6 flex flex-col items-center flex-grow">
                    <div className="w-40 h-40 mb-6 overflow-hidden rounded-full">
                      <img
                        src={member.headshot_url}
                        alt={`Photo of ${member.name}, ${member.title} of Radcliff Construction Group`}
                        className={`w-full h-full object-cover ${
                          member.name === "Matt Radcliff" ? "object-[center_top]" : ""
                        }`}
                        onError={(e) => {
                          // Fallback to a placeholder if image doesn't exist
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=500&background=1B2B43&color=CF791D&bold=true`;
                        }}
                      />
                    </div>
                    <h3 className="mb-2 uppercase text-center">{member.name}</h3>
                    <p className="text-secondary font-semibold mb-4 text-center">{member.title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-center">
                      {member.bio_short}
                    </p>

                    {/* Expandable Long Bio */}
                    <Accordion type="single" collapsible className="w-full mt-auto">
                      <AccordionItem value="bio" className="border-none">
                        <AccordionTrigger className="text-sm font-semibold text-secondary hover:text-secondary/80 uppercase tracking-wider">
                          Read Full Bio
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-4 space-y-4 text-muted-foreground text-sm leading-relaxed">
                            {member.bio_long.split('\n\n').map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-light-grey">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 text-center">
          <h2 className="mb-8 uppercase max-w-4xl mx-auto">
            Want to work with a leadership team that treats your facilities like their own?
          </h2>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/contact">Start a Conversation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Team;
