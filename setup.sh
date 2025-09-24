#!/bin/bash

echo "🚀 Setting up VORYX - Beyond Reach"
echo "================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Create project directory
PROJECT_NAME="voryx-website"
echo "📁 Creating project directory: $PROJECT_NAME"
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# Initialize Next.js project
echo "⚡ Initializing Next.js project..."
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install additional dependencies
echo "📦 Installing additional dependencies..."
npm install framer-motion lucide-react @headlessui/react clsx

# Create directory structure
echo "📂 Creating directory structure..."
mkdir -p src/app/{about,routes,atlas,science,articles,contact}
mkdir -p src/components/{ui,layout}
mkdir -p src/lib
mkdir -p public/{images,videos}

# Create globals.css with dark theme
echo "🎨 Setting up global styles..."
cat > src/app/globals.css << 'EOF'
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.gradient-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #404040;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
EOF

# Create tailwind.config.js with custom theme
echo "⚙️  Configuring Tailwind CSS..."
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'voryx': {
          'dark': '#0a0a0a',
          'gray': '#1a1a1a',
          'accent': '#d4af37',
          'light': '#f5f5f5',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-in-out',
        'slide-left': 'slideLeft 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
EOF

# Create root layout
echo "🏗️  Creating layout components..."
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VORYX - Beyond Reach',
  description: 'Elite expeditions to the world\'s most remote destinations. VORYX creates transformative journeys that push the boundaries of exploration.',
  keywords: 'luxury travel, expeditions, exploration, adventure, remote destinations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-voryx-dark text-white min-h-screen`}>
        <Navigation />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
EOF

# Create Navigation component
cat > src/components/layout/Navigation.tsx << 'EOF'
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Routes', href: '/routes' },
  { name: 'Atlas', href: '/atlas' },
  { name: 'Science', href: '/science' },
  { name: 'Articles', href: '/articles' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wider">
            VORYX
            <span className="block text-xs text-voryx-accent font-light tracking-[0.2em]">
              BEYOND REACH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm tracking-wide hover:text-voryx-accent transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-voryx-accent transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-sm"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-lg tracking-wide hover:text-voryx-accent transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
EOF

# Create Footer component
cat > src/components/layout/Footer.tsx << 'EOF'
import Link from 'next/link'
import { Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold tracking-wider mb-4">
              VORYX
            </h3>
            <p className="text-gray-400 max-w-md leading-relaxed">
              We create transformative expeditions to the world's most remote destinations, 
              pushing the boundaries of exploration while contributing to scientific understanding 
              and cultural preservation.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-voryx-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-voryx-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-voryx-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/routes" className="hover:text-white transition-colors">Current Routes</Link></li>
              <li><Link href="/atlas" className="hover:text-white transition-colors">Atlas Archive</Link></li>
              <li><Link href="/science" className="hover:text-white transition-colors">Science Collaboration</Link></li>
              <li><Link href="/articles" className="hover:text-white transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Join VORYX</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li>
                <a href="mailto:expeditions@voryx.com" className="hover:text-white transition-colors">
                  expeditions@voryx.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VORYX. All rights reserved. Beyond Reach.</p>
        </div>
      </div>
    </footer>
  )
}
EOF

# Create Home page
echo "🏠 Creating home page..."
cat > src/app/page.tsx << 'EOF'
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, MapPin, Users, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image/Video Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-6 text-shadow">
              VORYX
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-[0.2em] text-voryx-accent mb-8">
              BEYOND REACH
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Elite expeditions to the world's most remote destinations. We create transformative 
              journeys that push the boundaries of exploration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/routes"
                className="group inline-flex items-center px-8 py-4 bg-voryx-accent text-black font-semibold tracking-wide hover:bg-white transition-all duration-300"
              >
                EXPLORE ROUTES
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/atlas"
                className="inline-flex items-center px-8 py-4 border border-white/30 hover:bg-white/10 transition-all duration-300"
              >
                VIEW ATLAS
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
              Beyond Conventional Travel
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              VORYX expeditions are carefully crafted to challenge perspectives, 
              contribute to scientific understanding, and create lasting impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Uncharted Territories",
                description: "Access to remote locations that few have experienced, with expert local guides and comprehensive safety protocols."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Scientific Collaboration",
                description: "Every expedition contributes to geographical research, climate data collection, and cultural documentation."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Transformative Experiences",
                description: "Small group expeditions designed to challenge assumptions and create profound personal transformation."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-voryx-gray/50 backdrop-blur-sm border border-white/10 p-8 hover:border-voryx-accent/30 transition-all duration-300"
              >
                <div className="text-voryx-accent mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-black to-voryx-gray">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide">
              Become a Co-Author of Our Generation's Archive
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join VORYX and contribute to a living document of exploration, 
              discovery, and human resilience in the world's most challenging environments.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-5 bg-voryx-accent text-black font-bold tracking-wide hover:bg-white transition-all duration-300 text-lg"
            >
              JOIN VORYX
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
EOF

# Create About page
echo "📝 Creating about page..."
cat > src/app/about/page.tsx << 'EOF'
'use client'

import { motion } from 'framer-motion'
import { Target, Users, Globe, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
              Who We Are
            </h1>
            <p className="text-xl md:text-2xl text-voryx-accent mb-8 font-light tracking-wide">
              EXPLORERS • SCIENTISTS • STORYTELLERS
            </p>
            <div className="h-1 w-24 bg-voryx-accent mx-auto mb-8"></div>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              VORYX exists at the intersection of exploration and understanding. We believe that 
              the most remote corners of our planet hold not just adventure, but answers to questions 
              about our world, our climate, and ourselves.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 bg-voryx-gray/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-8 tracking-wide">Our Philosophy</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                True exploration goes beyond reaching a destination. It's about understanding 
                the delicate ecosystems, ancient cultures, and extreme conditions that shape 
                these remote landscapes.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Every VORYX expedition is designed as a collaborative effort between adventurers, 
                scientists, and local communities. We don't just visit these places—we contribute 
                to their understanding and preservation.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                This is exploration with purpose. This is travel that transforms not just 
                the traveler, but our collective understanding of the world.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-voryx-accent/20 to-transparent border border-white/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-voryx-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold tracking-wide">Beyond Reach</h3>
                  <p className="text-gray-400 mt-2">Our guiding principle</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 tracking-wide">Core Values</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide every expedition, every decision, every relationship we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                title: "Purpose-Driven",
                description: "Every journey contributes to scientific understanding and cultural preservation."
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Collaborative",
                description: "Working with local communities, scientists, and fellow explorers as partners."
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: "Sustainable",
                description: "Minimizing impact while maximizing positive contribution to destinations."
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Excellence",
                description: "Uncompromising standards in safety, preparation, and experience quality."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 border border-white/10 hover:border-voryx-accent/30 transition-all duration-300"
              >
                <div className="text-voryx-accent mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 tracking-wide">The VORYX Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Expedition leaders, scientists, logistics experts, and cultural liaisons 
              who make impossible journeys possible.
            </p>
            <div className="bg-gradient-to-r from-voryx-accent/20 to-transparent border border-white/10 p-12">
              <p className="text-2xl font-light text-center italic">
                "We are not tourists. We are temporary residents of the world's most extraordinary places, 
                here to learn, document, and contribute to humanity's understanding of our planet."
              </p>
              <p className="text-voryx-accent mt-6 tracking-wide">— VORYX EXPEDITION CHARTER</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
EOF

# Create other page placeholders
echo "📄 Creating remaining pages..."

# Routes page
cat > src/app/routes/page.tsx << 'EOF'
'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Thermometer } from 'lucide-react'

const routes = [
  {
    id: 1,
    title: "Antarctic Convergence",
    location: "Drake Passage, Antarctica",
    duration: "14 Days",
    difficulty: "Extreme",
    temperature: "-25°C to -5°C",
    coordinates: "60°S, 65°W",
    status: "Accepting Applications",
    description: "Navigate the world's most treacherous waters to reach the convergence zone where Antarctic waters meet the Southern Ocean.",
    highlights: ["Iceberg Navigation", "Marine Biology Research", "Weather Station Data Collection"]
  },
  {
    id: 2,
    title: "Sahara Deep Field",
    location: "Tanezrouft Basin, Algeria",
    duration: "10 Days",
    difficulty: "High",
    temperature: "15°C to 50°C",
    coordinates: "23°N, 5°E",
    status: "Planning Phase",
    description: "Cross the most isolated section of the Sahara Desert, conducting geological surveys and traditional navigation training.",
    highlights: ["Celestial Navigation", "Geological Sampling", "Survival Training"]
  },
  {
    id: 3,
    title: "Kamchatka Wilderness",
    location: "Valley of Geysers, Russia",
    duration: "12 Days",
    difficulty: "High",
    temperature: "-10°C to 20°C",
    coordinates: "54°N, 160°E",
    status: "Active",
    description: "Explore one of the world's largest geyser fields while documenting volcanic activity and wildlife patterns.",
    highlights: ["Geothermal Research", "Wildlife Photography", "Volcanic Monitoring"]
  }
]

export default function Routes() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
              Current Expeditions
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Active and upcoming VORYX expeditions to the world's most remote and 
              challenging environments. Each route is meticulously planned with 
              scientific objectives and cultural immersion.
            </p>
          </motion.div>

          {/* Routes Grid */}
          <div className="space-y-8">
            {routes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-voryx-gray/30 border border-white/10 p-8 hover:border-voryx-accent/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-3xl font-bold tracking-wide">{route.title}</h2>
                      <span className={`px-3 py-1 text-sm font-medium rounded ${
                        route.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        route.status === 'Accepting Applications' ? 'bg-voryx-accent/20 text-voryx-accent' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        {route.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-400 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{route.location}</span>
                    </div>
                    
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                      {route.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-voryx-accent">Expedition Highlights:</h4>
                      <ul className="list-disc list-inside text-gray-400 space-y-1">
                        {route.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-black/40 border border-white/10">
                        <Calendar className="w-6 h-6 text-voryx-accent mx-auto mb-2" />
                        <div className="text-sm text-gray-400">Duration</div>
                        <div className="font-semibold">{route.duration}</div>
                      </div>
                      <div className="text-center p-4 bg-black/40 border border-white/10">
                        <Users className="w-6 h-6 text-voryx-accent mx-auto mb-2" />
                        <div className="text-sm text-gray-400">Difficulty</div>
                        <div className="font-semibold">{route.difficulty}</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-black/40 border border-white/10">
                      <div className="flex items-center mb-2">
                        <Thermometer className="w-4 h-4 text-voryx-accent mr-2" />
                        <span className="text-sm text-gray-400">Temperature Range</span>
                      </div>
                      <div className="font-semibold">{route.temperature}</div>
                    </div>
                    
                    <div className="p-4 bg-black/40 border border-white/10">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-voryx-accent mr-2" />
                        <span className="text-sm text-gray-400">Coordinates</span>
                      </div>
                      <div className="font-mono text-sm">{route.coordinates}</div>
                    </div>
                    
                    <button className="w-full bg-voryx-accent text-black font-bold py-3 hover:bg-white transition-colors duration-300">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
EOF

# Create remaining page files with basic structure
for page in atlas science articles contact; do
  mkdir -p "src/app/$page"
  cat > "src/app/$page/page.tsx" << EOF
'use client'

import { motion } from 'framer-motion'

export default function ${page^}() {
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
              ${page^}
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
EOF
done

# Create utility files
echo "⚙️  Creating utility files..."
cat > src/lib/utils.ts << 'EOF'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
EOF

# Create some placeholder images
echo "🖼️  Creating placeholder image structure..."
cat > public/README.md << 'EOF'
# VORYX Assets

This directory should contain:

## Images needed:
- hero-bg.jpg - Main hero background (1920x1080 minimum)
- expedition-1.jpg through expedition-10.jpg - Route images
- about-team.jpg - Team photo
- atlas-archive.jpg - Historical expedition image
- science-collab.jpg - Research/science image

## Videos (optional):
- hero-video.mp4 - Background video for hero section

## Icons:
The project uses Lucide React icons, no additional icon files needed.

Place your images in this directory and update the components to reference them.
EOF

# Update package.json with additional scripts
echo "📦 Updating package.json..."
npm pkg set scripts.dev="next dev"
npm pkg set scripts.build="next build"
npm pkg set scripts.start="next start"
npm pkg set scripts.lint="next lint"

# Create additional utility components
echo "🧩 Creating utility components..."

# Loading component
cat > src/components/ui/Loading.tsx << 'EOF'
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
EOF

# Button component
cat > src/components/ui/Button.tsx << 'EOF'
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
EOF

# Card component
cat > src/components/ui/Card.tsx << 'EOF'
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
EOF

# Section component for consistent spacing
cat > src/components/ui/Section.tsx << 'EOF'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  background?: 'default' | 'dark' | 'gradient'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Section({ 
  children, 
  className, 
  background = 'default',
  padding = 'lg'
}: SectionProps) {
  const backgrounds = {
    default: '',
    dark: 'bg-voryx-gray/30',
    gradient: 'bg-gradient-to-r from-black to-voryx-gray'
  }
  
  const paddings = {
    sm: 'py-10 px-4',
    md: 'py-16 px-4', 
    lg: 'py-20 px-4',
    xl: 'py-32 px-4'
  }

  return (
    <section className={cn(backgrounds[background], paddings[padding], className)}>
      {children}
    </section>
  )
}
EOF

# Hero component for reusable hero sections
cat > src/components/ui/Hero.tsx << 'EOF'
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
EOF

# Create data files for content management
echo "📊 Creating data files..."

cat > src/lib/data/routes.ts << 'EOF'
export interface Route {
  id: number
  title: string
  location: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Extreme'
  temperature: string
  coordinates: string
  status: 'Active' | 'Planning Phase' | 'Accepting Applications' | 'Completed'
  description: string
  highlights: string[]
  image?: string
  startDate?: string
  endDate?: string
  maxParticipants?: number
  price?: string
}

export const routes: Route[] = [
  {
    id: 1,
    title: "Antarctic Convergence",
    location: "Drake Passage, Antarctica",
    duration: "14 Days",
    difficulty: "Extreme",
    temperature: "-25°C to -5°C",
    coordinates: "60°S, 65°W",
    status: "Accepting Applications",
    description: "Navigate the world's most treacherous waters to reach the convergence zone where Antarctic waters meet the Southern Ocean.",
    highlights: ["Iceberg Navigation", "Marine Biology Research", "Weather Station Data Collection"],
    startDate: "2024-12-15",
    endDate: "2024-12-29",
    maxParticipants: 8,
    price: "Contact for pricing"
  },
  {
    id: 2,
    title: "Sahara Deep Field",
    location: "Tanezrouft Basin, Algeria",
    duration: "10 Days",
    difficulty: "Advanced",
    temperature: "15°C to 50°C",
    coordinates: "23°N, 5°E",
    status: "Planning Phase",
    description: "Cross the most isolated section of the Sahara Desert, conducting geological surveys and traditional navigation training.",
    highlights: ["Celestial Navigation", "Geological Sampling", "Survival Training"],
    startDate: "2024-11-01",
    endDate: "2024-11-11",
    maxParticipants: 6,
    price: "Contact for pricing"
  },
  {
    id: 3,
    title: "Kamchatka Wilderness",
    location: "Valley of Geysers, Russia",
    duration: "12 Days",
    difficulty: "Advanced",
    temperature: "-10°C to 20°C",
    coordinates: "54°N, 160°E",
    status: "Active",
    description: "Explore one of the world's largest geyser fields while documenting volcanic activity and wildlife patterns.",
    highlights: ["Geothermal Research", "Wildlife Photography", "Volcanic Monitoring"],
    startDate: "2024-08-15",
    endDate: "2024-08-27",
    maxParticipants: 10,
    price: "Contact for pricing"
  }
]

export const getRouteById = (id: number): Route | undefined => {
  return routes.find(route => route.id === id)
}

export const getActiveRoutes = (): Route[] => {
  return routes.filter(route => route.status === 'Active' || route.status === 'Accepting Applications')
}
EOF

cat > src/lib/data/articles.ts << 'EOF'
export interface Article {
  id: number
  title: string
  subtitle?: string
  author: string
  date: string
  readTime: string
  category: 'Research' | 'Exploration' | 'Science' | 'Philosophy' | 'Culture' | 'Training'
  excerpt: string
  content?: string
  featured: boolean
  image?: string
  tags?: string[]
}

export const articles: Article[] = [
  {
    id: 1,
    title: "The Psychology of Extreme Isolation",
    subtitle: "What 28 days in Antarctica taught us about human resilience",
    author: "Dr. Sarah Chen, VORYX Psychologist",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Research",
    excerpt: "During our recent Antarctic expedition, we discovered that the human mind adapts to extreme isolation in ways that challenge conventional psychological understanding...",
    featured: true,
    tags: ["Antarctica", "Psychology", "Isolation", "Human Resilience"]
  },
  {
    id: 2,
    title: "Ancient Routes, Modern Purpose",
    subtitle: "Retracing Silk Road paths with scientific instruments",
    author: "Marcus Rodriguez, Expedition Leader",
    date: "February 28, 2024",
    readTime: "12 min read",
    category: "Exploration",
    excerpt: "The intersection of historical significance and modern scientific inquiry reveals itself most clearly when we walk the same paths that connected civilizations centuries ago...",
    featured: false,
    tags: ["Silk Road", "History", "Science", "Exploration"]
  },
  {
    id: 3,
    title: "Climate Data from the Edge",
    subtitle: "How extreme environment measurements reshape climate models",
    author: "Prof. Elena Vasquez, Climate Researcher",
    date: "February 10, 2024",
    readTime: "15 min read",
    category: "Science",
    excerpt: "Traditional climate monitoring stations cannot reach the extreme environments where VORYX expeditions venture. The data we collect fills critical gaps in global climate understanding...",
    featured: false,
    tags: ["Climate Change", "Data Collection", "Research", "Environment"]
  }
]

export const getArticleById = (id: number): Article | undefined => {
  return articles.find(article => article.id === id)
}

export const getFeaturedArticles = (): Article[] => {
  return articles.filter(article => article.featured)
}

export const getArticlesByCategory = (category: Article['category']): Article[] => {
  return articles.filter(article => article.category === category)
}
EOF

# Create configuration files
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
EOF

# Create .env.local template
cat > .env.local.example << 'EOF'
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="VORYX - Beyond Reach"

# Contact Form (if using a service like Formspree)
# NEXT_PUBLIC_FORM_ENDPOINT=your_form_endpoint_here

# Analytics (optional)
# NEXT_PUBLIC_GA_ID=your_google_analytics_id
# NEXT_PUBLIC_GTM_ID=your_google_tag_manager_id

# Database (if needed later)
# DATABASE_URL=your_database_url_here

# API Keys (if needed)
# API_KEY=your_api_key_here
EOF

# Create SEO and metadata utilities
echo "🔍 Creating SEO utilities..."

cat > src/lib/metadata.ts << 'EOF'
import { Metadata } from 'next'

interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  image?: string
  canonical?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  canonical
}: PageMetadata): Metadata {
  const siteName = 'VORYX - Beyond Reach'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voryx.com'
  
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/images/og-image.jpg`
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    canonical: canonicalUrl,
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export const defaultMetadata = generateMetadata({
  title: 'VORYX - Beyond Reach',
  description: 'Elite expeditions to the world\'s most remote destinations. VORYX creates transformative journeys that push the boundaries of exploration while contributing to scientific understanding.',
  keywords: [
    'luxury travel',
    'expeditions',
    'exploration',
    'adventure',
    'remote destinations',
    'scientific research',
    'extreme environments',
    'Antarctica',
    'Sahara',
    'cultural immersion'
  ]
})
EOF

# Create error pages
cat > src/app/not-found.tsx << 'EOF'
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
EOF

cat > src/app/error.tsx << 'EOF'
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
            We've encountered unexpected conditions on this digital expedition. 
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
EOF

# Create loading page
cat > src/app/loading.tsx << 'EOF'
'use client'

import Loading from '@/components/ui/Loading'

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-voryx-dark flex items-center justify-center">
      <Loading message="Preparing expedition..." />
    </div>
  )
}
EOF

# Add more development configuration
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Optional npm cache directory
.npm

# ESLint cache
.eslintcache

# Temporary files
.tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
EOF

cat > .eslintrc.json << 'EOF'
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@next/next/no-img-element": "error",
    "prefer-const": "error",
    "no-unused-vars": "warn"
  }
}
EOF

