"use client"

import React, { useEffect, useRef } from "react"
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate } from "motion/react"

interface AnimatedStatValueProps {
  value: number
  suffix?: string
  decimals?: number
  duration: number
}

export function AnimatedStatValue({ value, suffix = "", decimals = 0, duration }: AnimatedStatValueProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useMotionValue(0)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals) + suffix
  })

  useEffect(() => {
    if (shouldReduceMotion) {
      count.set(value)
      return
    }

    if (isInView) {
      const controls = animate(count, value, {
        duration: duration,
        ease: "easeOut",
      })
      return () => controls.stop()
    }
  }, [isInView, value, duration, shouldReduceMotion, count])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span aria-hidden="true">{rounded}</motion.span>
      <span className="sr-only">{value.toFixed(decimals) + suffix}</span>
    </span>
  )
}
