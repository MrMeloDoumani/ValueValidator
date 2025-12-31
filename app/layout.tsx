import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Value Validator | Automated Strategy Consultant',
  description: 'Stop Pitching Weak Ideas. Start Validating Value. Porter. Buffett. Collins. In one tool.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