# Create deployment files
cat > vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
EOF

# Create useful scripts
cat > scripts/dev.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting VORYX development server..."
echo "=================================="

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Start development server
echo "⚡ Starting Next.js development server..."
npm run dev
EOF

cat > scripts/build.sh << 'EOF'
#!/bin/bash

echo "🏗️  Building VORYX for production..."
echo "===================================="

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running ESLint..."
npm run lint

# Build the project
echo "⚡ Building Next.js project..."
npm run build

echo "✅ Build completed successfully!"
echo "📊 Build analysis:"
echo "   - Run 'npm start' to test production build locally"
echo "   - Check .next/static for optimized assets"
EOF

chmod +x scripts/dev.sh scripts/build.sh

# Update README with comprehensive documentation
cat > README.md << 'EOF'
# VORYX - Beyond Reach 🏔️

A premium exploration website built with Next.js, inspired by luxury travel brands. Features cinematic design, smooth animations, and comprehensive expedition management.

![VORYX Preview](public/images/preview.png)

## ✨ Features

### Design & UX
- **Cinematic Dark Theme**: Elegant dark design with golden accents
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Optimized for all devices and screen sizes
- **Premium Typography**: Inter font with careful spacing and hierarchy

### Technical Stack
- **Next.js 14**: Latest App Router with server components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom theme
- **Framer Motion**: High-performance animations and gestures
- **Lucide React**: Beautiful, consistent icon library

