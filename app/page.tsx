import { HeroSection } from "@/components/landing/hero-section"
// import { DonationCTA } from "@/components/landing/donation-cta" // Disabled
import { FeaturesSection } from "@/components/landing/features-section"
import { ClubsSection } from "@/components/landing/clubs-section"
import { Footer } from "@/components/landing/footer"
// import { NewsUpdates } from "@/components/landing/news-updates"
// import { SupportersTable } from "@/components/landing/supporters-table" // Disabled

export default function Home() {
  return (
    <div className="bg-black">
      <HeroSection />
      {/* <DonationCTA /> */} {/* Disabled */}
      <FeaturesSection />
      <ClubsSection />
      {/* <NewsUpdates news={newsData} /> */}
      {/* Supporters table section commented out */}
      {/* <section className="py-16"> ... </section> */}
      <Footer />
    </div>
  )
}
