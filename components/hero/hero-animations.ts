import { Variants } from "motion/react"

// 1. Root grid container variants (depends on shouldReduceMotion)
export const createGridVariants = (shouldReduceMotion: boolean): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.48,
    },
  },
})

// 2. Left container variants (depends on shouldReduceMotion)
export const createLeftContainerVariants = (shouldReduceMotion: boolean): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.08,
    },
  },
})

// 3. Trust badge variant (static)
export const badgeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
}

// 4. Heading container variants (depends on shouldReduceMotion)
export const createHeadingContainerVariants = (shouldReduceMotion: boolean): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.08,
    },
  },
})

// 5. Heading group variants (depends on shouldReduceMotion)
export const createHeadingGroupVariants = (shouldReduceMotion: boolean): Variants => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
})

// 6. Supporting paragraph variants (depends on shouldReduceMotion)
export const createParagraphVariants = (shouldReduceMotion: boolean): Variants => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
})

// 7. CTA button group variants (static)
export const ctaContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
}

// 8. Stats container variants (depends on shouldReduceMotion)
export const createStatsContainerVariants = (shouldReduceMotion: boolean): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.05,
    },
  },
})

// 9. Stat item variant (static)
export const statItemVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
}

// 10. Chess puzzle card variants (depends on shouldReduceMotion)
export const createPuzzleCardVariants = (shouldReduceMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    x: shouldReduceMotion ? 0 : 40,
    scale: shouldReduceMotion ? 1 : 0.98,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
})
