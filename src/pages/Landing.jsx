// Landing.jsx — Emotionalisierter Hero + kuratierte Sprache

import { curatedStrips, DEMO_BOARDS as boards } from '../data/signals.js'
import BoardCollage          from '../components/BoardCollage.jsx'
import StripCollageCard      from '../components/StripCollageCard.jsx'
import HeroPreview           from '../components/HeroPreview.jsx'

function AvatarCluster() {
  const colors = ['#d4d4ce','#c8c8c2','#bfbfb8','#b5b5ae']
  return (
    <div className="flex -space-x-1.5">
      {colors.map((c, i) => (
        <div key={i} className="w-5 h-5 rounded-full border-2 border-white"
          style={{ backgroundColor: c }} />
      ))}
    </div>
  )
}

export default function Landing({ setPage, setActiveBoardId, store }) {
  function openBoard(id) { setActiveBoardId(id); setPage('board-detail') }

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-32 overflow-hidden">

        <div className="relative z-10 max-w-4xl mx-auto text-center w-full">

          {/* Kleines Label */}
          <div className="flex items-center justify-center gap-2 mb-10 animate-fade-in opacity-0"
            style={{ animationFillMode: 'forwards' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
            <span className="font-sans text-2xs text-ss-ghost tracking-widest uppercase">
              signal culture archive
            </span>
          </div>

          {/* Haupt-Headline — mehr Raum, drei Zeilen */}
          <h1
            className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ss-ink leading-[1.05] mb-10 animate-slide-up opacity-0"
            style={{ animationFillMode: 'forwards', animationDelay: '0.06s', fontWeight: 800 }}
          >
            Collect texture.<br />
            <span style={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #b5737a 0%, #8a9fb5 50%, #4a8a8a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Build worlds.</span><br />
            Archive atmosphere.
          </h1>

          {/* Subtext — ruhiger, editorischer */}
          <p
            className="text-sm sm:text-base text-ss-dim max-w-sm mx-auto leading-relaxed mb-14 animate-slide-up opacity-0"
            style={{ animationFillMode: 'forwards', animationDelay: '0.12s' }}
          >
            A calm visual space for sound, texture<br className="hidden sm:block" /> and creative drift.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-slide-up opacity-0"
            style={{ animationFillMode: 'forwards', animationDelay: '0.18s' }}
          >
            <button onClick={() => setPage('boards')}
              className="flex items-center gap-2 px-7 py-3 bg-ss-ink text-white text-sm font-medium rounded-lg hover:bg-ss-dim transition-colors duration-200 hover-lift">
              Explore boards
            </button>
            <button onClick={() => setPage('explore')}
              className="flex items-center gap-2 px-7 py-3 border border-ss-border text-ss-dim text-sm font-medium rounded-lg hover:border-ss-ink hover:text-ss-ink transition-all duration-200 hover-lift">
              Open archive
            </button>
          </div>

          {/* Social proof — kleiner, dezenter */}
          <div
            className="flex items-center justify-center gap-2.5 animate-fade-in opacity-0"
            style={{ animationFillMode: 'forwards', animationDelay: '0.24s' }}
          >
            <AvatarCluster />
            <span className="text-xs text-ss-ghost/70">
              2,847 creators collecting
            </span>
          </div>
        </div>

        {/* Board Preview — unter dem Text, leicht nach unten versetzt */}
        <div
          className="relative z-10 w-full max-w-5xl mx-auto mt-20 animate-fade-in opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.3s' }}
        >
          <HeroPreview />
        </div>

        {/* Soft Gradient nach unten */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
      </section>

      {/* Trennlinie */}
      <div className="border-t border-ss-border" />

      {/* ─── Curated Signals ─── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
              <span className="font-sans text-2xs text-ss-ghost tracking-widest uppercase">Curated Signals</span>
            </div>
            <p className="text-xs text-ss-ghost/70 max-w-xs">Fragments from the archive. Updated continuously.</p>
          </div>

          <div className="flex justify-center">
            <div className="scroll-strip flex gap-4 pb-2 max-w-full">
              {curatedStrips.map((item, i) => (
                <div key={item.id} className="animate-fade-in opacity-0"
                  style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.08}s` }}>
                  <StripCollageCard item={item} onClick={() => openBoard(item.id)} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button onClick={() => setPage('explore')}
              className="text-xs text-ss-ghost hover:text-ss-dim font-mono tracking-wide transition-colors duration-200 flex items-center gap-1.5">
              continue drifting →
            </button>
          </div>
        </div>
      </section>

      <div className="border-t border-ss-border" />

      {/* ─── Featured Boards ─── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
              <span className="font-sans text-2xs text-ss-ghost tracking-widest uppercase">Open Archives</span>
            </div>
            <p className="text-xs text-ss-ghost/70 max-w-xs">Focused spaces for sonic territories and signal studies.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {boards.map((board, i) => (
              <div key={board.id} className="animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.07}s` }}>
                <BoardCollage
                  board={board}
                  boardCards={store ? store.getBoardCards(board.id) : []}
                  onClick={() => openBoard(board.id)}
                />
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <button onClick={() => setPage('boards')}
              className="flex items-center gap-2 px-7 py-3 bg-ss-ink text-white text-sm font-medium rounded-lg hover:bg-ss-dim transition-colors duration-200 hover-lift">
              Enter all archives
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-ss-border px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-ss-ghost/60">© graain 2024</p>
            <p className="text-xs text-ss-ghost/40 mt-0.5">A signal culture archive</p>
          </div>
          <div className="flex gap-5">
            {['Twitter', 'Instagram', 'Mastodon'].map(l => (
              <span key={l} className="text-xs text-ss-ghost/50 hover:text-ss-dim cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
