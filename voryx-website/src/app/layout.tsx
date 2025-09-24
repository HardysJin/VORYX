import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VORYX - Beyond Reach',
  description: 'Elite expeditions to the world\'s most remote destinations. VORYX creates transformative journeys that push the boundaries of exploration.',
  keywords: 'luxury travel, expeditions, exploration, adventure, remote destinations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-voryx-dark text-white min-h-screen`}>
        <Navigation />
        <main className="relative pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
