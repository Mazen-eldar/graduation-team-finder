'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const [imgHover, setImgHover] = useState(false)

  return (
    <footer className="relative z-10 border-t" style={{ borderColor: 'var(--glass-border)' }}>
      {/* Built-by mini card */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 pt-12 pb-6">
        <div
          className="glass-card overflow-hidden mb-10"
          style={{ borderColor: 'rgba(180,79,255,0.2)' }}
        >
          <div className="flex items-center gap-0">
            {/* Suit thumbnail */}
            <div
              className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden cursor-pointer"
              onMouseEnter={() => setImgHover(true)}
              onMouseLeave={() => setImgHover(false)}
            >
              <Image
                src={imgHover ? '/images/mazen-galabeya.jpg' : '/images/mazen-suit.jpg'}
                alt="Mazen Eldar"
                fill
                className="object-cover object-top transition-all duration-500"
                sizes="96px"
              />
            </div>
            {/* Info */}
            <div className="px-5 py-4 flex-1 text-right">
              <p className="text-[10px] font-grotesk uppercase tracking-widest mb-1" style={{ color: 'var(--neon-purple)' }}>
                Built &amp; designed by
              </p>
              <p className="font-black text-base sm:text-lg leading-tight">
                Mazen Eldar{' '}
                <span style={{
                  background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>🛡️</span>
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                CS & AI Student · Benha University
              </p>
            </div>
            {/* Actions */}
            <div className="hidden sm:flex flex-col gap-2 px-5">
              <Link
                href="/about"
                className="text-xs font-cairo font-bold px-3 py-1.5 rounded-lg text-center"
                style={{
                  background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                  color: '#000', textDecoration: 'none',
                }}
              >
                About me
              </Link>
              <a
                href="https://github.com/Mazen-eldar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-grotesk font-bold px-3 py-1.5 rounded-lg text-center"
                style={{
                  background: 'var(--glass)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--neon-cyan)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="text-center">
          <motion.div
            className="text-2xl sm:text-3xl font-black mb-3"
            style={{
              background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🛡️ مازن المنقذ™
          </motion.div>

          <p className="text-sm mb-1" style={{ color: 'var(--text-dim)' }}>
            صُنع بـ <span style={{ color: 'var(--neon-pink)' }}>❤️</span> وكتير من القهوة لإنقاذ البشرية من أزمة التيمات
          </p>

          <p className="text-xs font-grotesk mb-6" style={{ color: 'var(--text-muted)' }}>
            © 2025 Mazen Eldar — All Teams Reserved
          </p>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            {[
              { href: '/', label: 'الرئيسية' },
              { href: '/explore', label: 'Explore Board' },
              { href: '/about', label: 'About Mazen' },
              { href: '/admin', label: 'Admin' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-grotesk transition-colors duration-200"
                style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--neon-cyan)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Next.js 15', 'Supabase', 'Framer Motion', 'TypeScript', 'Tailwind CSS'].map((badge) => (
              <span
                key={badge}
                className="text-[10px] px-2.5 py-1 rounded-full font-grotesk"
                style={{
                  background: 'var(--glass)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-muted)',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
