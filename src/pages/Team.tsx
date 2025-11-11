import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TeamMember {
  anchor_id: string;
  name: string;
  title: string;
  headshot_url: string;
  bio_short: string;
  bio_long: string;
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      anchor_id: "matt-radcliff",
      name: "Matt Radcliff",
      title: "President & Founder",
      headshot_url: "/images/team/matt-radcliff-2025.jpg",
      bio_short: "With 20+ years in construction, Matt leads RCG with a hands-on approach focused on trust, safety, and precision.",
      bio_long: "With over two decades of experience in construction and facility renovation, Matt Radcliff leads Radcliff Construction Group with a hands-on approach and a simple philosophy — build lasting relationships by delivering results that earn trust. Starting his career in the field, Matt developed a deep understanding of craftsmanship, communication, and accountability — principles that still guide every RCG project today.\n\nUnder his leadership, RCG has become a trusted partner for healthcare, commercial, and institutional clients across the region. Matt is known for his focus on safety, quality, and compliance — ensuring that even the most complex renovations are completed efficiently and with minimal disruption to operations. His leadership style blends technical precision with a genuine commitment to people — clients, crews, and communities alike.",
    },
    {
      anchor_id: "tony-kelly",
      name: "Tony Kelly",
      title: "Vice President",
      headshot_url: "/images/team/tony-kelly.jpg",
      bio_short: "Entrepreneurial leader with deep operational discipline—focused on safe, efficient execution and client satisfaction.",
      bio_long: "Tony Kelly brings nearly two decades of entrepreneurial leadership to Radcliff Construction Group. Before joining RCG, he co-founded and led A&A Lawncare & Landscaping, growing it from a small local business into one of the region's most recognized commercial service providers. Through that experience, Tony developed a deep understanding of operations, workforce management, and customer relationships — skills that translate directly into RCG's commitment to consistent quality and client satisfaction.\n\nAt RCG, Tony focuses on project execution and operational excellence. His background in running a large, service-driven organization gives him a unique ability to balance field realities with client expectations — ensuring every job is handled safely, efficiently, and to standard. Known for his approachable leadership and steady reliability, Tony plays a key role in maintaining RCG's culture of accountability, teamwork, and trusted delivery.",
    },
    {
      anchor_id: "chris-radcliff",
      name: "Chris Radcliff",
      title: "Vice President",
      headshot_url: "/images/team/chris-radcliff.jpg",
      bio_short: "Executive experience across healthcare, commercial, and professional sectors—driving predictable, compliant delivery.",
      bio_long: "Chris Radcliff brings executive-level experience and a multi-industry perspective to RCG's leadership team. His background spans healthcare, commercial, and professional services, where he directed operations and client relationships at the executive level. That experience shapes his disciplined approach to project delivery — combining business insight with an operational understanding of what it takes to keep facilities running safely and efficiently.\n\nAt RCG, Chris bridges strategy and execution. He focuses on scope clarity, proactive communication, and keeping teams aligned — ensuring that projects stay predictable, compliant, and client-centered from start to finish. His leadership reinforces RCG's reputation for professionalism and reliability across sensitive environments where downtime isn't an option.",
    },
  ];

  // Smooth scroll to anchor on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="mb-6 uppercase text-white">Meet the Team</h1>
          <p className="text-xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed">
            Hands-on leadership committed to safety, predictability, and partnership.
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Our leadership team blends field-tested construction experience, executive operations, and entrepreneurial drive—so your projects run safely, smoothly, and on schedule.
          </p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <article
                key={member.anchor_id}
                id={member.anchor_id}
                className="bg-card rounded-none shadow-md hover:shadow-xl transition-all duration-300 scroll-mt-32"
              >
                <div className="p-6 flex flex-col items-center">
                  <div className="w-40 h-40 mb-6 overflow-hidden rounded-full">
                    <img
                      src={member.headshot_url}
                      alt={`Photo of ${member.name}, ${member.title} of Radcliff Construction Group`}
                      className={`w-full h-full object-cover ${
                        member.name === "Matt Radcliff" ? "scale-125 object-[center_50%]" : ""
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
                  <Accordion type="single" collapsible className="w-full">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-light-grey">
        <div className="container mx-auto px-6 lg:px-20 text-center">
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