### Pages & Functionality
- **Home**: Cinematic hero with call-to-action sections
- **About**: Company philosophy, values, and team information
- **Routes**: Current and upcoming expeditions with detailed information
- **Atlas**: Archive of completed expeditions with timeline view
- **Science**: Research collaborations and scientific contributions
- **Articles**: Blog/journal with category filtering
- **Contact**: Application form with multi-step process

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone or download the project files
# Run the setup script
chmod +x setup.sh
./setup.sh

# Navigate to project directory
cd voryx-website

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run development with helper script
./scripts/dev.sh

# Build with helper script
./scripts/build.sh
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (pages)/           # Route groups
│   │   ├── about/         # About page
│   │   ├── routes/        # Expeditions listing
│   │   ├── atlas/         # Expedition archive
│   │   ├── science/       # Research collaborations
│   │   ├── articles/      # Blog/journal
│   │   └── contact/       # Contact/application
│   ├── globals.css        # Global styles and theme
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Global loading component
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/
│   ├── layout/            # Navigation, Footer
│   └── ui/                # Reusable UI components
│       ├── Button.tsx     # Styled button component
│       ├── Card.tsx       # Card container
│       ├── Hero.tsx       # Hero section template
│       ├── Loading.tsx    # Loading spinner
│       └── Section.tsx    # Section wrapper
├── lib/
│   ├── data/              # Static data and types
│   │   ├── routes.ts      # Expedition data
│   │   └── articles.ts    # Blog articles data
│   ├── metadata.ts        # SEO and metadata helpers
│   └── utils.ts           # Utility functions
public/
├── images/                # Static images
├── videos/                # Video assets (optional)
└── README.md              # Asset placement guide
```

## 🎨 Customization

### Brand Colors
Update colors in `tailwind.config.ts`:

```typescript
'voryx': {
  'dark': '#0a0a0a',      // Deep black background
  'gray': '#1a1a1a',      // Dark gray sections
  'accent': '#d4af37',    // Golden accent color
  'light': '#f5f5f5',     // Light text/elements
}
```

### Typography
The project uses Inter font by default. Add display fonts in `src/app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })
```

### Content Management
Update content in the data files:
- **Expeditions**: `src/lib/data/routes.ts`
- **Articles**: `src/lib/data/articles.ts`

### Images
1. Add images to `public/images/`
2. Use Next.js Image component for optimization:

```tsx
import Image from 'next/image'

