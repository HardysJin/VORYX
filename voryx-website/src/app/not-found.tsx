'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-voryx-accent mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide">
            Beyond Our Mapped Territory
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
            You've ventured into uncharted digital territory. Even our most experienced 
            expedition leaders couldn't locate this page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-voryx-accent text-black font-bold tracking-wide hover:bg-white transition-colors duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              RETURN TO BASE CAMP
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 border border-white/30 hover:bg-white/10 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              GO BACK
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
