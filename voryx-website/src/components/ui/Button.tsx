'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = "font-bold tracking-wide transition-all duration-300 flex items-center justify-center"
  
  const variants = {
    primary: "bg-voryx-accent text-black hover:bg-white",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    outline: "border border-white/30 text-white hover:bg-white/10"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  )
}
