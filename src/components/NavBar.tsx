"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-white font-semibold text-lg">
          MARKET-ANOMALY DETECTION
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              pathname === "/about" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            How it works
          </Link>
        </div>
      </div>
    </nav>
  )
}
