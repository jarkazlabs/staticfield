// Landing.jsx — Hero nach Mockup-Vorbild
// Großer Garamond-Headline, horizontale Strip-Cards, Featured Boards Grid

import { curatedStrips, boards } from '../data/signals.js'

// Avatar-Cluster (statisch, 4 kreisförmige Platzhalter)
function AvatarCluster({ count }) {
  const initials = ['A','B','C','D']
  const colors = ['#d4cfc7','#c8c3bb','#bfb9b0','#b5afa5']
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-1.5">
        {initials.map((l, i) => (
          <div key={i} className="w-6 h-6 rounded-full border-2 border-ss-bg flex items-center justify-center"
            style={{ backgroundColor: colors[i] }}>
            <span className="text-ss-ink text-2xs font-medium">{l}</span>
          </div>
        ))}
      </div>
      {count && <span className="text-xs text-ss-dim">+{count}</span>}
    </div>
  )
}

// Horizontale Strip-Card
function StripCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-36 sm:w-44 group"
    >
      <div className="aspect-[3/4] rounded overflow-hidden bg-ss-surface mb-2 relative">
        <img src={item.imageUrl} alt={item.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-90" />
        {/* Overlay unten */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="font-sans text-white text-xs font-medium leading-tight">{item.label}</p>
          <p className="font-mono text-white/60 text-2xs">{item.count} items</p>
        </div>
      </div>
    </button>
  )
}

// Featured Board Card
function FeaturedBoardCard({ board, onClick }) {
  return (
    <button onClick={onClick} className="text-left group">
      {/* 2x2 Grid Vorschau */}
      <div className="w-full aspect-square rounded overflow-hidden bg-ss-surface mb-3 relative">
        <img src={board.imageUrl} alt={board.title}
          className="w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105" />
      </div>
      <h3 className="font-sans text-sm font-medium text-ss-ink group-hover:text-ss-accent transition-colors">
        {board.title}
      </h3>
      <p className="text-xs text-ss-ghost mt-0.5">by {board.author}</p>
      <div className="mt-2">
        <AvatarCluster count={board.followers} />
      </div>
    </button>
  )
}

export default function Landing({ setPage, setActiveBoardId }) {
  function openBoard(id) {
    setActiveBoardId(id)
    setPage('board-detail')
  }

  return (
    <div className="min-h-screen">

      {/* ─── Hero ────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-6 max-w-5xl mx-auto text-center">

        {/* Kleine Label-Zeile */}
        <div
          className="flex items-center justify-center gap-2 mb-7 animate-fade-in opacity-0"
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
          <span className="font-mono text-2xs text-ss-ghost tracking-widest uppercase">
            A visual workspace for
          </span>
        </div>

        {/* Haupt-Headline — groß, Garamond, wie im Mockup */}
        <h1
          className="font-sans text-6xl sm:text-7xl md:text-8xl text-ss-ink leading-none mb-8 animate-slide-up opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.05s', fontWeight: 700 }}
        >
          Sound, texture<br />
          <em className="not-italic">and signal culture.</em>
        </h1>

        {/* Subtitel */}
        <p
          className="text-sm sm:text-base text-ss-dim max-w-md mx-auto leading-relaxed mb-10 animate-slide-up opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}
        >
          Collect, connect and explore the things that inspire your sound.<br />
          From field recordings to modular systems.<br />
          Build your universe.
        </p>

        {/* CTAs */}
        <div
          className="flex items-center justify-center gap-3 mb-12 animate-slide-up opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.15s' }}
        >
          <button
            onClick={() => setPage('explore')}
            className="flex items-center gap-2 px-5 py-2.5 bg-ss-accent text-white text-sm font-semibold rounded hover:bg-[#667a30] transition-colors duration-200"
          >
            Explore signals <span>→</span>
          </button>
          <button
            onClick={() => setPage('boards')}
            className="px-5 py-2.5 border-2 border-ss-ink text-ss-ink text-sm font-semibold rounded hover:bg-ss-ink hover:text-white transition-all duration-200"
          >
            Open demo board
          </button>
        </div>

        {/* Social Proof */}
        <div
          className="flex items-center justify-center gap-3 animate-fade-in opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}
        >
          <AvatarCluster />
          <span className="text-xs text-ss-dim">
            Join 2,847 creators exploring sound and signal culture.
          </span>
        </div>
      </section>

      {/* Trennlinie */}
      <div className="border-t border-ss-border" />

      {/* ─── Curated Signals Strip ───────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section Label */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
            <span className="font-mono text-2xs text-ss-ghost tracking-widest uppercase">
              Curated Signals
            </span>
          </div>

          {/* Horizontaler Scroll-Strip */}
          <div className="scroll-strip flex gap-3 pb-2">
            {curatedStrips.map((item, i) => (
              <div key={item.id}
                className="animate-fade-in opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.07}s` }}
              >
                <StripCard item={item} onClick={() => openBoard(item.id)} />
              </div>
            ))}
          </div>

          {/* View all */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setPage('explore')}
              className="px-5 py-2 border border-ss-border text-sm text-ss-dim rounded hover:border-ss-muted hover:text-ss-ink transition-all duration-200"
            >
              View all signals
            </button>
          </div>
        </div>
      </section>

      {/* Trennlinie */}
      <div className="border-t border-ss-border" />

      {/* ─── Featured Boards ─────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
            <span className="font-mono text-2xs text-ss-ghost tracking-widest uppercase">
              Featured Boards
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {boards.map((board, i) => (
              <div key={board.id}
                className="animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.06}s` }}
              >
                <FeaturedBoardCard board={board} onClick={() => openBoard(board.id)} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setPage('boards')}
              className="flex items-center gap-2 px-5 py-2.5 bg-ss-accent text-white text-sm font-semibold rounded hover:bg-[#667a30] transition-colors duration-200"
            >
              Explore all boards <span>→</span>
            </button>
          </div>

        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-ss-border px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-ss-ghost">© Signal Space 2024</p>
            <p className="text-xs text-ss-ghost/60 mt-0.5">Built for creators</p>
          </div>
          <div className="flex gap-5">
            {['Twitter', 'Instagram', 'Mastodon'].map(l => (
              <span key={l} className="text-xs text-ss-ghost hover:text-ss-dim cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
