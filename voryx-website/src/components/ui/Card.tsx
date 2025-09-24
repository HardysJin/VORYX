'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}

export default function Card({ children, className, hover = true, gradient = false }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      className={cn(
        "border border-white/10 p-6 transition-all duration-300",
        hover && "hover:border-voryx-accent/30",
        gradient ? "bg-gradient-to-br from-voryx-gray/50 to-transparent" : "bg-black/40",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
