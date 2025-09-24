'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AlertTriangle className="w-16 h-16 text-voryx-accent mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
            Expedition Interrupted
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
            We&apos;ve encountered unexpected conditions on this digital expedition. 
            Our technical team is working to resolve the situation.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center px-8 py-4 bg-voryx-accent text-black font-bold tracking-wide hover:bg-white transition-colors duration-300"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            RETRY EXPEDITION
          </button>
        </motion.div>
      </div>
    </div>
  )
}