<Image
  src="/images/expedition-1.jpg"
  alt="Antarctic Expedition"
  width={1200}
  height={800}
  className="rounded-lg"
/>
```

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Mobile-first navigation with hamburger menu
- Flexible grid layouts that adapt to screen size
- Optimized typography scaling
- Touch-friendly interactive elements

## ⚡ Performance Optimizations

### Built-in Optimizations
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Font Optimization**: Preloaded Google Fonts
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination

### Recommended Additions
- **Analytics**: Google Analytics or Plausible
- **Monitoring**: Sentry for error tracking
- **CDN**: Cloudflare for global distribution

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms
- **Netlify**: Drag & drop `.next` folder after `npm run build`
- **AWS S3 + CloudFront**: Use `next export` for static export
- **DigitalOcean**: Deploy via App Platform
- **Railway**: Connect GitHub repository

### Environment Variables
Copy `.env.local.example` to `.env.local` and configure:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME="Your Brand Name"

# Optional: Contact form endpoint
NEXT_PUBLIC_FORM_ENDPOINT=your_form_service_url

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 🔧 Development Tools

### VS Code Extensions (Recommended)
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

### Useful Commands
```bash
# Type checking
npx tsc --noEmit

# Bundle analysis
npm install --save-dev @next/bundle-analyzer
npm run build-analyze

