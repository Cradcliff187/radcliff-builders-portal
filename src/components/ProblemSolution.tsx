import { XCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

const problems = [
  "Projects that run over budget with surprise change orders",
  "Contractors who disappear when problems arise",
  "Communication breakdowns and finger-pointing",
  "Disruptions that impact your operations and staff",
  "Compliance gaps that put your facility at risk",
];

const solutions = [
  "Fixed budgets with transparent pricing—no surprises",
  "One dedicated point of contact from start to finish",
  "Weekly updates and proactive problem-solving",
  "Phased construction to minimize operational impact",
  "ICRA & OSHA 30 certified before day one",
];

const ProblemSolution = () => {
  return (
    <section className="py-24 bg-light-grey">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        {/* Main Section Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-wider text-center text-primary mb-16">
          Tired of Contractors Who Overpromise and Underdeliver?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Problems Column */}
          <div className="bg-card rounded-none p-8 shadow-sm">
            <h3 className="text-xl md:text-2xl font-heading font-semibold uppercase tracking-wider text-primary mb-8">
              Sound Familiar?
            </h3>
            <ul className="space-y-5">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {problem}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="bg-card rounded-none p-8 shadow-sm border-l-4 border-secondary">
            <h3 className="text-xl md:text-2xl font-heading font-semibold uppercase tracking-wider text-secondary mb-8">
              There's a Better Way
            </h3>
            <ul className="space-y-5">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
                    {solution}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Ready to work with a contractor who actually delivers?
          </p>
          <Link to="/about">
            <SecondaryButton size="lg">
              See How We're Different
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
