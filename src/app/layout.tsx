import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'مازن المنقذ | Graduation Team Finder 🛡️',
  description:
    'لسه متسوح ومش لاقي تيم تخرج؟ تعالى يا فنان… أخوك مازن المنقذ عاملها عليك.',
  openGraph: {
    title: 'مازن المنقذ | Team Finder',
    description: 'الحل الوحيد لأزمة تيمات التخرج',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased" style={{ fontFamily: "'Cairo', sans-serif" }}>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(10,10,26,0.95)',
              color: '#e8e8f0',
              border: '1px solid rgba(0,245,255,0.3)',
              backdropFilter: 'blur(20px)',
              fontFamily: "'Cairo', sans-serif",
              direction: 'rtl',
            },
          }}
        />
      </body>
    </html>
  )
}
