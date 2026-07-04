"use client"

import React from "react"
import { motion, useReducedMotion } from "motion/react"

interface BaseAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

/**
 * FadeIn Component
 * Smoothly animates opacity from 0 to 1.
 */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.45,
}: BaseAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 1, 0.5, 1], // easeOut
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * SlideUp Component
 * Subtle vertical slide up transition coupled with fade in.
 */
interface SlideUpProps extends BaseAnimationProps {
  yOffset?: number
}

export function SlideUp({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  yOffset = 12,
}: SlideUpProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : yOffset }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1], // easeOutQuart
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScaleIn Component
 * Subtle scale expansion transition coupled with fade in.
 */
interface ScaleInProps extends BaseAnimationProps {
  scaleOffset?: number
}

export function ScaleIn({
  children,
  className = "",
  delay = 0,
  duration = 0.45,
  scaleOffset = 0.97,
}: ScaleInProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : scaleOffset }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerContainer Component
 * Orchestrates stagger propagation down to nested StaggerItem children.
 */
interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerChildren?: number
  delayChildren?: number
}

export function StaggerContainer({
  children,
  className = "",
  staggerChildren = 0.08,
  delayChildren = 0,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className={className}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
            delayChildren: shouldReduceMotion ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem Component
 * Animates in context of a parent StaggerContainer sequence.
 */
interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  yOffset?: number
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 12,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : yOffset,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 16,
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
