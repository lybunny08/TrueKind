"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "large";
}

const buttonVariants = {
  default: "bg-black text-white hover:bg-[#1a1a1a] transition-colors active:bg-[#0a0a0a]",
  outline:
    "border border-black bg-transparent text-white hover:bg-black transition-colors active:bg-black",
  ghost: "text-black hover:bg-black/10 transition-colors",
  destructive: "bg-red-500 text-white hover:bg-red-600 transition-colors",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  default: "px-6 py-3 text-base",
  large: "px-8 py-4 text-lg",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  );
}