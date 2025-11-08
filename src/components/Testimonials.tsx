import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "What sets RCG apart isn't just their technical expertise—it's how they show up as true partners. They care about our facilities, our patients, and our mission. When challenges arise, they solve them. When timelines matter, they deliver. That's why we keep coming back.",
    author: "Regional Healthcare Facilities Director",
    position: "Multi-Site Healthcare System",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 text-secondary mx-auto mb-8" />
          
          <blockquote className="mb-8">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
              "{current.quote}"
            </p>
            <div className="h-1 w-24 bg-secondary mx-auto mb-6" />
            <footer>
              <p className="font-heading font-semibold text-lg mb-1">
                {current.author}
              </p>
              <p className="text-muted-foreground text-sm">
                {current.position}
              </p>
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
      </div>
    </section>
  );
};

export default Testimonials;
