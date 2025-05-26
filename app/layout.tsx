import type { Metadata } from 'next'
import { Inter, Poppins, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Acrilc - Empowering Artisans. Inspiring the World.',
  description: 'Acrilc is the AI-powered platform where handcrafted art finds its voice, value, and global audience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${cormorant.variable}`}>
      <body className="font-inter bg-[#FAFAF9] text-[#2C3E50]">
        {children}
      </body>
    </html>
  )
}
