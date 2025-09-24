'use client'

import { useState, useEffect } from 'react'
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
  const [isScrolled, setIsScrolled] = useState(false)

  // 监听滚动状态改变导航栏透明度
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 关闭移动端菜单
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-black/60 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="text-2xl font-bold tracking-wider hover:text-voryx-accent transition-colors duration-200"
              onClick={closeMenu}
            >
              VORYX
              <span className="block text-xs text-voryx-accent font-light tracking-[0.2em] mt-1">
                BEYOND REACH
              </span>
            </Link>

            {/* Desktop Navigation - 横排布局 */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm font-medium tracking-wide text-white/90 hover:text-voryx-accent transition-all duration-200 group"
                >
                  {item.name}
                  {/* 悬停下划线效果 */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-voryx-accent transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* CTA Button - 仅桌面端显示 */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="px-6 py-2 bg-voryx-accent text-black font-bold text-sm tracking-wide hover:bg-white transition-all duration-200"
              >
                JOIN EXPEDITION
              </Link>
            </div>

            {/* Tablet Navigation - 中等屏幕显示部分菜单 */}
            <div className="hidden md:flex lg:hidden items-center space-x-6">
              {navItems.slice(0, 4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium tracking-wide hover:text-voryx-accent transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-voryx-accent transition-colors p-2"
              >
                <Menu size={20} />
              </button>
            </div>

            {/* Mobile menu button - 手机端汉堡菜单 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-voryx-accent transition-colors p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-lg font-medium tracking-wide hover:text-voryx-accent transition-colors duration-200 py-2"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 border-t border-white/10"
                >
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-voryx-accent text-black font-bold tracking-wide hover:bg-white transition-colors"
                    onClick={closeMenu}
                  >
                    JOIN EXPEDITION
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  )
}
