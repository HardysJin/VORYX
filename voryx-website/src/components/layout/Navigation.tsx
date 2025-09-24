'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'ABOUT', href: '/about' },
  { name: 'ROUTES', href: '/routes' },
  { name: 'ATLAS', href: '/atlas' },
  { name: 'SCIENCE', href: '/science' },
  { name: 'ARTICLES', href: '/articles' },
  { name: 'CONTACT', href: '/contact' }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // 监听滚动改变导航栏透明度
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 点击外部区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // ESC键关闭菜单
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-black bg-opacity-95 backdrop-blur-lg shadow-2xl' 
          : 'bg-transparent backdrop-blur-sm'
      }`}>
        <div className="container">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center h-20">
            {/* Logo - 左侧固定位置 */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="group flex items-center space-x-3 hover:opacity-80 transition-all duration-500"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-voryx-accent to-yellow-600 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <span className="text-black font-black text-sm">V</span>
                  </div>
                  <div className="absolute inset-0 w-8 h-8 bg-voryx-accent opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-500"></div>
                </div>
                <div className="transition-all duration-500 group-hover:translate-x-1">
                  <div className="text-white font-light text-lg tracking-[0.15em]">VORYX</div>
                  <div className="text-voryx-accent text-[10px] tracking-[0.2em] opacity-80">BEYOND REACH</div>
                </div>
              </Link>
            </div>

            {/* 导航菜单 - 右侧，避免重叠 */}
            <div className="flex-1 flex justify-end">
              <div className="flex items-center space-x-12">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative inline-flex items-center py-2 px-1"
                  >
                    {/* 高级悬停效果背景 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-voryx-accent via-opacity-10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100 rounded-sm"></div>
                    
                    {/* 文字 */}
                    <span className="relative text-white text-opacity-60 group-hover:text-white text-xs font-light tracking-[0.15em] transition-all duration-500 group-hover:tracking-[0.2em]">
                      {item.name}
                    </span>
                    
                    {/* 底部装饰线 */}
                    <div className="absolute bottom-0 left-0 right-0 h-px">
                      <div className="h-full bg-gradient-to-r from-transparent via-voryx-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex justify-between items-center h-16">
            {/* Logo - 移动端 */}
            <Link 
              href="/" 
              className="group flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
              onClick={closeMenu}
            >
              <div className="relative">
                <div className="w-7 h-7 bg-gradient-to-br from-voryx-accent to-yellow-600 flex items-center justify-center">
                  <span className="text-black font-black text-xs">V</span>
                </div>
                <div className="absolute inset-0 w-7 h-7 bg-voryx-accent opacity-20 blur-sm"></div>
              </div>
              <div>
                <div className="text-white font-light text-base tracking-wider">VORYX</div>
                <div className="text-voryx-accent text-[9px] tracking-widest opacity-80">BEYOND REACH</div>
              </div>
            </Link>

            {/* 高级汉堡菜单按钮 */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="group relative w-12 h-12 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {/* 按钮背景 */}
              <div className="absolute inset-0 bg-white bg-opacity-5 group-hover:bg-opacity-10 backdrop-blur-sm transition-all duration-500 rounded-full border border-white border-opacity-20 group-hover:border-voryx-accent group-hover:border-opacity-50"></div>
              
              {/* 图标 */}
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="text-white text-opacity-70 group-hover:text-white transition-colors duration-300">
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </div>
              </motion.div>
              
              {/* 装饰点 */}
              <div className="absolute top-1 right-1 w-1 h-1 bg-voryx-accent rounded-full opacity-60"></div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - 高级样式 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="lg:hidden bg-black bg-opacity-95 backdrop-blur-xl border-t border-white border-opacity-10"
            >
              <div className="container py-8">
                <div className="space-y-1">
                  {[{ name: 'HOME', href: '/' }, ...navItems].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        className="group block relative py-4 px-6 transition-all duration-500"
                        onClick={closeMenu}
                      >
                        {/* 悬停背景 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-voryx-accent from-opacity-5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-sm"></div>
                        
                        {/* 左侧装饰线 */}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 group-hover:w-1 h-8 bg-voryx-accent transition-all duration-500 rounded-r"></div>
                        
                        {/* 文字内容 */}
                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-white text-opacity-70 group-hover:text-white text-base font-light tracking-widest transition-all duration-500 group-hover:tracking-[0.2em]">
                              {item.name}
                            </span>
                          </div>
                          
                        </div>
                        
                        {/* 底部分隔线 */}
                        <div className="absolute bottom-0 left-6 right-6 h-px bg-white bg-opacity-5"></div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* 移动端底部信息 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-8 pt-6 border-t border-white border-opacity-10 text-center"
                >
                  <p className="text-white text-opacity-40 text-xs tracking-wider">
                    Elite expeditions beyond conventional reach
                  </p>
                  <div className="mt-2 w-8 h-px bg-voryx-accent mx-auto opacity-50"></div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 移动端背景遮罩 - 高级效果 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </>
  )
}
