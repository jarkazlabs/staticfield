// Nav.jsx — Helle, schmale Navigation wie im Mockup

export default function Nav({ page, setPage }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ss-bg/95 backdrop-blur-sm border-b border-ss-border">
      <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => setPage('landing')}
          className="flex items-center gap-2 group"
        >
          {/* Akzent-Dot wie im Mockup */}
          <div className="w-2.5 h-2.5 rounded-full bg-ss-accent" />
          <span className="font-sans text-sm font-medium text-ss-ink tracking-tight">
            signalspace
          </span>
        </button>

        {/* Nav links */}
        <nav className="flex items-center gap-7">
          {[
            { id: 'explore', label: 'Explore' },
            { id: 'boards',  label: 'Boards'  },
            { id: 'about',   label: 'About'   },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`
                text-sm transition-colors duration-200
                ${page === link.id
                  ? 'text-ss-ink font-medium'
                  : 'text-ss-dim hover:text-ss-ink'
                }
              `}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Rechts: Avatar-Platzhalter */}
        <div className="w-7 h-7 rounded-full bg-ss-muted border border-ss-border flex items-center justify-center">
          <span className="text-ss-ghost text-xs">J</span>
        </div>

      </div>
    </header>
  )
}
