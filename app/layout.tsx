import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Fontları təyin edirik
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: 'swap', // Font yüklənənə qədər sistem fontunu göstərsin (xəta verməsin)
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bio Market',
  description: 'Natural and Ecological Products',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg', // Daha sadə ikon yolu (xəta riskini azaldır)
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="az"> {/* Saytın dilini Azərbaycan dili etdik */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
