"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost"
}

export const buttonVariants = {
  default:
    "bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer",
  outline:
    "rounded-md border border-solid border-border bg-transparent px-3 py-2 text-sm",
  ghost: "bg-transparent px-2 py-1 text-sm hover:bg-muted/50",
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants[variant], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
