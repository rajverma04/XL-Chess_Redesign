"use client"

import React, { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      return
    }

    // 2. Initialize Lenis once
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // rapid exponential ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, // balanced scroll multiplier, no heavy float feeling
    })

    // 3. Integrate correctly with requestAnimationFrame
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // 4. Smooth scroll on anchor link clicks
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")
      
      if (link && link.hash && link.origin === window.location.origin) {
        // Find target element by hash
        const targetElement = document.querySelector(link.hash)
        if (targetElement) {
          e.preventDefault()
          lenis.scrollTo(link.hash, {
            offset: -16, // balance offsets
            immediate: false,
          })
          window.history.pushState(null, "", link.hash)
        }
      }
    }
    document.addEventListener("click", handleHashClick)

    // 5. Listen to prefers-reduced-motion changes dynamically
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.destroy()
        cancelAnimationFrame(rafId)
        document.removeEventListener("click", handleHashClick)
      }
    }
    mediaQuery.addEventListener("change", handleMediaQueryChange)

    // 6. Proper cleanup
    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
      document.removeEventListener("click", handleHashClick)
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  return <>{children}</>
}
