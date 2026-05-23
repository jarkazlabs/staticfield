// Landing.jsx — staticfield homepage
// ONLY this file changes. Nothing else.

import { useState } from 'react'

// ─── HERO FIELD VISUALIZATION ─────────────────────────────
// Alle Cards sofort sichtbar. Nur sanftes Float.
//
// Exakte Card-Dimensionen:
// IMAGE:   left:30,  top:30,  w:195, h:155  → right=225, centerY=108  bottom=185
// NOTE:    left:268, top:60,  w:178, h:95   → left=268,  centerY=108  bottom=155, right=446
// LINK:    left:268, top:228, w:195, h:120  → left=268,  centerY=288  top=228
// CHAIN:   left:18,  top:228, w:205, h:90   → right=223, centerY=273  top=228
// PHOTO:   right:15→left:470,top:30,w:155,h:210 → left=470,centerY=135 bottom=240
// YOUTUBE: right:15→left:460,top:328,w:185,h:160→ top=328, centerX=552
// PATTERN: left:30,  top:430, w:170, h:110  → right=200, centerY=485
// SYNTH:   left:258, top:440, w:175, h:90   → left=258,  centerY=485

function ConnectedField() {
  return (
    <div className="relative w-full select-none" style={{ height: 530 }}>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>

        {/* IMAGE right-center → NOTE left-center
            IMAGE: left:30, top:30, w:195, h≈155 → right=225, centerY=30+77=107
            NOTE:  left:268, top:60, w:178, h≈95  → left=268, centerY=60+47=107 */}
        <path d="M 225,107 C 246,107 247,107 268,107"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="225" cy="107" r="2.5" fill="#c8c8c0"/>
        <circle cx="268" cy="107" r="2.5" fill="#c8c8c0"/>

        {/* NOTE bottom-center → LINK top-center
            NOTE bottom: 60+95=155, centerX=268+89=357
            LINK top: 228, centerX=268+97=365 */}
        <path d="M 357,155 C 357,191 365,210 365,228"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="357" cy="155" r="2.5" fill="#c8c8c0"/>
        <circle cx="365" cy="228" r="2.5" fill="#c8c8c0"/>

        {/* CHAIN right-center → LINK left-center
            CHAIN: left:18, top:228, w:205, h≈90 → right=223, centerY=228+45=273
            LINK:  left:268, top:228, h≈120      → left=268, centerY=228+60=288 */}
        <path d="M 223,273 C 245,273 246,288 268,288"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="223" cy="273" r="2.5" fill="#c8c8c0"/>
        <circle cx="268" cy="288" r="2.5" fill="#c8c8c0"/>

        {/* NOTE right-center → PHOTO left-center
            NOTE:  right=446, centerY=107
            PHOTO: left:490, top:55, w:155, h≈185 → left=490, centerY=55+92=147 */}
        <path d="M 446,107 C 468,107 468,147 490,147"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="446" cy="107" r="2.5" fill="#c8c8c0"/>
        <circle cx="490" cy="147" r="2.5" fill="#c8c8c0"/>

        {/* PHOTO bottom-center → YOUTUBE top-center
            PHOTO: left:490, top:55, h≈185 → bottom=240, centerX=490+77=567
            YOUTUBE: left:470, top:360, w:185 → top=360, centerX=470+92=562 */}
        <path d="M 567,240 C 567,300 562,330 562,360"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="567" cy="240" r="2.5" fill="#c8c8c0"/>
        <circle cx="562" cy="360" r="2.5" fill="#c8c8c0"/>

        {/* PATTERN right-center → SYNTH left-center
            PATTERN: left:30, top:390, w:170, h≈100 → right=200, centerY=390+50=440
            SYNTH:   left:258, top:400, w:175, h≈80  → left=258, centerY=400+40=440 */}
        <path d="M 200,440 C 229,440 229,440 258,440"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="200" cy="440" r="2.5" fill="#c8c8c0"/>
        <circle cx="258" cy="440" r="2.5" fill="#c8c8c0"/>

      </svg>

      {/* IMAGE — left:30, top:30, w:195 */}
      <div className="absolute" style={{ left: 30, top: 30, width: 195, zIndex: 3 }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md overflow-hidden field-float" style={{ animationDelay: '0s' }}>
          <div className="w-full aspect-video overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75" alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="px-3 py-2.5">
            <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Image</p>
            <p className="font-sans font-semibold text-xs text-ss-ink">Fog Layer, 04:17</p>
          </div>
        </div>
      </div>

      {/* NOTE — left:268, top:60, w:178 */}
      <div className="absolute" style={{ left: 268, top: 60, width: 178, zIndex: 4 }}>
        <div className="rounded-xl border border-ss-border shadow-sm p-3.5 field-float" style={{ backgroundColor: '#faf7f0', animationDelay: '1s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-2">Note</p>
          <p className="font-mono text-sm text-ss-ink leading-relaxed">leave more<br/>silence</p>
        </div>
      </div>

      {/* LINK — left:268, top:228, w:195 */}
      <div className="absolute" style={{ left: 268, top: 228, width: 195, zIndex: 3 }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md p-3.5 field-float" style={{ animationDelay: '1.5s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Link</p>
          <p className="font-sans font-semibold text-xs text-ss-ink mb-1.5">ModWiggler Thread</p>
          <p className="font-mono text-2xs text-ss-dim mb-2">Designing with space — minimal patches</p>
          <span className="font-mono text-2xs text-ss-accent">↗ modwiggler.com</span>
        </div>
      </div>

      {/* SIGNAL CHAIN — left:18, top:228, w:205 */}
      <div className="absolute" style={{ left: 18, top: 228, width: 205, zIndex: 3 }}>
        <div className="rounded-xl border border-ss-border shadow-sm p-3.5 field-float" style={{ backgroundColor: '#faf6e8', animationDelay: '2s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Signal Chain</p>
          <p className="font-sans font-semibold text-xs text-ss-ink mb-2">Delay → Filter → Reverb</p>
          <div className="flex items-center gap-1.5">
            {['Delay','Filter','Reverb'].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="font-mono text-2xs text-ss-ink bg-white border border-ss-border/60 px-1.5 py-0.5 rounded-md">{item}</span>
                {i < arr.length-1 && <span className="text-ss-ghost/50 text-2xs">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PHOTO — left:490, top:55, w:155 → centerX=567, centerY=147, bottom=240 */}
      <div className="absolute" style={{ left: 490, top: 55, width: 155, zIndex: 2 }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-sm overflow-hidden field-float" style={{ animationDelay: '0.5s' }}>
          <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=75" alt="" className="w-full aspect-square object-cover"/>
          <div className="px-2.5 py-2">
            <p className="font-mono text-2xs text-ss-ghost">Studio corner</p>
          </div>
        </div>
      </div>

      {/* YOUTUBE — left:470, top:360, w:185 — klar unter PHOTO, kein Overlap mit SYNTH */}
      <div className="absolute" style={{ left: 470, top: 360, width: 185, zIndex: 3 }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md overflow-hidden field-float" style={{ animationDelay: '2.5s' }}>
          <div className="w-full aspect-video bg-ss-ink relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=70" alt="" className="w-full h-full object-cover opacity-60"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow">
                <span className="text-ss-ink text-xs ml-0.5">▶</span>
              </div>
            </div>
          </div>
          <div className="px-3 py-2.5">
            <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">YouTube</p>
            <p className="font-sans font-semibold text-xs text-ss-ink leading-tight">Making an ambient patch</p>
          </div>
        </div>
      </div>

      {/* PATTERN — left:30, top:390, w:170 */}
      <div className="absolute" style={{ left: 30, top: 390, width: 170, zIndex: 3 }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-sm p-3.5 field-float" style={{ animationDelay: '3s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Pattern</p>
          <p className="font-sans font-semibold text-xs text-ss-ink mb-1.5">Ambient Idea 01</p>
          <div className="font-mono text-2xs text-ss-dim bg-ss-surface/60 rounded px-2 py-1.5 border border-ss-border/40">C4 — Eb4 — G4</div>
          <p className="font-mono text-2xs text-ss-ghost/50 mt-1">72 bpm</p>
        </div>
      </div>

      {/* SYNTH PATCH — left:258, top:400, w:175 */}
      <div className="absolute" style={{ left: 258, top: 400, width: 175, zIndex: 3 }}>
        <div className="rounded-xl border border-ss-border shadow-sm p-3.5 field-float" style={{ backgroundColor: '#eef1e8', animationDelay: '2s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Synth Patch</p>
          <p className="font-sans font-semibold text-xs text-ss-ink mb-2">Atmos Drift</p>
          <span className="font-mono text-2xs text-ss-dim border border-ss-border/50 bg-white/60 px-2 py-0.5 rounded-md">Mutable Instruments</span>
        </div>
      </div>

    </div>
  )
}

// ─── FEATURE STRIP ────────────────────────────────────────

const FEATURES = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
    title: 'Collect anything',
    desc: 'Save sounds, images,\nlinks, notes and more.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="4" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="16" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.4"/><line x1="6.5" y1="9" x2="13.5" y2="5.5" stroke="currentColor" strokeWidth="1.4"/><line x1="6.5" y1="11" x2="13.5" y2="14.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
    title: 'Connect ideas',
    desc: 'Visually connect signals\nand spark new ideas.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 10 L5 6 L8 12 L11 4 L14 14 L17 8 L19 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
    title: 'Shape your field',
    desc: 'Build chains,\ncollect references.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4"/><line x1="14" y1="14" x2="18" y2="18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    title: 'Search your space',
    desc: 'Find what you need\nby content and vibe.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4"/><line x1="10" y1="2" x2="10" y2="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><line x1="10" y1="14" x2="10" y2="18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    title: 'Return and evolve',
    desc: 'Your fields grow with you.\nNothing is ever final.',
  },
]

// ─── REAL FIELDS DATA ─────────────────────────────────────

const FILTER_TAGS = ['All','Ambient','Modular','Field Recording','Sound Design','Textures','Research']

const REAL_FIELDS = [
  { id: 1, title: 'Distant Memories',        creator: 'Alex R.',    category: 'Ambient',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=70' },
  { id: 2, title: 'Granular Experiments',     creator: 'Mira K.',    category: 'Sound Design',
    img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=70' },
  { id: 3, title: 'Modular Ideas',            creator: 'Jonas T.',   category: 'Modular',
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=70' },
  { id: 4, title: 'Forest Sessions',          creator: 'Lea S.',     category: 'Field Recording',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=70' },
  { id: 5, title: 'Tape Texture Studies',     creator: 'Omar F.',    category: 'Textures',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=70' },
  { id: 6, title: 'Signal Research Notes',    creator: 'Nina V.',    category: 'Research',
    img: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=500&q=70' },
]

// ─── AVATAR CLUSTER ───────────────────────────────────────

function AvatarCluster() {
  return (
    <div className="flex -space-x-2">
      {['#c8b89a','#b8a88a','#d4c4b0','#bfaf9c','#a89880'].map((c, i) => (
        <div key={i} className="w-7 h-7 rounded-full border-2 border-ss-bg" style={{ backgroundColor: c }}/>
      ))}
    </div>
  )
}

// ─── APP PREVIEW — Browser Chrome ────────────────────────

function AppPreview() {
  const cards = [
    { type: 'Field Recording', title: 'Rain on metal roof.wav', hasWave: true, left: 30, top: 20, w: 175 },
    { type: 'Note',            title: 'structure is freedom',                  left: 225, top: 10, w: 148 },
    { type: 'Signal Chain',    title: 'Delay → Reverb',                        left: 30,  top: 158, w: 158 },
    { type: 'Image',           title: 'Brutalist textures', hasImg: true,      left: 200, top: 118, w: 132 },
    { type: 'Link',            title: 'A Guide to Texture',                    left: 348, top: 168, w: 138 },
  ]

  return (
    <div className="w-full rounded-2xl border border-ss-border shadow-xl bg-white overflow-hidden">

      {/* Browser chrome */}
      <div className="bg-[#f0f0ee] border-b border-ss-border px-3 py-2.5 flex items-center gap-2">
        {/* Traffic lights */}
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"/>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"/>
        </div>

        {/* URL bar */}
        <div className="flex-1 mx-2 bg-white border border-ss-border/60 rounded-md px-3 py-1 flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0">
            <circle cx="5" cy="5" r="4" stroke="#c8c4bc" strokeWidth="1"/>
            <path d="M3 5 Q5 2 7 5 Q5 8 3 5Z" stroke="#c8c4bc" strokeWidth="0.8" fill="none"/>
            <line x1="5" y1="1" x2="5" y2="9" stroke="#c8c4bc" strokeWidth="0.8"/>
          </svg>
          <span className="font-mono text-2xs text-ss-ghost truncate">staticfield.app/field/coastal-textures</span>
        </div>

        {/* Nav icons placeholder */}
        <div className="flex gap-2 flex-shrink-0">
          {[0,1].map(i => (
            <div key={i} className="w-4 h-4 rounded bg-ss-border/40"/>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-[#e8e8e4] border-b border-ss-border/60 px-3 flex items-end gap-1 pt-1.5">
        <div className="bg-white border border-b-0 border-ss-border rounded-t-md px-3 py-1.5 flex items-center gap-2 min-w-0">
          <div className="w-3 h-3 rounded-full bg-ss-accent/60 flex-shrink-0"/>
          <span className="font-sans text-2xs text-ss-ink truncate">Coastal Textures — staticfield</span>
          <span className="text-ss-ghost/40 text-2xs flex-shrink-0 ml-1">×</span>
        </div>
        <div className="px-3 py-1.5 flex items-center">
          <span className="font-sans text-2xs text-ss-ghost/50">+</span>
        </div>
      </div>

      {/* Canvas content */}
      <div className="relative bg-[#fafaf8] overflow-hidden" style={{ height: 255 }}>
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle, #d4d0c8 1px, transparent 1px)', backgroundSize: '20px 20px' }}/>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M 205,55 C 215,55 215,45 225,45"
            stroke="#c8c8c0" strokeWidth="1" fill="none" strokeDasharray="3 4"/>
          <path d="M 188,158 C 200,140 200,135 200,128"
            stroke="#c8c8c0" strokeWidth="1" fill="none" strokeDasharray="3 4"/>
          <circle cx="205" cy="55" r="2" fill="#c8c4bc"/>
          <circle cx="188" cy="158" r="2" fill="#c8c4bc"/>
        </svg>

        {/* Cards */}
        {cards.map((card, i) => (
          <div key={i} className="absolute bg-white rounded-xl border border-ss-border shadow-sm p-2.5"
            style={{ left: card.left, top: card.top, width: card.w }}>
            <p className="font-mono uppercase text-ss-ghost mb-1.5" style={{ fontSize: 8, letterSpacing: '0.08em' }}>{card.type}</p>
            {card.hasWave && (
              <div className="flex items-center gap-px mb-1.5 h-4">
                {[3,5,8,4,11,7,3,9,6,4,8,5,10,3,7,6,9,4,8,5].map((h, j) => (
                  <div key={j} style={{ width:2, height:h, backgroundColor:'#1a1814', borderRadius:1, opacity:0.55, flexShrink:0 }}/>
                ))}
              </div>
            )}
            {card.hasImg && (
              <div className="w-full aspect-video bg-ss-surface rounded overflow-hidden mb-1.5">
                <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=50"
                  alt="" className="w-full h-full object-cover"/>
              </div>
            )}
            <p className="font-sans font-semibold text-ss-ink leading-tight" style={{ fontSize: 10 }}>{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN LANDING ─────────────────────────────────────────

export default function Landing({ setPage, setActiveFieldId, store }) {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = REAL_FIELDS.filter(f => activeTag === 'All' || f.category === activeTag)

  return (
    <div className="min-h-screen bg-ss-bg">

      {/* ══════════ HERO ══════════ */}
      <section className="pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10 xl:gap-16">

            {/* LEFT */}
            <div className="lg:w-[44%] flex-shrink-0 z-10 relative pt-4">

              <h1 className="font-sans leading-[1.04] mb-6 animate-slide-up opacity-0"
                style={{ fontWeight: 800, fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                  animationFillMode: 'forwards', animationDelay: '0.04s' }}>
                Build worlds<br/>
                from{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #b5737a 0%, #8a9fb5 55%, #4a8a8a 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>signals.</span>
              </h1>

              <p className="text-base sm:text-lg text-ss-dim leading-relaxed mb-8 max-w-sm animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}>
                Collect sounds, images, links and notes.<br/>
                Connect them. Develop ideas.<br/>
                Return later.<br/>
                <span className="text-ss-ink/70 font-medium mt-1 block">Your creative space, always evolving.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: '0.16s' }}>
                <button onClick={() => setPage('fields')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors">
                  Start your field →
                </button>
                <button onClick={() => { setActiveFieldId('b01'); setPage('field-detail') }}
                  className="text-sm text-ss-dim hover:text-ss-ink transition-colors underline underline-offset-4 decoration-ss-border">
                  Explore demo field
                </button>
              </div>

              <div className="flex items-center gap-3 animate-fade-in opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: '0.22s' }}>
                <AvatarCluster />
                <p className="text-xs text-ss-dim leading-snug">
                  Join 8,657 creators building<br/>and exploring their fields.
                </p>
              </div>
            </div>

            {/* RIGHT — Field visualization, desktop only */}
            <div className="hidden lg:block flex-1 relative">
              <ConnectedField />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FEATURE STRIP ══════════ */}
      <section className="border-t border-ss-border py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="w-9 h-9 rounded-lg border border-ss-border flex items-center justify-center text-ss-dim">
                  {f.icon}
                </div>
                <h3 className="font-sans font-semibold text-sm text-ss-ink">{f.title}</h3>
                <p className="text-xs text-ss-dim leading-relaxed whitespace-pre-line">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ REAL FIELDS ══════════ */}
      <section className="border-t border-ss-border py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ss-ink leading-tight mb-2">
                See how others<br/>build their worlds.
              </h2>
              <p className="text-sm text-ss-dim">
                Explore fields from sound artists,<br/>researchers and creators.
              </p>
            </div>
            {/* Filter chips */}
            <div className="flex items-center gap-2 flex-wrap sm:justify-end">
              {FILTER_TAGS.map(tag => (
                <button key={tag} onClick={() => setActiveTag(tag)}
                  className={`font-sans text-xs px-3 py-1.5 rounded-lg border transition-all
                    ${activeTag === tag
                      ? 'bg-ss-ink text-white border-ss-ink'
                      : 'border-ss-border text-ss-dim hover:border-ss-muted hover:text-ss-ink'}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal carousel */}
          <div className="scroll-strip flex gap-4 pb-2">
            {filtered.map((field, i) => (
              <div key={field.id}
                className="flex-shrink-0 w-64 animate-fade-in opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.07}s` }}>
                <div className="group cursor-pointer">
                  <div className="w-full rounded-xl overflow-hidden border border-ss-border mb-3
                    transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5">
                    <img src={field.img} alt={field.title} className="w-full aspect-[4/3] object-cover"/>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-sans font-semibold text-sm text-ss-ink group-hover:text-ss-accent transition-colors">{field.title}</h3>
                      <p className="text-xs text-ss-ghost mt-0.5">by {field.creator}</p>
                    </div>
                    <span className="font-mono text-2xs text-ss-ghost border border-ss-border px-2 py-1 rounded-md ml-2 flex-shrink-0">{field.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DESIGNED FOR CREATIVES ══════════ */}
      <section className="border-t border-ss-border py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* Left */}
            <div className="lg:w-[38%] flex-shrink-0">
              <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-4">Designed for creatives</p>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ss-ink leading-tight mb-4">
                Everything you need.<br/>Nothing you don't.
              </h2>
              <p className="text-sm text-ss-dim leading-relaxed mb-8">
                staticfield is a minimal workspace<br/>
                for collecting, connecting<br/>
                and evolving your ideas.
              </p>
              <div className="flex items-center gap-3">
                <button onClick={() => setPage('fields')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors">
                  Start your field →
                </button>
                <button onClick={() => setPage('manifesto')}
                  className="text-sm text-ss-dim hover:text-ss-ink transition-colors underline underline-offset-4 decoration-ss-border">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right: app preview */}
            <div className="flex-1">
              <AppPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-ss-border px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-ss-ghost/60">© 2026 JARKAZ Labs</p>
            <p className="text-xs text-ss-ghost/40 mt-0.5">All rights reserved.</p>
          </div>
          <div className="flex gap-5">
            {['Twitter','Instagram','Mastodon'].map(l => (
              <span key={l} className="text-xs text-ss-ghost/50 hover:text-ss-dim cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
