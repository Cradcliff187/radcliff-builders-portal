import { AlertCircle } from "lucide-react";

interface ContentComingSoonProps {
  title?: string;
  message?: string;
}

const ContentComingSoon = ({ 
  title = "Content In Progress", 
  message = "Detailed information for this section will be added soon." 
}: ContentComingSoonProps) => {
  return (
    <div className="bg-light-grey p-12 text-center rounded-none">
      <AlertCircle className="w-12 h-12 text-gold mx-auto mb-4" />
      <h3 className="text-xl font-heading font-semibold text-primary mb-2 uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-muted-foreground">
        {message}
      </p>
    </div>
  );
};

export default ContentComingSoon;
