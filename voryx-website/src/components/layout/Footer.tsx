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
