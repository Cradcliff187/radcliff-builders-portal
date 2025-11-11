import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTeamMembers } from "@/hooks/useCMSContent";
import { Skeleton } from "@/components/ui/skeleton";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  headshot_url: string;
  bio_short: string;
  anchor_id: string;
}

const TeamPreviewGrid = () => {
  const { data: teamMembers, isLoading } = useTeamMembers();

  if (isLoading) {
    return (
      <section className="py-24 bg-light-grey">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="mb-6 uppercase">Meet the Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hands-on leadership committed to safety, predictability, and partnership.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 rounded-none" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

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
              key={member.id}
              to={`/team#${member.anchor_id}`}
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
