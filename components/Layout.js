import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Header from './Header'
import SplashScreen from './SplashScreen'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const inter = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => setIsLoading(false), 3000) // Timeout to simulate loading
      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {isLoading && isHome ? (
            <SplashScreen finishLoading={() => setIsLoading(false)} />
          ) : (
            <>
              <Header />
              {children}
            </>
          )}
        </body>
      </html>
    </ClerkProvider>
  )
}
