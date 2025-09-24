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
            className="video-background"
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
              className="hero-title tracking-wider mb-6 text-shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, delay: 0.7 }}
            >
              VORYX
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle text-voryx-accent mb-8"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1, delay: 1 }}
            >
              BEYOND REACH
            </motion.p>
            
            <motion.p 
              className="hero-description text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
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
                className="hero-button-primary group inline-flex items-center bg-voryx-accent text-black font-bold tracking-wide hover:bg-white transition-all duration-300 shadow-2xl"
              >
                EXPLORE ROUTES
                <ChevronRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={24} />
              </Link>
              
              <Link
                href="/atlas"
                className="hero-button-secondary inline-flex items-center border-2 border-white/80 text-white hover:bg-white/10 hover:border-voryx-accent transition-all duration-300 backdrop-blur-sm"
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
            <h2 className="section-title font-bold mb-8 tracking-wide">
              Beyond Conventional Travel
            </h2>
            <div className="w-24 h-1 mx-auto mb-8">
              <p className="section-subtitle text-gray-400 max-w-4xl mx-auto leading-relaxed pb-4">
                VORYX expeditions are carefully crafted to challenge perspectives, 
                contribute to scientific understanding, and create lasting impact.
              </p>
            </div>

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
                <div className="bg-voryx-gray border border-white/10 p-10 hover:border-voryx-accent/50 transition-all duration-500 group-hover:transform group-hover:scale-105 py-3 px-2">
                  <div className="text-voryx-accent mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title font-bold mb-6 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="feature-description text-gray-400 leading-relaxed">
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
            <h2 className="cta-title font-bold mb-8 tracking-wide">
              Become a Co-Author of Our Generation's Archive
            </h2>
            <div className="w-32 h-1 bg-voryx-accent mx-auto mb-8"></div>
            <p className="cta-description text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join VORYX and contribute to a living document of exploration, 
              discovery, and human resilience in the world's most challenging environments.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="cta-button inline-flex items-center bg-voryx-accent text-black font-bold tracking-wide hover:bg-white transition-all duration-300 shadow-2xl"
              >
                JOIN VORYX
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        /* Responsive Video Background */
        .video-background {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          z-index: -1;
          transform: translateX(-50%) translateY(-50%);
          object-fit: cover;
          object-position: center center;
        }

        /* Responsive Text Sizing */
        .hero-title {
          font-size: clamp(3rem, 12vw, 8rem);
          line-height: 0.9;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 4vw, 2rem);
          letter-spacing: 0.3em;
          margin-bottom: 2rem;
        }

        .hero-description {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          line-height: 1.6;
        }

        .hero-button-primary {
          padding: clamp(0.75rem, 2vw, 1.25rem) clamp(1.5rem, 4vw, 2.5rem);
          font-size: clamp(0.875rem, 2vw, 1.125rem);
        }

        .hero-button-secondary {
          padding: clamp(0.75rem, 2vw, 1.25rem) clamp(1.5rem, 4vw, 2.5rem);
          font-size: clamp(0.875rem, 2vw, 1.125rem);
        }

        .section-title {
          font-size: clamp(2rem, 6vw, 4rem);
          line-height: 1.1;
        }

        .section-subtitle {
          font-size: clamp(1rem, 3vw, 1.25rem);
        }

        .feature-title {
          font-size: clamp(1.25rem, 3vw, 1.5rem);
        }

        .feature-description {
          font-size: clamp(0.875rem, 2vw, 1.125rem);
        }

        .cta-title {
          font-size: clamp(2rem, 6vw, 3.5rem);
          line-height: 1.1;
        }

        .cta-description {
          font-size: clamp(1rem, 3vw, 1.25rem);
        }

        .cta-button {
          padding: clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem);
          font-size: clamp(1rem, 2.5vw, 1.25rem);
        }

        /* Mobile Portrait Optimization */
        @media (max-width: 480px) and (orientation: portrait) {
          .video-background {
            width: 180%;
            height: auto;
            min-height: 100%;
            object-position: center 30%;
          }
        }

        /* Mobile Landscape Optimization */
        @media (max-width: 896px) and (orientation: landscape) {
          .video-background {
            width: auto;
            height: 120%;
            min-width: 100%;
            object-position: center center;
          }
        }

        /* Tablet Optimization */
        @media (min-width: 481px) and (max-width: 1024px) {
          .video-background {
            width: 110%;
            height: auto;
            min-height: 100%;
            object-position: center center;
          }
        }

        /* Large Tablet and Small Desktop */
        @media (min-width: 1025px) and (max-width: 1366px) {
          .video-background {
            width: 100%;
            height: 100%;
            object-position: center center;
          }
        }

        /* Large Desktop */
        @media (min-width: 1367px) {
          .video-background {
            width: auto;
            height: 100%;
            min-width: 100%;
            object-position: center center;
          }
        }

        /* Ultra-wide screens */
        @media (min-width: 1920px) {
          .video-background {
            width: 100%;
            height: auto;
            min-height: 100%;
            object-position: center center;
          }
        }

        /* Text Shadow for Better Readability */
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6);
        }

        /* Color Definitions */
        .text-voryx-accent { color: #d4af37; }
        .bg-voryx-accent { background-color: #d4af37; }
        .bg-voryx-gray { background-color: #1a1a1a; }
        .border-voryx-accent { border-color: #d4af37; }
        .hover\\:bg-voryx-accent:hover { background-color: #d4af37; }
        .hover\\:border-voryx-accent:hover { border-color: #d4af37; }

        /* Smooth Transitions */
        * {
          transition: all 0.3s ease;
        }

        /* Prevent Horizontal Overflow */
        body {
          overflow-x: hidden;
        }

        /* Ensure Full Coverage */
        .hero-content {
          backdrop-filter: blur(1px);
        }
      `}</style>
    </div>
  )
}