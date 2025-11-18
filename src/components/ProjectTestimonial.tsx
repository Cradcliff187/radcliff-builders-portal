import { Quote } from "lucide-react";

interface ProjectTestimonialProps {
  quote: string;
  author: string;
  title: string;
}

const ProjectTestimonial = ({ quote, author, title }: ProjectTestimonialProps) => {
  return (
    <section className="py-24 bg-light-grey">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 text-gold mx-auto mb-8" />
          <blockquote className="text-2xl md:text-3xl font-body text-charcoal leading-relaxed mb-8 italic">
            "{quote}"
          </blockquote>
          <div className="border-t-2 border-gold w-24 mx-auto mb-6"></div>
          <cite className="not-italic">
            <div className="text-lg font-heading font-semibold text-primary uppercase tracking-wide">
              {author}
            </div>
            <div className="text-sm text-muted-foreground mt-1">{title}</div>
          </cite>
        </div>
      </div>
    </section>
  );
};

export default ProjectTestimonial;