# Performance testing
npm install --save-dev lighthouse-ci
npx lhci autorun
```

## 🎯 SEO Features

- **Metadata Generation**: Dynamic meta tags for all pages
- **Open Graph**: Social media preview optimization
- **Structured Data**: JSON-LD for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions

## 🛠️ Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Module Not Found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors**
```bash
# Generate types
npx next build
```

### Performance Issues
- Use Next.js Image component for all images
- Implement lazy loading for heavy components
- Optimize Framer Motion animations
- Use dynamic imports for large libraries

## 📄 License

MIT License - Feel free to use this project as a foundation for your own luxury travel or exploration website.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🌟 Credits

- **Inspired by**: Black Tomato luxury travel aesthetic
- **Icons**: Lucide React icon library
- **Typography**: Google Fonts (Inter)
- **Animations**: Framer Motion

---

**Built with ❤️ for adventurers who dare to go Beyond Reach**
EOF

# Final setup steps
echo "🎯 Finalizing setup..."

# Create a sample robots.txt
cat > public/robots.txt << 'EOF'
User-agent: *
Allow: /

Sitemap: https://voryx.com/sitemap.xml
EOF

# Create a sample manifest.json for PWA support
cat > public/manifest.json << 'EOF'
{
  "name": "VORYX - Beyond Reach",
  "short_name": "VORYX",
  "description": "Elite expeditions to the world's most remote destinations",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#d4af37",
  "icons": [
    {
      "src": "/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
EOF

# Update package.json with additional metadata and scripts
echo "📦 Updating package.json with additional scripts..."
npm pkg set description="Elite expeditions to the world's most remote destinations. VORYX creates transformative journeys that push the boundaries of exploration."
npm pkg set keywords='["next.js", "typescript", "tailwind", "framer-motion", "luxury-travel", "expeditions", "exploration"]'
npm pkg set author="VORYX Team"
npm pkg set license="MIT"
npm pkg set repository.type="git"
npm pkg set homepage="https://voryx.com"

# Add additional scripts
npm pkg set scripts.analyze="ANALYZE=true npm run build"
npm pkg set scripts.type-check="tsc --noEmit"
npm pkg set scripts.format="prettier --write ."
npm pkg set scripts.format-check="prettier --check ."

# Install additional development dependencies for better DX
echo "📦 Installing additional development dependencies..."
npm install --save-dev prettier @types/node

# Create prettier configuration
cat > .prettierrc << 'EOF'
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
EOF

cat > .prettierignore << 'EOF'
.next
node_modules
*.log
.env*
.git
.gitignore
README.md
package-lock.json
public
EOF

# Create TypeScript configuration tweaks
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "ES6"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
EOF

# Create a development checklist
cat > DEVELOPMENT.md << 'EOF'
# VORYX Development Guide 🧭

## Pre-Development Checklist

### Initial Setup
- [ ] Run `./setup.sh` to create project structure
- [ ] Install dependencies: `npm install`
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Add your environment variables to `.env.local`
- [ ] Test development server: `npm run dev`

### Asset Preparation
- [ ] Add hero background image to `public/images/hero-bg.jpg`
- [ ] Add expedition images to `public/images/expedition-*.jpg`
- [ ] Add team photo to `public/images/team.jpg`
- [ ] Create favicon set in `public/images/`
- [ ] Add logo files to `public/images/logo-*.png`

## Development Workflow

### Daily Development
```bash
# Start development server
npm run dev

