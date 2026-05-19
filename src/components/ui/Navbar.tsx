'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'الرئيسية' },
  { href: '/explore', label: 'Explore' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function scrollToSection(id: string) {
    setMenuOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10"
      style={{ height: 60 }}
      animate={{
        background: scrolled ? 'rgba(6,6,16,0.92)' : 'rgba(6,6,16,0)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 z-10 flex-shrink-0">
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm"
          style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))' }}
        >
          🛡️
        </div>
        <span
          className="text-base sm:text-lg font-black"
          style={{
            background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          مازن المنقذ
        </span>
      </Link>

      {/* Desktop nav links — center */}
      <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                color: active ? 'var(--neon-cyan)' : 'var(--text-dim)',
                background: active ? 'rgba(0,245,255,0.08)' : 'transparent',
                border: active ? '1px solid rgba(0,245,255,0.2)' : '1px solid transparent',
                textDecoration: 'none',
                fontFamily: 'var(--font-grotesk)',
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = 'var(--text)' } }}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = 'var(--text-dim)' } }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* Desktop right */}
      <div className="hidden sm:flex items-center gap-3">
        <Link
          href="/admin"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 font-grotesk"
          style={{ color: 'var(--text-dim)', border: '1px solid var(--glass-border)', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,245,255,0.4)'; e.currentTarget.style.color = 'var(--neon-cyan)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text-dim)' }}
        >
          Admin
        </Link>
        <motion.button
          className="glow-btn text-sm font-bold px-4 py-2 rounded-xl"
          style={{ fontFamily: 'var(--font-cairo)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            if (pathname === '/') {
              scrollToSection('departments')
            } else {
              window.location.href = '/#departments'
            }
          }}
        >
          سجّلني 🙏
        </motion.button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden flex flex-col justify-center gap-1.5 p-2 z-10"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: 36, height: 36 }}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-0.5 w-5 rounded"
            style={{ background: 'var(--text-dim)', transformOrigin: 'center' }}
            animate={
              menuOpen
                ? i === 0 ? { rotate: 45, y: 8 }
                  : i === 1 ? { opacity: 0, scaleX: 0 }
                  : { rotate: -45, y: -8 }
                : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.2 }}
          />
        ))}
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-[60px] left-0 right-0 sm:hidden flex flex-col gap-2 p-4"
            style={{
              background: 'rgba(6,6,16,0.97)',
              borderBottom: '1px solid var(--glass-border)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className="text-sm font-bold py-3 rounded-xl text-center w-full"
              style={{
                background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-cairo)',
              }}
              onClick={() => {
                setMenuOpen(false)
                if (pathname === '/') scrollToSection('departments')
                else window.location.href = '/#departments'
              }}
            >
              سجّلني 🙏
            </motion.button>
            {[...NAV_LINKS, { href: '/admin', label: 'Admin Dashboard' }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold py-2.5 rounded-xl text-center block"
                style={{
                  background: pathname === link.href ? 'rgba(0,245,255,0.08)' : 'var(--glass)',
                  color: pathname === link.href ? 'var(--neon-cyan)' : 'var(--text-dim)',
                  border: `1px solid ${pathname === link.href ? 'rgba(0,245,255,0.2)' : 'var(--glass-border)'}`,
                  textDecoration: 'none',
                  fontFamily: 'var(--font-grotesk)',
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
