import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "glass-button bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 glow-effect",
        destructive:
          "glass-button bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
        outline:
          "glass-button border border-glass-border bg-glass-secondary text-text-primary hover:bg-glass-accent hover:text-stellar-accent hover:scale-105",
        secondary:
          "glass-button bg-glass-secondary text-text-primary hover:bg-glass-accent hover:scale-105",
        ghost: "hover:bg-glass-secondary hover:text-stellar-accent rounded-2xl transition-all duration-300",
        link: "text-stellar-accent underline-offset-4 hover:underline",
        glass: "glass-button bg-glass-primary border border-glass-border text-text-primary hover:bg-glass-accent hover:scale-105 glow-effect",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
