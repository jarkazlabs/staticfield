// Landing.jsx — staticfield homepage
// ONLY this file changes. Nothing else.

import { useState } from 'react'

// ─── HERO FIELD VISUALIZATION ─────────────────────────────

function ConnectedField() {
  // Card dimensions (estimated heights):
  // IMAGE:  left:55,  top:40,  w:195, h:~170 → right=250, centerY=125
  // NOTE:   left:270, top:110, w:175, h:~90  → left=270,  centerY=155
  // LINK:   left:310, top:255, w:195, h:~110 → left=310,  centerY=310
  // CHAIN:  left:55,  top:285, w:220, h:~85  → right=275, centerY=327
  // PATTERN:left:70,  top:435, w:190, h:~95  → right=260, centerY=482
  // SYNTH:  left:278, top:435, w:185, h:~80  → left=278,  centerY=475
  // PHOTO:  right:20=left:420,top:145,w:160,h:~195 → left=420, centerY=243
  // YT:     right:10=left:410,top:360,w:195,h:~160 → left=410, centerY=440

  return (
    <div className="relative w-full select-none" style={{ height: 580 }}>

      {/* SVG — gestrichelte Linien wie in der App, Ankerpunkte an Card-Rändern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {/* IMAGE right → NOTE left */}
        <path d="M 250,125 C 260,125 260,155 270,155"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="250" cy="125" r="2.5" fill="#c8c8c0"/>
        <circle cx="270" cy="155" r="2.5" fill="#c8c8c0"/>

        {/* NOTE bottom → LINK top */}
        <path d="M 357,200 C 357,230 357,245 357,255"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="357" cy="200" r="2.5" fill="#c8c8c0"/>
        <circle cx="357" cy="255" r="2.5" fill="#c8c8c0"/>

        {/* CHAIN right → LINK left */}
        <path d="M 275,327 C 292,327 292,310 310,310"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="275" cy="327" r="2.5" fill="#c8c8c0"/>
        <circle cx="310" cy="310" r="2.5" fill="#c8c8c0"/>

        {/* PATTERN right → SYNTH left */}
        <path d="M 260,482 C 269,482 269,475 278,475"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="260" cy="482" r="2.5" fill="#c8c8c0"/>
        <circle cx="278" cy="475" r="2.5" fill="#c8c8c0"/>

        {/* PHOTO left → NOTE right */}
        <path d="M 420,243 C 400,243 365,195 350,195"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="420" cy="243" r="2.5" fill="#c8c8c0"/>
        <circle cx="350" cy="195" r="2.5" fill="#c8c8c0"/>

        {/* PHOTO bottom → YT top */}
        <path d="M 500,340 C 500,350 500,350 500,360"
          stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"/>
        <circle cx="500" cy="340" r="2.5" fill="#c8c8c0"/>
        <circle cx="500" cy="360" r="2.5" fill="#c8c8c0"/>
      </svg>

      {/* IMAGE: Fog Layer — links, leicht eingerückt */}
      <div className="animate-slide-up opacity-0 absolute"
        style={{ left: 55, top: 40, width: 195, zIndex: 3, animationFillMode: 'forwards', animationDelay: '0.1s' }}>
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

      {/* NOTE: leave more silence */}
      <div className="animate-slide-up opacity-0 absolute"
        style={{ left: 270, top: 110, width: 175, zIndex: 4, animationFillMode: 'forwards', animationDelay: '0.2s' }}>
        <div className="rounded-xl border border-ss-border shadow-sm p-3.5 field-float" style={{ backgroundColor: '#faf7f0', animationDelay: '1.5s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-2">Note</p>
          <p className="font-mono text-sm text-ss-ink leading-relaxed">leave more<br/>silence</p>
        </div>
      </div>

      {/* LINK: ModWiggler */}
      <div className="animate-slide-up opacity-0 absolute"
        style={{ left: 310, top: 255, width: 195, zIndex: 3, animationFillMode: 'forwards', animationDelay: '0.32s' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md p-3.5 field-float" style={{ animationDelay: '2s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Link</p>
          <p className="font-sans font-semibold text-xs text-ss-ink mb-1.5">ModWiggler Thread</p>
          <p className="font-mono text-2xs text-ss-dim mb-2">Designing with space — minimal patches that breathe</p>
          <span className="font-mono text-2xs text-ss-accent">↗ modwiggler.com</span>
        </div>
      </div>

      {/* SIGNAL CHAIN — leicht rechts vom linken Rand */}
      <div className="animate-slide-up opacity-0 absolute"
        style={{ left: 55, top: 285, width: 220, zIndex: 3, animationFillMode: 'forwards', animationDelay: '0.44s' }}>
        <div className="rounded-xl border border-ss-border shadow-sm p-3.5 field-float" style={{ backgroundColor: '#faf6e8', animationDelay: '1s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Signal Chain</p>
          <p className="font-sans font-semibold text-xs text-ss-ink mb-2.5">Delay → Filter → Reverb</p>
          <div className="flex items-center gap-1.5">
            {['Delay','Filter','Reverb'].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="font-mono text-2xs text-ss-ink bg-white border border-ss-border/60 px-2 py-1 rounded-md">{item}</span>
                {i < arr.length-1 && <span className="text-ss-ghost/50 text-2xs">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PATTERN — ganz unten links, mehr Einzug */}
      <div className="animate-slide-up opacity-0 absolute"
        style={{ left: 70, top: 435, width: 190, zIndex: 3, animationFillMode: 'forwards', animationDelay: '0.54s' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-sm p-3.5 field-float" style={{ animationDelay: '3s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Pattern</p>
          <p className="font-sans font-semibold text-xs text-ss-ink mb-2">Ambient Idea 01</p>
          <div className="font-mono text-2xs text-ss-dim bg-ss-surface/60 rounded px-2 py-1.5 border border-ss-border/40">C4 — Eb4 — G4</div>
          <p className="font-mono text-2xs text-ss-ghost/50 mt-1.5">72 bpm · C minor</p>
        </div>
      </div>

      {/* SYNTH PATCH */}
      <div className="animate-slide-up opacity-0 absolute"
        style={{ left: 278, top: 435, width: 185, zIndex: 3, animationFillMode: 'forwards', animationDelay: '0.62s' }}>
        <div className="rounded-xl border border-ss-border shadow-sm p-3.5 field-float" style={{ backgroundColor: '#eef1e8', animationDelay: '2s' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Synth Patch</p>
          <p className="font-sans font-semibold text-xs text-ss-ink mb-2.5">Atmos Drift</p>
          <span className="font-mono text-2xs text-ss-dim border border-ss-border/50 bg-white/60 px-2 py-0.5 rounded-md">Mutable Instruments</span>
        </div>
      </div>

      {/* PHOTO — rechts */}
      <div className="animate-slide-up opacity-0 absolute"
        style={{ right: 20, top: 145, width: 160, zIndex: 2, animationFillMode: 'forwards', animationDelay: '0.28s' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-sm overflow-hidden field-float" style={{ animationDelay: '0.5s' }}>
          <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=75" alt="" className="w-full aspect-square object-cover"/>
          <div className="px-2.5 py-2">
            <p className="font-mono text-2xs text-ss-ghost">Studio corner</p>
          </div>
        </div>
      </div>

      {/* YOUTUBE — rechts unten */}
      <div className="animate-slide-up opacity-0 absolute"
        style={{ right: 10, top: 360, width: 195, zIndex: 3, animationFillMode: 'forwards', animationDelay: '0.48s' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md overflow-hidden field-float" style={{ animationDelay: '1.5s' }}>
          <div className="w-full aspect-video bg-ss-ink relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=70" alt="" className="w-full h-full object-cover opacity-60"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
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

// ─── APP PREVIEW ILLUSTRATION ─────────────────────────────

function AppPreview() {
  const cards = [
    { type: 'Field Recording', title: 'Rain on metal roof.wav', hasWave: true, left: 80, top: 20, w: 170 },
    { type: 'Note',            title: 'structure is freedom',   left: 270, top: 10,  w: 145 },
    { type: 'Signal Chain',    title: 'Delay → Reverb',         left: 80,  top: 155, w: 155 },
    { type: 'Image',           title: 'Brutalist textures',     hasImg: true, left: 245, top: 120, w: 130 },
    { type: 'Link',            title: 'A Guide to Texture',     left: 400, top: 170, w: 135 },
  ]
  return (
    <div className="w-full rounded-2xl border border-ss-border shadow-xl bg-white overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ss-border bg-ss-surface/60">
        <div className="flex gap-1.5">
          {['#f0c0c0','#f0e0b0','#c0e0c0'].map((c,i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:c}}/>)}
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-3 text-2xs text-ss-ghost font-mono">
            <span className="opacity-60">Boards</span>
            <span className="opacity-60">Archive</span>
            <span className="opacity-60">Favorites</span>
          </div>
        </div>
      </div>
      {/* Layout: sidebar + canvas */}
      <div className="flex" style={{ height: 280 }}>
        {/* Sidebar */}
        <div className="w-36 border-r border-ss-border bg-ss-surface/30 flex-shrink-0 p-3">
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-3">My Field</p>
          {['Field Recordings','Signal Chains','References','Ideas','Archive'].map(item => (
            <div key={item} className={`text-xs py-1.5 px-2 rounded mb-0.5 truncate
              ${item === 'Field Recordings' ? 'bg-ss-ink text-white font-medium' : 'text-ss-dim hover:text-ss-ink'}`}>
              {item}
            </div>
          ))}
          <div className="mt-4 pt-3 border-t border-ss-border/50">
            <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-2">Collections</p>
            {['Field Rec.','Textures','Ideas'].map(item => (
              <div key={item} className="text-xs text-ss-dim py-1 px-2 truncate">{item}</div>
            ))}
          </div>
        </div>
        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[#fafaf8]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 165,60 C 185,80 210,90 220,110" stroke="#d4d0c8" strokeWidth="0.8" fill="none" strokeDasharray="3 3"/>
            <path d="M 165,170 C 185,165 200,160 200,155" stroke="#d4d0c8" strokeWidth="0.8" fill="none" strokeDasharray="3 3"/>
            <circle cx="165" cy="60" r="2" fill="#c8c4bc"/>
            <circle cx="165" cy="170" r="2" fill="#c8c4bc"/>
          </svg>
          {cards.map((card, i) => (
            <div key={i} className="absolute bg-white rounded-lg border border-ss-border shadow-sm p-2.5"
              style={{ left: card.left, top: card.top, width: card.w }}>
              <p className="font-mono text-2xs text-ss-ghost uppercase mb-1" style={{fontSize:9}}>{card.type}</p>
              {card.hasWave && (
                <div className="flex items-center gap-px mb-1 h-4">
                  {[3,5,8,4,11,7,3,9,6,4,8,5,10,3,7].map((h,j) => (
                    <div key={j} style={{width:2,height:h,backgroundColor:'#1a1814',borderRadius:1,opacity:0.55,flexShrink:0}}/>
                  ))}
                </div>
              )}
              {card.hasImg && (
                <div className="w-full aspect-video bg-ss-surface rounded overflow-hidden mb-1">
                  <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&q=50"
                    alt="" className="w-full h-full object-cover"/>
                </div>
              )}
              <p className="font-sans font-semibold text-ss-ink leading-tight" style={{fontSize:10}}>{card.title}</p>
            </div>
          ))}
        </div>
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
