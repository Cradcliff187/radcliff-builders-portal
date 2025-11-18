import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={cn("max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20", className)}>
      {children}
    </div>
  );
};

export default PageContainer;

