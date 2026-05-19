'use client'

import { useRef, CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function MagneticButton({
  children,
  className = '',
  style,
  onClick,
  disabled,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const pos = useRef({ x: 0, y: 0 })

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current!.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    pos.current = { x: x * 0.18, y: y * 0.18 }
    ref.current!.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
  }

  function onLeave() {
    ref.current!.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      style={{ ...style, transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
