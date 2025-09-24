'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  children?: ReactNode
  backgroundImage?: string
}

export default function Hero({ title, subtitle, description, children, backgroundImage }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-6 text-shadow">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl font-light tracking-[0.2em] text-voryx-accent mb-8">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  )
}
