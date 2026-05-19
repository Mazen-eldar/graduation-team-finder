'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
  color: string
}

const COLORS = ['#00f5ff', '#b44fff', '#ff2d78', '#39ff14', '#ff6a00']

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, raf = 0
    let particles: Particle[] = []
    const mouse = { x: -999, y: -999 }

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    const makeParticle = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.08,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0,245,255,0.025)'
      ctx.lineWidth = 0.5
      const s = 64
      for (let x = 0; x < W; x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += s) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
    }

    const drawBlobs = () => {
      const blobs = [
        { x: W * 0.85, y: H * 0.1, r: 300, color: '#00f5ff' },
        { x: W * 0.1,  y: H * 0.7, r: 220, color: '#b44fff' },
        { x: W * 0.6,  y: H * 0.5, r: 160, color: '#ff2d78' },
      ]
      blobs.forEach(b => {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, b.color + '20')
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill()
      })
    }

    const connectParticles = () => {
      const maxD = 120
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.hypot(dx, dy)
          if (d < maxD) {
            ctx.strokeStyle = `rgba(0,245,255,${(1 - d / maxD) * 0.05})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      drawGrid()
      drawBlobs()

      for (const p of particles) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 100) { p.vx += (dx / d) * 0.3; p.vy += (dy / d) * 0.3 }
        p.vx *= 0.98; p.vy *= 0.98
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) Object.assign(p, makeParticle())

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }

      connectParticles()
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }

    resize()
    particles = Array.from({ length: 140 }, makeParticle)
    frame()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove) }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden />
}
