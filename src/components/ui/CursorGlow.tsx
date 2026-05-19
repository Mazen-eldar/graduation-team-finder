'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -999, y: -999 })
  const target = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    let raf: number
    function animate() {
      pos.current.x += (target.current.x - pos.current.x) * 0.08
      pos.current.y += (target.current.y - pos.current.y) * 0.08
      if (glowRef.current) {
        glowRef.current.style.left = pos.current.x + 'px'
        glowRef.current.style.top = pos.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      {/* Large ambient glow */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 400,
          height: 400,
          background:
            'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)',
        }}
      />
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[2] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 6,
          height: 6,
          background: 'var(--neon-cyan)',
          boxShadow: '0 0 10px var(--neon-cyan)',
          transition: 'opacity 0.2s',
        }}
      />
    </>
  )
}
