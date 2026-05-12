// Nav.jsx — Mockup-style: Logo + centered links + Search + CTA + Avatar
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
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'bg-ss-bg/95 border-ss-border'}`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">

        {/* Logo */}
        <button onClick={() => setPage('landing')}
          className="hover:opacity-70 transition-opacity duration-200 flex-shrink-0">
          <Logo size="sm" />
        </button>

        {/* Center nav */}
        <nav className="flex items-center gap-6">
          {[
            { id: 'boards',  label: 'Boards'  },
            { id: 'explore', label: 'Explore' },
            { id: 'about',   label: 'About'   },
          ].map(link => (
            <button key={link.id} onClick={() => setPage(link.id)}
              className={`text-sm transition-colors duration-200
                ${page === link.id ? 'text-ss-ink font-medium' : 'text-ss-dim hover:text-ss-ink'}`}>
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Search + CTA + Avatar */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search icon */}
          <button className="text-ss-ghost hover:text-ss-dim transition-colors p-1">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* CTA */}
          <button onClick={() => setPage('boards')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-ss-ink text-white text-xs font-semibold rounded-lg hover:bg-ss-dim transition-colors">
            + New board
          </button>

          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-ss-muted border border-ss-border overflow-hidden flex items-center justify-center flex-shrink-0">
            <span className="text-ss-dim text-xs font-medium">J</span>
          </div>
        </div>
      </div>
    </header>
  )
}
