import { Hero } from "@/components/hero"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Contact />
      <Footer />
    </main>
  )
}
