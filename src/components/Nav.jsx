// Nav.jsx — Mit Scroll-Blur und graain Logo
import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'

export default function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'bg-white/95 border-ss-border'}`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        <button onClick={() => setPage('landing')}
          className="hover:opacity-70 transition-opacity duration-200">
          <Logo size="sm" />
        </button>

        <nav className="flex items-center gap-7">
          {[
            { id: 'explore', label: 'Explore' },
            { id: 'boards',  label: 'Boards'  },
            { id: 'about',   label: 'About'   },
          ].map(link => (
            <button key={link.id} onClick={() => setPage(link.id)}
              className={`text-sm transition-colors duration-200
                ${page === link.id ? 'text-ss-ink font-medium' : 'text-ss-dim hover:text-ss-ink'}`}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="w-7 h-7 rounded-full bg-ss-surface border border-ss-border flex items-center justify-center">
          <span className="text-ss-ghost text-xs">J</span>
        </div>
      </div>
    </header>
  )
}
