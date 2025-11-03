import { AlertCircle, CheckCircle } from "lucide-react";

const problems = [
  "Navigating complex healthcare regulations and compliance requirements",
  "Minimizing operational disruption during critical facility renovations",
  "Ensuring projects stay on budget and timeline without surprises",
  "Finding contractors who understand sensitive environment protocols",
];

const solutions = [
  "ICRA-certified team ensures full regulatory compliance from day one",
  "Strategic scheduling and containment protocols keep operations running smoothly",
  "Transparent project management with fixed timelines and detailed budgets",
  "25+ years specializing in healthcare, professional, and commercial spaces",
];

const ProblemSolution = () => {
  return (
    <section className="py-24 bg-light-grey">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Problems Column */}
          <div className="border-l-4 border-primary pl-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-primary" />
              <h2 className="uppercase text-primary">The Challenge</h2>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-none bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{problem}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="border-l-4 border-secondary pl-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-secondary" />
              <h2 className="uppercase text-secondary">Our Solution</h2>
            </div>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground leading-relaxed font-medium">{solution}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
