import type { Metadata } from 'next'
import { AboutClient } from './AboutClient'

export const metadata: Metadata = {
  title: 'مازن المنقذ — Who is this guy? 🛡️',
  description:
    'Full-Stack .NET Developer | CS & AI Student at Benha University | Digital Egypt Pioneers | Building cool stuff and saving graduation seasons.',
  openGraph: {
    title: 'مازن المنقذ — The Savior Behind the Platform',
    description: 'Egyptian Gen-Z developer trying to save the graduation season before humanity collapses.',
    images: ['/images/mazen-galabeya.jpg'],
  },
}

export default function AboutPage() {
  return <AboutClient />
}
