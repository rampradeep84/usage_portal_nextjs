import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { UserProvider } from "@/contexts/UserContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Usage Portal Demo',
  description: 'Track GPU usage and costs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </UserProvider>
      </body>
    </html>
  )
}
