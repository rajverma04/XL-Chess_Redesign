"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-brand text-brand-foreground shadow-lg shadow-brand/30 hover:brightness-110",
        secondary: "border border-white/10 hover:border-white/25 bg-white/5 text-white backdrop-blur hover:bg-white/10",
        ghost: "text-white/80 hover:bg-white/5 hover:text-white",
        danger: "bg-wrong-red text-white hover:brightness-110 shadow-lg shadow-wrong-red/20",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-4 py-3 text-sm",
        lg: "px-7 py-3.5 text-base",
        icon: "p-2.5 aspect-square rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style">,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion()
    const isInteractive = !disabled && !isLoading

    // Coordinated parent-child motion states
    const buttonMotionVariants = {
      initial: {
        scale: 1,
        y: 0,
        boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
      },
      hover: {
        scale: shouldReduceMotion ? 1 : 1.025,
        y: shouldReduceMotion ? 0 : -2,
        boxShadow: variant === "primary"
          ? "0 12px 24px -3px rgba(147, 51, 234, 0.45), 0 4px 12px -4px rgba(147, 51, 234, 0.45)"
          : "0 0px 0px rgba(0, 0, 0, 0)",
      },
      tap: {
        scale: shouldReduceMotion ? 1 : 0.97,
        y: 0,
      },
    }

    const leftIconVariants = {
      hover: {
        scale: shouldReduceMotion ? 1 : 1.08,
        rotate: shouldReduceMotion ? 0 : 4,
      },
      initial: { scale: 1, rotate: 0 },
    }

    const rightIconVariants = {
      hover: { x: shouldReduceMotion ? 0 : 4 },
      initial: { x: 0 },
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        variants={isInteractive ? buttonMotionVariants : undefined}
        whileHover="hover"
        whileTap="tap"
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 22,
        }}
        initial="initial"
        animate="initial"
        {...(props as any)}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <motion.span
            variants={leftIconVariants}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="mr-2 inline-flex items-center"
          >
            {leftIcon}
          </motion.span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <motion.span
            variants={rightIconVariants}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="ml-2 inline-flex items-center"
          >
            {rightIcon}
          </motion.span>
        )}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
