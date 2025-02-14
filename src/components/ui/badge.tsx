import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border border-gray-300 text-gray-800",
        secondary: "border border-gray-300 text-gray-800",
        destructive: "border border-red-500 text-red-500",
        outline: "border border-gray-300 text-gray-800",
        warning: "border border-yellow-500 text-yellow-500",
        success: "border border-green-500 text-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: string;
}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  const formattedText =
    typeof children === "string"
      ? children.charAt(0).toUpperCase() + children.slice(1).toLowerCase()
      : children;
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
       {/* Small colored dot */}
      <span
        className={cn("w-1 h-1 rounded-full mr-1" , {
          "bg-gray-400": variant === "default",
          "bg-gray-500": variant === "secondary",
          "bg-red-500": variant === "destructive",
          "bg-green-500": variant === "success",
          "bg-yellow-500": variant === "warning",
        })}
      />
      {formattedText}
     
      
    </div>
  );
}

export { Badge, badgeVariants };
