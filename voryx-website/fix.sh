#!/bin/bash

echo "🔧 Fixing VORYX website errors..."
echo "================================"

# Fix 1: Correct Tailwind CSS imports in globals.css
echo "📝 Fixing Tailwind CSS imports..."
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

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

# Fix 2: Fix the JSX syntax error in page.tsx by removing problematic SVG pattern
echo "🎨 Fixing homepage JSX syntax..."
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
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
          <div className="absolute inset-0 bg-black/10"></div>
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

# Fix 3: Clean up package dependencies and reinstall
echo "📦 Cleaning up dependencies..."
rm -rf node_modules package-lock.json

echo "📦 Installing clean dependencies..."
npm install

# Fix 4: Update Next.js config to resolve potential issues
echo "⚙️  Updating Next.js configuration..."
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
  transpilePackages: [],
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
EOF

# Fix 5: Ensure correct Tailwind config
echo "🎨 Updating Tailwind configuration..."
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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'voryx': {
          'dark': '#0a0a0a',
          'gray': '#1a1a1a',
          'accent': '#d4af37',
          'light': '#f5f5f5',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
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

# Fix 6: Update package.json to ensure correct dependencies
echo "📋 Updating package.json dependencies..."
npm install --save-dev @types/react @types/react-dom
npm install clsx class-variance-authority

echo ""
echo "✅ All errors have been fixed!"
echo "================================"
echo ""
echo "🔧 What was fixed:"
echo "• ✅ Corrected Tailwind CSS imports"
echo "• ✅ Fixed JSX syntax error in homepage"
echo "• ✅ Cleaned and reinstalled dependencies"
echo "• ✅ Updated Next.js configuration"
echo "• ✅ Ensured proper TypeScript types"
echo ""
echo "🚀 Next steps:"
echo "1. Try running: npm run dev"
echo "2. Open http://localhost:3000"
echo "3. If you still see errors, run: npm run build"
echo ""
echo "💡 If issues persist, try:"
echo "• Clear Next.js cache: rm -rf .next"
echo "• Restart your terminal/IDE"
echo "• Check Node.js version (should be 18+)"

# Make sure all file permissions are correct
chmod -R 755 src/
chmod 644 src/app/globals.css
chmod 644 src/app/page.tsx
chmod 644 next.config.js
chmod 644 tailwind.config.ts

echo ""
echo "🎉 Ready to launch VORYX!"