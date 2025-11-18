import * as React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends ButtonProps {}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="primary"
        className={cn("uppercase", className)}
        {...props}
      />
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";

export { PrimaryButton };

