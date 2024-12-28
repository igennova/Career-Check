import { Navbar } from "@/components/navbar"
import Footer from "@/components/Footer"
import PlacementTimeline from "@/components/PlacementTimeline"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-50">
      <Navbar />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">Welcome to Career Check</h1>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Empowering students and professionals to make informed career decisions. 
            Explore our placement history and see how we have helped shape successful careers.
          </p>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">Placement Timeline</h2>
            <PlacementTimeline />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}