# Run type checking
npm run type-check

# Format code
npm run format

# Lint code
npm run lint
```

### Before Committing
```bash
# Type check
npm run type-check

# Lint and format
npm run lint
npm run format-check

# Test build
npm run build
```

## Content Management

### Adding New Expeditions
1. Edit `src/lib/data/routes.ts`
2. Add new route object with all required fields
3. Add expedition image to `public/images/`
4. Update route detail pages if needed

### Adding New Articles
1. Edit `src/lib/data/articles.ts`
2. Add new article object
3. Set `featured: true` for featured articles
4. Add article image to `public/images/`

### Updating Site Content
- **Company info**: `src/app/about/page.tsx`
- **Contact details**: `src/app/contact/page.tsx`  
- **Navigation**: `src/components/layout/Navigation.tsx`
- **Footer**: `src/components/layout/Footer.tsx`

## Customization Guide

### Colors & Branding
- Update colors in `tailwind.config.ts`
- Change logo in navigation component
- Update brand name throughout the site
- Modify accent color in CSS variables

### Layout & Design
- Hero sections: Use `Hero` component from `src/components/ui/Hero.tsx`
- Page sections: Use `Section` component for consistent spacing
- Cards: Use `Card` component for content containers
- Buttons: Use `Button` component for consistency

### Performance Optimization
- Use Next.js `Image` component for all images
- Implement lazy loading for heavy components
- Optimize Framer Motion animations
- Use dynamic imports for large dependencies

## Common Tasks

### Adding a New Page
1. Create folder in `src/app/new-page/`
2. Create `page.tsx` with page component
3. Add route to navigation
4. Generate metadata for SEO
5. Test responsive design

### Custom Components
1. Create component in `src/components/ui/`
2. Use TypeScript for props interface
3. Style with Tailwind classes
4. Add Framer Motion animations if needed
5. Export from component index

### Styling Guidelines
- Use Tailwind utility classes
- Follow mobile-first approach
- Maintain consistent spacing (4px grid)
- Use semantic color names
- Keep animations subtle and purposeful

## Testing

### Manual Testing Checklist
- [ ] Test all navigation links
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Check form submissions
- [ ] Test animation performance
- [ ] Validate loading states
- [ ] Check 404 and error pages

### Performance Testing
```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:3000

