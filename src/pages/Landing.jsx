// Landing.jsx — staticfield homepage
// ONLY this file changes. Nothing else.

import { useState } from 'react'

function ConnectedField() {
  return (
    <div className="relative mx-auto w-full max-w-[760px] select-none lg:h-[620px] h-[520px]">
      <div className="absolute inset-0 rounded-[28px] bg-[#fbf7ef]/60 opacity-80 blur-3xl" />
      <div className="absolute -bottom-10 right-3 h-40 w-64 rotate-[-8deg] overflow-hidden rounded-xl border border-white/70 bg-white/45 p-2 shadow-[0_18px_50px_rgba(88,68,45,0.18)]">
        <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=520&q=70" alt="" className="h-full w-full rounded-lg object-cover opacity-80" />
      </div>
      <div className="absolute right-0 top-28 hidden h-52 w-36 rotate-[4deg] border border-[#d8d0c4] bg-[#f6efe3] p-4 shadow-[0_16px_38px_rgba(88,68,45,0.14)] sm:block">
        <p className="font-mono text-xs leading-relaxed text-ss-dim">slow<br/>evolving<br/>textures<br/>+ space</p>
      </div>

      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 760 620" style={{ zIndex: 5 }}>
        {[
          'M 238 122 C 292 108 308 129 346 150',
          'M 435 172 C 482 182 500 212 526 252',
          'M 368 244 C 322 268 292 286 248 302',
          'M 381 284 C 416 340 432 376 476 416',
          'M 252 406 C 315 421 355 430 433 430',
          'M 574 338 C 548 376 535 398 512 416',
          'M 318 172 C 282 204 247 225 194 247',
        ].map((path, index) => (
          <path key={path} d={path} className="living-line" style={{ animationDelay: `${0.2 + index * 0.08}s` }} />
        ))}
        {[238,122,346,150,435,172,526,252,248,302,381,284,476,416,252,406,433,430,574,338,512,416,194,247].reduce((dots, value, index, arr) => {
          if (index % 2 === 0) dots.push([value, arr[index + 1]])
          return dots
        }, []).map(([cx, cy], index) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" className="living-dot" style={{ animationDelay: `${0.45 + index * 0.05}s` }} />
        ))}
      </svg>

      <div className="living-card absolute left-[4%] top-[6%] w-[225px] rotate-[-2deg]" style={{ zIndex: 9, animationDelay: '0s' }}>
        <div className="overflow-hidden rounded-xl border border-ss-border bg-white shadow-[0_16px_38px_rgba(58,45,32,0.16)]">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=520&q=75" alt="" className="h-28 w-full object-cover" />
          <div className="px-3.5 py-3">
            <p className="mb-1 font-mono text-2xs uppercase tracking-widest text-ss-ghost">Image Signal</p>
            <p className="text-sm font-semibold text-ss-ink">Morning layers</p>
            <p className="mt-0.5 text-xs text-ss-dim">Alps, 06:47</p>
          </div>
        </div>
      </div>

      <div className="living-card absolute left-[40%] top-[10%] w-[165px] rotate-[-1deg]" style={{ zIndex: 11, animationDelay: '0.9s' }}>
        <div className="rounded-xl border border-ss-border bg-[#fbf6eb] px-4 py-4 shadow-[0_12px_28px_rgba(58,45,32,0.13)]">
          <p className="mb-3 font-mono text-2xs uppercase tracking-widest text-ss-ghost">Note Signal</p>
          <p className="font-mono text-sm leading-relaxed text-ss-ink">leave more<br/>silence</p>
        </div>
      </div>

      <div className="living-card absolute left-[67%] top-[8%] w-[190px] rotate-[3deg]" style={{ zIndex: 8, animationDelay: '0.5s' }}>
        <div className="overflow-hidden rounded-xl border border-ss-border bg-white shadow-[0_16px_34px_rgba(58,45,32,0.15)]">
          <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=420&q=70" alt="" className="h-28 w-full object-cover" />
          <div className="px-3.5 py-3">
            <p className="text-sm font-semibold text-ss-ink">Studio corner</p>
            <p className="mt-0.5 font-mono text-2xs uppercase tracking-widest text-ss-ghost">Image Signal</p>
          </div>
        </div>
      </div>

      <div className="living-card absolute left-[18%] top-[34%] w-[215px] rotate-[1deg]" style={{ zIndex: 10, animationDelay: '1.6s' }}>
        <div className="rounded-xl border border-ss-border bg-[#faf3df] p-4 shadow-[0_14px_32px_rgba(58,45,32,0.13)]">
          <p className="mb-2 font-mono text-2xs uppercase tracking-widest text-ss-ghost">Signal Chain</p>
          <p className="mb-3 text-sm font-semibold text-ss-ink">Delay / Filter / Reverb</p>
          <div className="flex flex-wrap gap-1.5">
            {['Delay','Filter','Reverb'].map(item => (
              <span key={item} className="rounded-md border border-ss-border bg-white/85 px-2 py-1 font-mono text-2xs text-ss-ink">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="living-card absolute left-[48%] top-[31%] w-[220px] rotate-[-1deg]" style={{ zIndex: 12, animationDelay: '1.1s' }}>
        <div className="rounded-xl border border-ss-border bg-white p-4 shadow-[0_16px_38px_rgba(58,45,32,0.16)]">
          <p className="mb-2 font-mono text-2xs uppercase tracking-widest text-ss-ghost">Link Signal</p>
          <p className="mb-1.5 text-sm font-semibold text-ss-ink">ModWiggler Thread</p>
          <p className="mb-3 font-mono text-2xs leading-relaxed text-ss-dim">Designing with space - minimal patches</p>
          <span className="font-mono text-2xs text-ss-accent">modwiggler.com</span>
        </div>
      </div>

      <div className="living-card absolute left-[6%] top-[58%] w-[190px] rotate-[-1deg]" style={{ zIndex: 9, animationDelay: '2.4s' }}>
        <div className="rounded-xl border border-ss-border bg-white p-4 shadow-[0_14px_30px_rgba(58,45,32,0.12)]">
          <p className="mb-2 font-mono text-2xs uppercase tracking-widest text-ss-ghost">Pattern Signal</p>
          <p className="mb-2 text-sm font-semibold text-ss-ink">Ambient Idea 01</p>
          <div className="rounded-md border border-ss-border/60 bg-ss-surface/70 px-2 py-2 font-mono text-2xs text-ss-dim">C4 - Eb4 - G4</div>
          <p className="mt-2 font-mono text-2xs text-ss-ghost">72 bpm</p>
        </div>
      </div>

      <div className="living-card absolute left-[43%] top-[64%] w-[215px] rotate-[2deg]" style={{ zIndex: 10, animationDelay: '2s' }}>
        <div className="overflow-hidden rounded-xl border border-ss-border bg-white shadow-[0_16px_38px_rgba(58,45,32,0.16)]">
          <div className="relative aspect-video bg-ss-ink">
            <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=420&q=70" alt="" className="h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md">
                <span className="ml-0.5 text-sm text-ss-ink">▶</span>
              </div>
            </div>
          </div>
          <div className="px-3.5 py-3">
            <p className="mb-1 font-mono text-2xs uppercase tracking-widest text-ss-ghost">YouTube Signal</p>
            <p className="text-sm font-semibold text-ss-ink">Making an ambient patch</p>
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
    desc: 'Save images,\nlinks, notes and more.',
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

const EARLY_STORIES = [
  {
    quote: 'Staticfield became the place where unfinished sounds could stay alive. I collect patch notes, images and references without forcing them into a project too early.',
    name: 'Mara V.',
    role: 'Ambient artist',
    initials: 'MV',
    tone: '#eef1e8',
  },
  {
    quote: 'I use it between modular sessions. A cable idea, a YouTube reference, a small text note - they can sit together until the next patch starts making sense.',
    name: 'Jonas K.',
    role: 'Modular musician',
    initials: 'JK',
    tone: '#f5eee8',
  },
  {
    quote: 'It feels less like managing files and more like returning to a room of clues. The connections help me remember why something mattered in the first place.',
    name: 'Lea R.',
    role: 'Sound collector',
    initials: 'LR',
    tone: '#eef0f4',
  },
]

// ─── REAL FIELDS DATA ─────────────────────────────────────

const FILTER_TAGS = ['All','Ambient','Modular','References','Sound Design','Textures','Research']

const REAL_FIELDS = [
  { id: 1, title: 'Distant Memories',        creator: 'Alex R.',    category: 'Ambient',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=70' },
  { id: 2, title: 'Granular Experiments',     creator: 'Mira K.',    category: 'Sound Design',
    img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=70' },
  { id: 3, title: 'Modular Ideas',            creator: 'Jonas T.',   category: 'Modular',
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=70' },
  { id: 4, title: 'Forest Sessions',          creator: 'Lea S.',     category: 'References',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&q=70' },
  { id: 5, title: 'Tape Texture Studies',     creator: 'Omar F.',    category: 'Textures',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=70' },
  { id: 6, title: 'Signal Research Notes',    creator: 'Nina V.',    category: 'Research',
    img: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=500&q=70' },
]

// ─── APP PREVIEW — Browser Chrome ────────────────────────

function AppPreview() {
  const cards = [
    { type: 'Image Signal', title: 'Rain texture reference', hasWave: true, left: 30, top: 20, w: 175 },
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
          <span className="font-sans text-2xs text-ss-ink truncate">Coastal Textures - Staticfield</span>
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

export default function Landing({ setPage, openField }) {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = REAL_FIELDS.filter(f => activeTag === 'All' || f.category === activeTag)

  return (
    <div className="min-h-screen bg-ss-bg">

      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden pt-14 bg-[#f8f2e8]">
        <div className="absolute inset-0 opacity-70">
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1800&q=80"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,247,242,0.98)_0%,rgba(250,247,242,0.92)_31%,rgba(250,247,242,0.64)_58%,rgba(250,247,242,0.38)_100%)]" />
        <div className="absolute left-0 bottom-0 h-52 w-80 bg-[#e5d4ba]/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 xl:gap-12 min-h-[700px]">

            {/* LEFT */}
            <div className="lg:w-[39%] flex-shrink-0 z-10 relative pt-4 lg:pt-0">

              <h1 className="font-sans leading-[1.04] mb-6 animate-slide-up"
                style={{ fontWeight: 800, fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                  animationFillMode: 'forwards', animationDelay: '0.04s' }}>
                Patch <span style={{
                  background: 'linear-gradient(135deg, #c45a64 0%, #6b8fc4 55%, #2e8a8a 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>signals</span><br/>
                into ideas.
              </h1>

              <p className="text-base sm:text-lg text-[#6f5842] leading-relaxed mb-8 max-w-md animate-slide-up"
                style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}>
                Collect sounds, patches, links and references.<br/>
                Connect them. Develop ideas over time.<br/>
                <span className="block mt-3">For modular musicians, ambient artists and curious collectors.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 animate-slide-up"
                style={{ animationFillMode: 'forwards', animationDelay: '0.16s' }}>
                <button onClick={() => setPage('fields')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors">
                  Start your field →
                </button>
                <button onClick={() => openField('b01')}
                  className="text-sm text-ss-dim hover:text-ss-ink transition-colors underline underline-offset-4 decoration-ss-border">
                  Explore demo field
                </button>
              </div>
            </div>

            {/* RIGHT — Field visualization, desktop only */}
            <div className="mt-8 lg:mt-0 lg:block flex-1 relative">
              <ConnectedField />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FEATURE STRIP ══════════ */}
      <section className="border-t border-ss-border py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-9 sm:gap-12">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex flex-col gap-3.5">
                <div className="w-11 h-11 rounded-lg border border-ss-border flex items-center justify-center text-ss-dim [&_svg]:w-6 [&_svg]:h-6">
                  {f.icon}
                </div>
                <h3 className="font-sans font-semibold text-base text-ss-ink">{f.title}</h3>
                <p className="text-sm text-ss-dim leading-relaxed whitespace-pre-line">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {EARLY_STORIES.map(story => (
              <article
                key={story.name}
                className="rounded-xl border border-ss-border bg-[#f5f2ed] px-6 py-6 sm:px-7 sm:py-7"
              >
                <div className="mb-8">
                  <div
                    className="mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-ss-border text-xs font-semibold text-ss-dim"
                    style={{ backgroundColor: story.tone }}
                  >
                    {story.initials}
                  </div>
                  <p className="text-base text-ss-ink leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-full border border-ss-border"
                    style={{ backgroundColor: story.tone }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-ss-ink">{story.name}</p>
                    <p className="text-xs text-ss-dim">{story.role}</p>
                  </div>
                </div>
              </article>
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
                Staticfield is a minimal workspace<br/>
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

    </div>
  )
}
