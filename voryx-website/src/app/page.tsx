'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, MapPin, Users, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/video-poster.jpg"
          >
            <source 
              src="https://media.blacktomato.com/2025%2F02%2Fblack-tomato-homepage.mp4" 
              type="video/mp4" 
            />
            {/* Fallback gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
          </video>
          
          {/* Video overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-6 text-shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, delay: 0.7 }}
            >
              VORYX
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.3em] text-voryx-accent mb-8"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1, delay: 1 }}
            >
              BEYOND REACH
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              Elite expeditions to the world's most remote destinations. We create transformative 
              journeys that push the boundaries of exploration.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <Link
                href="/routes"
                className="group inline-flex items-center px-10 py-5 bg-voryx-accent text-black font-bold tracking-wide hover:bg-white transition-all duration-300 text-lg shadow-2xl"
              >
                EXPLORE ROUTES
                <ChevronRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </Link>
              
              <Link
                href="/atlas"
                className="inline-flex items-center px-10 py-5 border-2 border-white/80 text-white hover:bg-white/10 hover:border-voryx-accent transition-all duration-300 text-lg backdrop-blur-sm"
              >
                VIEW ATLAS
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-voryx-accent transition-colors"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-4 bg-white/70 rounded-full mt-3"
            />
          </motion.div>
          <p className="text-white/70 text-xs tracking-wider mt-2">SCROLL</p>
        </motion.div>

        {/* Corner Navigation Dots (Optional Elegant Touch) */}
        <div className="absolute bottom-8 right-8 hidden lg:flex flex-col space-y-2">
          {[1, 2, 3, 4].map((dot) => (
            <div 
              key={dot}
              className="w-2 h-2 bg-white/30 rounded-full hover:bg-voryx-accent transition-colors cursor-pointer"
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide">
              Beyond Conventional Travel
            </h2>
            <div className="w-24 h-1 bg-voryx-accent mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              VORYX expeditions are carefully crafted to challenge perspectives, 
              contribute to scientific understanding, and create lasting impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <MapPin className="w-12 h-12" />,
                title: "Uncharted Territories",
                description: "Access to remote locations that few have experienced, with expert local guides and comprehensive safety protocols."
              },
              {
                icon: <Globe className="w-12 h-12" />,
                title: "Scientific Collaboration",
                description: "Every expedition contributes to geographical research, climate data collection, and cultural documentation."
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Transformative Experiences",
                description: "Small group expeditions designed to challenge assumptions and create profound personal transformation."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group text-center"
              >
                <div className="bg-voryx-gray border border-white/10 p-10 hover:border-voryx-accent/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className="text-voryx-accent mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-black via-voryx-gray to-black">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-wide">
              Become a Co-Author of Our Generation's Archive
            </h2>
            <div className="w-32 h-1 bg-voryx-accent mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join VORYX and contribute to a living document of exploration, 
              discovery, and human resilience in the world's most challenging environments.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-12 py-6 bg-voryx-accent text-black font-bold tracking-wide hover:bg-white transition-all duration-300 text-xl shadow-2xl"
              >
                JOIN VORYX
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
