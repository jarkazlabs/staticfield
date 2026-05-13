// Nav.jsx — Responsive mit Hamburger-Menü auf Mobile
import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'

export default function Nav({ page, setPage }) {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function navigate(id) { setPage(id); setMenuOpen(false) }

  const links = [
    { id: 'boards',  label: 'Boards'  },
    { id: 'explore', label: 'Explore' },
    { id: 'about',   label: 'About'   },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300
        ${scrolled ? 'nav-scrolled' : 'bg-ss-bg/95 border-ss-border'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <button onClick={() => navigate('landing')}
            className="hover:opacity-70 transition-opacity duration-200 flex-shrink-0">
            <Logo size="sm" />
          </button>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <button key={link.id} onClick={() => navigate(link.id)}
                className={`text-sm transition-colors duration-200
                  ${page === link.id ? 'text-ss-ink font-medium' : 'text-ss-dim hover:text-ss-ink'}`}>
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button className="text-ss-ghost hover:text-ss-dim transition-colors p-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button onClick={() => navigate('boards')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-ss-ink text-white text-xs font-semibold rounded-lg hover:bg-ss-dim transition-colors">
              + New board
            </button>
            <div className="w-7 h-7 rounded-full bg-ss-muted border border-ss-border flex items-center justify-center">
              <span className="text-ss-dim text-xs font-medium">J</span>
            </div>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => navigate('boards')}
              className="px-3 py-1.5 bg-ss-ink text-white text-xs font-semibold rounded-lg">
              + New board
            </button>
            <button onClick={() => setMenuOpen(o => !o)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-ss-surface transition-colors">
              <span className={`block w-5 h-0.5 bg-ss-ink transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
              <span className={`block w-5 h-0.5 bg-ss-ink transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}/>
              <span className={`block w-5 h-0.5 bg-ss-ink transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute top-14 left-0 right-0 bg-white border-b border-ss-border shadow-lg"
            onClick={e => e.stopPropagation()}>
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map(link => (
                <button key={link.id} onClick={() => navigate(link.id)}
                  className={`text-left px-3 py-3 rounded-lg text-sm transition-colors
                    ${page === link.id ? 'bg-ss-surface text-ss-ink font-medium' : 'text-ss-dim hover:bg-ss-surface hover:text-ss-ink'}`}>
                  {link.label}
                </button>
              ))}
              <div className="border-t border-ss-border mt-2 pt-3">
                <button className="text-left px-3 py-2 text-sm text-ss-ghost">Account</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
