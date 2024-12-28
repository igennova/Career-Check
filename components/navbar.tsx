import Link from "next/link"

export function Navbar() {
  return (
    <nav className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              Career Check
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/placements" className="hover:text-gray-300">
              Placements
            </Link>
            <Link href="/analytics" className="hover:text-gray-300">
              Analytics
            </Link>
            <Link href="/internships" className="hover:text-gray-300">
              Internships
            </Link>
            <Link href="/alumini-connect" className="hover:text-gray-300">
              Alumni Connect
            </Link>
            <Link href="/about-us" className="hover:text-gray-300">
              About us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

