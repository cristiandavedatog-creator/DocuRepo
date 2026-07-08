import '../styles/globals.css'
import React from 'react'
import Providers from './providers'

export const metadata = {
  title: 'Document Repository System',
  description: 'Official Digital Repository'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
