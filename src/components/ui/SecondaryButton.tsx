import * as React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

export interface SecondaryButtonProps extends ButtonProps {}

const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="secondary-button"
        className={cn("uppercase", className)}
        {...props}
      />
    );
  }
);
SecondaryButton.displayName = "SecondaryButton";

export { SecondaryButton };

