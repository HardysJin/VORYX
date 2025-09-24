'use client'

import { motion } from 'framer-motion'

interface LoadingProps {
  message?: string
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <motion.div
          className="w-12 h-12 border-2 border-voryx-accent border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-gray-400 text-sm">{message}</p>
      </div>
    </div>
  )
}
