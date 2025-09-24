'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navItems = [
  'HOME', 'ABOUT', 'ROUTES', 'ATLAS', 'SCIENCE', 'ARTICLES', 'CONTACT'
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center items-center h-16">
          <div className="flex space-x-12">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                className="text-white text-opacity-90 hover:text-white text-xs font-light tracking-widest transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex justify-between items-center h-16">
          <div className="text-white font-bold text-xl">VORYX</div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black bg-opacity-95 backdrop-blur-md">
          <div className="px-8 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                className="block text-white text-opacity-90 hover:text-white text-sm font-light tracking-wider py-2"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
