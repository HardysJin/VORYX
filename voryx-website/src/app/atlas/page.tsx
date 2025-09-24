'use client'

import { motion } from 'framer-motion'

export default function Atlas() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
              Atlas
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              This page is currently under development. Check back soon for updates.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
