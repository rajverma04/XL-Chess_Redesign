"use client"

import { motion } from "motion/react"
import { MessageCircle, Rss, Send } from "lucide-react"

const columns = [
  { title: "Play", links: ["Live games", "Play vs Computer", "Tournaments", "Puzzles"] },
  { title: "Learn", links: ["Lessons", "Openings", "Analysis", "Coaches"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
  { title: "Support", links: ["Help center", "Community", "Contact", "Status"] },
]

const socials = [
  { icon: Send, label: "Telegram", href: "#" },
  { icon: MessageCircle, label: "Discord", href: "#" },
  { icon: Rss, label: "Blog", href: "#" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-bg-footer">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)]"
        >
          {/* Brand */}
          <div className="max-w-xs col-span-full lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand to-brand-accent shadow-lg shadow-brand/30">
                <span className="text-2xl leading-none text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                  {"\u265E"}
                </span>
              </div>
              <div className="leading-none">
                <p className="font-display text-lg font-bold tracking-tight text-white">XLCHESS</p>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Excel at Chess
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/50 text-pretty">
              The complete platform to play, learn, and compete&mdash;built to become the world&apos;s
              #1 destination for chess.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:bg-brand hover:text-brand-foreground"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/50 transition hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} XLCHESS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <a href="#" className="transition hover:text-white/70">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white/70">
              Terms
            </a>
            <a href="#" className="transition hover:text-white/70">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
