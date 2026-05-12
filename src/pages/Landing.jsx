// Landing.jsx — Mockup-style Hero: linksbündige Headline, Cards links+rechts

import { curatedStrips, DEMO_BOARDS as boards } from '../data/signals.js'
import BoardCollage      from '../components/BoardCollage.jsx'
import StripCollageCard  from '../components/StripCollageCard.jsx'
import HeroPreview       from '../components/HeroPreview.jsx'

const BRANDS = ['SUPERBOOTH', 'Mutable Instruments', 'TPTOP audio', 'intellijel designs', 'FREQUENCIES']

function AvatarCluster() {
  const colors = ['#c8b89a','#b8a88a','#d4c4b0','#bfaf9c']
  return (
    <div className="flex -space-x-2">
      {colors.map((c, i) => (
        <div key={i} className="w-7 h-7 rounded-full border-2 border-ss-bg"
          style={{ backgroundColor: c }} />
      ))}
    </div>
  )
}

export default function Landing({ setPage, setActiveBoardId, store }) {
  function openBoard(id) { setActiveBoardId(id); setPage('board-detail') }

  return (
    <div className="min-h-screen" >

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-14 overflow-hidden" style={{ minHeight: '100vh' }}>

        {/* Hero Content + Cards — full width, cards bleed left/right */}
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="relative" style={{ minHeight: 640 }}>

            {/* Cards — absolute positioned, behind and around headline */}
            <div className="absolute inset-0 pointer-events-none">
              <HeroPreview />
            </div>

            {/* Headline — centered with margin to avoid cards */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center"
              style={{ paddingTop: 80, paddingBottom: 60 }}>

              {/* Big headline */}
              <h1 className="font-sans leading-[1.05] mb-6 animate-slide-up opacity-0"
                style={{ fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                  animationFillMode: 'forwards', animationDelay: '0.05s' }}>
                A visual space<br/>
                for sound,<br/>
                <span style={{
                  background: 'linear-gradient(135deg, #b5737a 0%, #8a9fb5 50%, #4a8a8a 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>signals</span> and<br/>
                creative drift.
              </h1>

              {/* Subtext */}
              <p className="text-base text-ss-dim max-w-sm leading-relaxed mb-8 animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: '0.12s' }}>
                Build evolving archives for sound and ideas.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-3 mb-8 animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: '0.18s' }}>
                <button onClick={() => setPage('boards')}
                  className="flex items-center gap-2 px-6 py-3 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors hover-lift">
                  Start collecting
                </button>
                <button onClick={() => setPage('explore')}
                  className="px-6 py-3 border border-ss-border text-ss-ink text-sm font-semibold rounded-lg hover:border-ss-muted hover:bg-white transition-all hover-lift">
                  Explore boards
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 animate-fade-in opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: '0.24s' }}>
                <AvatarCluster />
                <div className="text-xs text-ss-dim leading-tight">
                  <span className="font-medium text-ss-ink">2,341 boards</span> · <span className="font-medium text-ss-ink">8,657 members</span><br/>
                  <span className="text-ss-ghost/70">Join creatives building signal worlds.</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll to explore */}
        <div className="flex flex-col items-center gap-2 pb-10 animate-fade-in opacity-0"
          style={{ animationFillMode: 'forwards', animationDelay: '0.5s' }}>
          <span className="font-sans text-xs text-ss-ghost/60 tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-5 bg-ss-border animate-pulse"/>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#9e9890" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Brand leiste */}
        <div className="border-t border-ss-border/50 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-2xs text-ss-ghost/40 uppercase tracking-widest text-center mb-5 font-sans">
              Trusted by creatives and studios
            </p>
            <div className="flex items-center justify-center gap-10 flex-wrap">
              {BRANDS.map(b => (
                <span key={b} className="font-sans text-sm font-semibold text-ss-dim/40 tracking-tight">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-ss-border" />

      {/* ─── Curated Signals ─── */}
      <section className="py-20 px-6" >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-sans font-bold text-3xl text-ss-ink mb-2">Curated Signals</h2>
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
              className="text-xs text-ss-ghost hover:text-ss-dim font-mono tracking-wide transition-colors flex items-center gap-1.5">
              continue drifting →
            </button>
          </div>
        </div>
      </section>

      <div className="border-t border-ss-border" />

      {/* ─── Featured Boards ─── */}
      <section className="py-20 px-6" >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-sans font-bold text-3xl text-ss-ink mb-2">Open Archives</h2>
            <p className="text-xs text-ss-ghost/70 max-w-xs">Focused spaces for sonic territories and signal studies.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {boards.map((board, i) => (
              <div key={board.id} className="animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.07}s` }}>
                <BoardCollage board={board}
                  boardCards={store ? store.getBoardCards(board.id) : []}
                  onClick={() => openBoard(board.id)} />
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <button onClick={() => setPage('boards')}
              className="flex items-center gap-2 px-7 py-3 bg-ss-ink text-white text-sm font-medium rounded-lg hover:bg-ss-dim transition-colors hover-lift">
              Enter all archives
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-ss-border px-6 py-8" >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-ss-ghost/60">© 2026 JARKAZ Labs</p>
            <p className="text-xs text-ss-ghost/40 mt-0.5">All rights reserved.</p>
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
