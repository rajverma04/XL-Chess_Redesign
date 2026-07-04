import React from "react"

export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-dark-purple via-background to-bg-dark-navy" />
      <div className="absolute -left-40 top-[-10%] size-[520px] rounded-full bg-brand/25 blur-[130px]" />
      <div className="absolute -right-32 top-1/3 size-[480px] rounded-full bg-brand-accent/20 blur-[130px]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  )
}
