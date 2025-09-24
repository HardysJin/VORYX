'use client'

import Link from 'next/link'
import { Instagram, Twitter, Youtube, Linkedin, Music } from 'lucide-react'

const footerSections = [
  {
    title: 'VORYX',
    links: [
      { name: 'Start Planning', href: '/contact' },
      { name: 'Media Enquiries', href: '/contact' },
      { name: 'Get In Touch', href: '/contact' }
    ]
  },
  {
    title: 'USEFUL INFORMATION',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Booking Conditions', href: '/terms' },
      { name: 'Careers', href: '/careers' },
      { name: 'Frequently Asked Questions', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Regenerative Travel', href: '/sustainability' },
      { name: 'Sitemap', href: '/sitemap' },
    ]
  },
  {
    title: 'POPULAR DESTINATIONS',
    links: [
      { name: 'Antarctica', href: '/destinations/antarctica' },
      { name: 'Arctic', href: '/destinations/arctic' },
      { name: 'Sahara', href: '/destinations/sahara' },
      { name: 'Himalayas', href: '/destinations/himalayas' },
      { name: 'Siberia', href: '/destinations/siberia' },
      { name: 'The Remote Islands', href: '/destinations/remote-islands' }
    ]
  },
  {
    title: 'WHAT',
    links: [
      { name: 'Pursuit Of Discovery', href: '/what/discovery' },
      { name: 'Cultural Immersion', href: '/what/culture' },
      { name: 'Scientific Collaboration', href: '/what/science' },
      { name: 'Blink Camps', href: '/what/camps' },
      { name: 'Food Exploration', href: '/what/food' },
      { name: 'Atlas Archive', href: '/atlas' },
      { name: 'Beyond Reach', href: '/what/beyond-reach' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container-footer pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
                {section.title}
              </h3>
              <ul style={{ listStyleType: 'none', paddingLeft: '0' }} className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex space-x-6">
              <a 
                href="https://instagram.com/voryx" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com/voryx" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com/company/voryx" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://youtube.com/voryx" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://open.spotify.com/user/voryx" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Spotify"
              >
                <Music size={20} />
              </a>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} VORYX. All rights reserved. Beyond Reach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 
