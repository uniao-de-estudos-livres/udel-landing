import { HeroSection } from "@/components/landing/hero-section"
// Comment out the DonationCTA import
// import { DonationCTA } from "@/components/landing/donation-cta"
import { FeaturesSection } from "@/components/landing/features-section"
import { ClubsSection } from "@/components/landing/clubs-section"
import { Footer } from "@/components/landing/footer"
// import { NewsUpdates } from "@/components/landing/news-updates"
// import { SupportersTable } from "@/components/landing/supporters-table"

export default function Home() {
  return (
    <div className="bg-black">
      <HeroSection />
      {/* Comment out the DonationCTA component usage */}
      {/* <DonationCTA /> */}
      <FeaturesSection />
      <ClubsSection />
      {/* <NewsUpdates news={newsData} /> */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SupportersTable
            supporters={currentSupporters}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section> */}
      <Footer />
    </div>
  )
}
