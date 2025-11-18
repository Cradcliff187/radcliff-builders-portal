import { ClipboardList, Calendar, Hammer, CheckSquare } from "lucide-react";
import PageContainer from "@/components/PageContainer";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Consultation",
    description: "Assess needs, review compliance, develop project scope.",
  },
  {
    icon: Calendar,
    number: "02",
    title: "Planning",
    description: "Strategic scheduling and resource allocation tailored to your operations.",
  },
  {
    icon: Hammer,
    number: "03",
    title: "Execution",
    description: "Expert craftsmanship with minimal disruption and strict compliance.",
  },
  {
    icon: CheckSquare,
    number: "04",
    title: "Closeout",
    description: "Final inspections and documentation for seamless operations.",
  },
];

const Process = () => {
  return (
    <section className="py-24 bg-background">
      <PageContainer>
        <div className="text-center mb-16">
          <h2 className="mb-4 uppercase">Our Proven Process</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A streamlined approach that delivers exceptional results while maintaining your facility's operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-secondary/30" />
              )}
              
              <div className="relative bg-white rounded-none shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-none bg-secondary text-white flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <h3 className="mb-3 uppercase text-xl">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default Process;
