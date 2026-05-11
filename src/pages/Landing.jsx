// Landing.jsx

import { curatedStrips, DEMO_BOARDS as boards } from '../data/signals.js'
import BoardCollage from '../components/BoardCollage.jsx'

function AvatarCluster({ count }) {
  const colors = ['#d4d4ce','#c8c8c2','#bfbfb8','#b5b5ae']
  const initials = ['A','B','C','D']
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-1.5">
        {initials.map((l, i) => (
          <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
            style={{ backgroundColor: colors[i] }}>
            <span className="text-ss-ink text-2xs font-medium">{l}</span>
          </div>
        ))}
      </div>
      {count && <span className="text-xs text-ss-dim">+{count}</span>}
    </div>
  )
}

function StripCard({ item, onClick }) {
  return (
    <button onClick={onClick} className="flex-shrink-0 w-36 sm:w-44 group">
      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-ss-surface relative">
        <img src={item.imageUrl} alt={item.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="font-sans text-white text-xs font-semibold leading-tight">{item.label}</p>
          <p className="font-mono text-white/60 text-2xs mt-0.5">{item.count} items</p>
        </div>
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
    <div className="min-h-screen bg-white">

      {/* ─── Hero ─── */}
      <section className="pt-28 pb-20 px-6 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in opacity-0"
          style={{ animationFillMode: 'forwards' }}>
          <div className="w-2 h-2 rounded-full bg-ss-accent" />
          <span className="font-sans text-2xs text-ss-ghost tracking-widest uppercase">
            A visual workspace for
          </span>
        </div>

        <h1 className="font-sans text-6xl sm:text-7xl md:text-8xl text-ss-ink leading-none mb-8 animate-slide-up opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.05s', fontWeight: 800 }}>
          Sound, texture<br />
          and signal culture.
        </h1>

        <p className="text-sm sm:text-base text-ss-dim max-w-md mx-auto leading-relaxed mb-10 animate-slide-up opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}>
          Collect, connect and explore the things that inspire your sound.<br />
          From field recordings to modular systems. From tape loops to digital dreams.<br />
          Build your universe.
        </p>

        <div className="flex items-center justify-center gap-3 mb-12 animate-slide-up opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.15s' }}>
          <button onClick={() => setPage('explore')}
            className="flex items-center gap-2 px-6 py-3 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors duration-200">
            Explore signals <span>→</span>
          </button>
          <button onClick={() => setPage('boards')}
            className="px-6 py-3 border-2 border-ss-ink text-ss-ink text-sm font-semibold rounded-lg hover:bg-ss-ink hover:text-white transition-all duration-200">
            Open demo board
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 animate-fade-in opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
          <AvatarCluster />
          <span className="text-xs text-ss-dim">
            Join 2,847 creators exploring sound and signal culture.
          </span>
        </div>
      </section>

      <div className="border-t border-ss-border" />

      {/* ─── Curated Signals Strip ─── */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-ss-accent" />
            <span className="font-sans text-2xs text-ss-ghost tracking-widest uppercase">Curated Signals</span>
          </div>
          <div className="scroll-strip flex gap-3 pb-2">
            {curatedStrips.map((item, i) => (
              <div key={item.id} className="animate-fade-in opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.07}s` }}>
                <StripCard item={item} onClick={() => openBoard(item.id)} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button onClick={() => setPage('explore')}
              className="px-5 py-2.5 border border-ss-border text-sm text-ss-dim rounded-lg hover:border-ss-muted hover:text-ss-ink transition-all duration-200">
              View all signals
            </button>
          </div>
        </div>
      </section>

      <div className="border-t border-ss-border" />

      {/* ─── Featured Boards — Collage-Ansicht, zentriert ─── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Zentrierter Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-ss-accent" />
              <span className="font-sans text-2xs text-ss-ghost tracking-widest uppercase">Featured Boards</span>
            </div>
            <p className="text-sm text-ss-dim max-w-sm">
              Focused spaces for sound, texture and signal culture.
            </p>
          </div>

          {/* Collage Grid — 3 Spalten, max-w-5xl = ruhigere Breite */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {boards.map((board, i) => (
              <div key={board.id}
                className="animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.07}s` }}>
                <BoardCollage
                  board={board}
                  onClick={() => openBoard(board.id)}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button onClick={() => setPage('boards')}
              className="flex items-center gap-2 px-6 py-3 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors duration-200">
              Explore all boards <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
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