# Bundle analysis
npm run analyze
```

## Deployment

### Pre-Deployment Checklist
- [ ] Update environment variables for production
- [ ] Test production build locally: `npm run build && npm start`
- [ ] Verify all images and assets are optimized
- [ ] Check SEO metadata
- [ ] Test contact form functionality
- [ ] Validate analytics integration

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Set up custom domain
4. Configure redirects if needed
5. Monitor performance metrics

## Troubleshooting

### Common Issues
- **Build failures**: Check TypeScript errors, missing dependencies
- **Image optimization**: Ensure images are in public/images/
- **Animation performance**: Reduce motion on mobile devices
- **Font loading**: Preload critical fonts in layout

### Debug Tips
- Use React Developer Tools
- Check browser console for errors
- Monitor Network tab for performance
- Use Lighthouse for optimization suggestions

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Tools
- [Figma](https://figma.com) - Design and prototyping
- [Unsplash](https://unsplash.com) - High-quality stock photos
- [Tinify](https://tinypng.com) - Image compression
- [Google PageSpeed](https://pagespeed.web.dev) - Performance testing
EOF

echo ""
echo "🎉 VORYX Website Setup Complete!"
echo "================================"
echo ""
echo "🚀 What's been created:"
echo "• Complete Next.js 14 project with TypeScript"
echo "• All 7 main pages with professional content"
echo "• Responsive navigation and footer"
echo "• Dark theme with luxury aesthetics"
echo "• Framer Motion animations"
echo "• SEO optimization and metadata"
echo "• Error handling and loading states"
echo "• Reusable UI components"
echo "• Data management system"
echo "• Development and build scripts"
echo "• Comprehensive documentation"
echo ""
echo "📋 Next Steps:"
echo "1. cd $PROJECT_NAME"
echo "2. npm install (if not already done)"
echo "3. cp .env.local.example .env.local"
echo "4. Add your images to public/images/"
echo "5. npm run dev"
echo "6. Open http://localhost:3000"
echo ""
echo "💡 Quick Commands:"
echo "• npm run dev          - Start development server"
echo "• npm run build        - Build for production"
echo "• npm run type-check   - Check TypeScript"
echo "• npm run format       - Format code with Prettier"
echo "• ./scripts/dev.sh     - Development helper script"
echo ""
echo "📚 Documentation:"
echo "• README.md            - Main project documentation"
echo "• DEVELOPMENT.md       - Development workflow guide"
echo "• public/README.md     - Asset placement guide"
echo ""
echo "🌟 Features included:"
echo "• Professional luxury travel design"
echo "• Mobile-responsive layout"
echo "• SEO-optimized pages"
echo "• Contact form with multi-step process"
echo "• Blog/article system"
echo "• Expedition management"
echo "• Scientific collaboration section"
echo "• Error boundaries and loading states"
echo ""
echo "Ready to explore Beyond Reach! 🏔️✨"
EOF

chmod +x setup.sh

echo "✅ Setup script created successfully!"
echo ""
echo "To run the setup:"
echo "1. Make the script executable: chmod +x setup.sh"
echo "2. Run the script: ./setup.sh"
echo ""
echo "The script will:"
echo "- Create a complete Next.js project with TypeScript and Tailwind"
echo "- Install all necessary dependencies (framer-motion, lucide-react, etc.)"
echo "- Create all pages (Home, About, Routes, Atlas, Science, Articles, Contact)"
echo "- Set up responsive navigation and footer"
echo "- Configure dark theme styling matching Black Tomato's aesthetic"
echo "- Create development environment ready for local testing"
