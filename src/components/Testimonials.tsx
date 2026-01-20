import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_title: string;
  company_description: string;
  industry: string | null;
  project_metrics: string | null;
  display_order: number;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Testimonial[];
    },
  });

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [testimonials]);

  // Reset index when testimonials change
  useEffect(() => {
    if (testimonials && currentIndex >= testimonials.length) {
      setCurrentIndex(0);
    }
  }, [testimonials, currentIndex]);

  if (isLoading) {
    return (
      <section className="py-24 bg-card">
        <PageContainer>
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="w-12 h-12 mx-auto mb-8 rounded-full" />
            <Skeleton className="h-32 w-full mb-8" />
            <Skeleton className="h-1 w-24 mx-auto mb-6" />
            <Skeleton className="h-6 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        </PageContainer>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-card">
      <PageContainer>
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 text-secondary mx-auto mb-8" />
          
          <blockquote className="mb-8">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
              "{current.quote}"
            </p>
            <div className="h-1 w-24 bg-secondary mx-auto mb-6" />
            <footer>
              <p className="font-heading font-semibold text-lg mb-1">
                — {current.author_name}, {current.author_title}
              </p>
              <p className="text-muted-foreground text-sm">
                {current.company_description}
              </p>
              {current.project_metrics && (
                <p className="text-muted-foreground text-xs mt-1">
                  {current.project_metrics}
                </p>
              )}
            </footer>
          </blockquote>

          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-secondary w-8"
                    : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default Testimonials;
