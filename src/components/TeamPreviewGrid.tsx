import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface TeamMember {
  name: string;
  title: string;
  headshot_url: string;
  bio_short: string;
  profile_href: string;
}

const TeamPreviewGrid = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Matt Radcliff",
      title: "President & Founder",
      headshot_url: "/images/team/matt-radcliff-2025.jpg",
      bio_short: "With 20+ years in construction, Matt leads RCG with a hands-on approach focused on trust, safety, and precision.",
      profile_href: "/team#matt-radcliff",
    },
    {
      name: "Tony Kelly",
      title: "Vice President",
      headshot_url: "/images/team/tony-kelly.jpg",
      bio_short: "Entrepreneurial leader with deep operational discipline—focused on safe, efficient execution and client satisfaction.",
      profile_href: "/team#tony-kelly",
    },
    {
      name: "Chris Radcliff",
      title: "Vice President",
      headshot_url: "/images/team/chris-radcliff.jpg",
      bio_short: "Executive experience across healthcare, commercial, and professional sectors—driving predictable, compliant delivery.",
      profile_href: "/team#chris-radcliff",
    },
  ];

  return (
    <section className="py-24 bg-light-grey">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="mb-6 uppercase">Meet the Team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hands-on leadership committed to safety, predictability, and partnership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member) => (
            <Link
              key={member.name}
              to={member.profile_href}
              className="group bg-card rounded-none shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="overflow-hidden">
                <div className="aspect-square w-full relative">
                  <img
                    src={member.headshot_url}
                    alt={`Photo of ${member.name}, ${member.title} of Radcliff Construction Group`}
                    className={`w-full h-full object-cover rounded-full p-8 group-hover:scale-105 transition-transform duration-500 ${
                      member.name === "Matt Radcliff" ? "object-[center_top]" : ""
                    }`}
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't exist
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=500&background=1B2B43&color=CF791D&bold=true`;
                    }}
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-2 uppercase text-xl">{member.name}</h3>
                <p className="text-secondary font-semibold mb-4">{member.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {member.bio_short}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" size="lg" asChild>
            <Link to="/team">View Full Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewGrid;
