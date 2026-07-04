import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Noto_Sans_Symbols_2, Space_Grotesk } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

// Monochrome chess glyphs (U+2654–U+265F) so CSS color controls piece color.
const chessFont = Noto_Sans_Symbols_2({
  weight: '400',
  subsets: ['symbols'],
  variable: '--font-chess',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'XLCHESS — Build the Future of Online Chess',
  description:
    'A complete chess platform to play, learn, compete, and grow. Solve interactive puzzles and become part of the world’s #1 destination for chess.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#141a33',
}

import { SmoothScroll } from '@/components/layout/smooth-scroll'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geist.variable} ${spaceGrotesk.variable} ${chessFont.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

