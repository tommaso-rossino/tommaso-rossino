import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/book')({
  component: BookPage,
})

function BookPage() {
  useEffect(() => {
    // Load Calendly embed script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    // Function to center Calendly loader - more targeted approach
    const centerLoader = () => {
      const checkLoader = setInterval(() => {
        // Only target specific Calendly spinner elements
        const spinner = document.querySelector('.calendly-inline-widget .calendly-spinner')
        if (spinner) {
          const spinnerElement = spinner as HTMLElement
          spinnerElement.style.position = 'absolute'
          spinnerElement.style.top = '50%'
          spinnerElement.style.left = '50%'
          spinnerElement.style.transform = 'translate(-50%, -50%)'
          spinnerElement.style.zIndex = '1000'
        }

        // Check if Calendly is loaded (iframe exists)
        const iframe = document.querySelector('.calendly-inline-widget iframe')
        if (iframe) {
          clearInterval(checkLoader)
        }
      }, 200)

      // Stop checking after 10 seconds
      setTimeout(() => clearInterval(checkLoader), 10000)
    }

    // Start checking after a short delay to let Calendly initialize
    setTimeout(centerLoader, 500)

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="calendly.com"]')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900"></div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/50 via-purple-600/50 to-pink-600/50 animate-gradient-shift"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-purple-600/40 via-pink-600/40 to-indigo-600/40 animate-gradient-shift-reverse"></div>
        </div>

        {/* Animated blob elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation - Compact */}
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-xl shadow-lg border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="group">
              <div className="font-playfair text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Tommaso <span className="text-white/90">Rossino</span>
              </div>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-white/80 hover:text-indigo-300 transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative pt-20 pb-0 px-0">
        <div className="w-full">
          {/* Header - Compact */}
          <div className="text-center mb-4 px-4 pt-4">
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-1">
              Book a Meeting
            </h1>
            <p className="text-xs text-white/70">
              Choose a time that works best for you
            </p>
          </div>

          {/* Calendly Embed - Full width, no padding */}
          <div className="w-full overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
            <div
              className="calendly-inline-widget w-full h-full"
              data-url={'https://calendly.com/tommaso-rossino'}
              style={{
                minWidth: '100%',
                height: '100%',
                width: '100%',
                margin: 0,
                padding: 0
              }}
            ></div>
          </div>

          {/* Additional Info - Compact */}
          <div className="text-center py-2 px-4">
            <p className="text-white/60 text-xs">
              Having trouble?{' '}
              <a
                href="mailto:tommaso.rossino@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 transition"
              >
                Send me an email
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

