'use client'

import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { Navbar } from '@/components/ui/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { FunnySection } from '@/components/sections/FunnySection'
import { DepartmentSection } from '@/components/sections/DepartmentSection'
import { FormSection } from '@/components/sections/FormSection'
import { SuccessScreen } from '@/components/sections/SuccessScreen'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      {/* Global overlays */}
      <LoadingScreen />
      <AnimatedBackground />
      <CursorGlow />
      <SuccessScreen />

      {/* Layout */}
      <Navbar />

      <main>
        <HeroSection />
        <FunnySection />
        <DepartmentSection />
        <FormSection />
      </main>

      <Footer />
    </>
  )
}
