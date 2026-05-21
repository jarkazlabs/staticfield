// Landing.jsx — staticfield Hero nach Mockup
import { useState } from 'react'
import { DEMO_BOARDS } from '../data/signals.js'
import { boardCollages } from '../data/discovery.js'
import BoardCollage from '../components/BoardCollage.jsx'

// ─── Floating Hero Cards ──────────────────────────────────

function Waveform({ heights, color = '#1a1814', opacity = 0.7 }) {
  return (
    <div className="flex items-center gap-px" style={{ height: 24 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 2.5, height: h, backgroundColor: color,
          borderRadius: 1, opacity, flexShrink: 0 }} />
      ))}
    </div>
  )
}

const WAVE1 = [3,6,10,14,8,16,11,5,13,9,12,7,15,8,6,11,13,5,9,14,7,10,4,8,12]
const WAVE2 = [2,5,9,13,7,15,10,4,12,8,11,6,14,7,5,10,12,4,8,15,6,9,3,7,11]

function HeroCards() {
  return (
    <div className="relative w-full h-full">

      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <path d="M 140,95 C 140,140 160,160 160,200" stroke="#d4d0c8" strokeWidth="1" fill="none"/>
        <circle cx="140" cy="95" r="3" fill="#c8c4bc"/>
        <path d="M 160,300 C 160,340 200,350 240,360" stroke="#d4d0c8" strokeWidth="1" fill="none"/>
        <circle cx="160" cy="300" r="3" fill="#c8c4bc"/>
        <path d="M 390,80 C 390,110 370,130 350,150" stroke="#d4d0c8" strokeWidth="1" fill="none"/>
        <circle cx="390" cy="80" r="3" fill="#c8c4bc"/>
        <path d="M 390,200 C 390,240 400,270 410,300" stroke="#d4d0c8" strokeWidth="1" fill="none"/>
        <circle cx="390" cy="200" r="3" fill="#c8c4bc"/>
        <path d="M 430,390 C 460,380 480,370 500,360" stroke="#d4d0c8" strokeWidth="1" fill="none"/>
        <circle cx="430" cy="390" r="3" fill="#c8c4bc"/>
      </svg>

      {/* IMAGE card */}
      <div className="absolute" style={{ left: 20, top: 30, width: 200, zIndex: 2,
        animation: 'heroFloat 22s ease-in-out 0s infinite alternate' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md overflow-hidden">
          <div className="w-full aspect-video bg-ss-surface overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75"
              alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="p-3">
            <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Image</p>
            <p className="font-sans font-semibold text-xs text-ss-ink">Fog Layer, 04:17</p>
            <p className="font-mono text-2xs text-ss-dim mt-1">A single long take through morning fog.</p>
          </div>
        </div>
      </div>

      {/* NOTE card */}
      <div className="absolute" style={{ left: 245, top: 20, width: 185, zIndex: 3,
        animation: 'heroFloat 26s ease-in-out 2s infinite alternate' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md p-3.5">
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-2">Note</p>
          <p className="font-sans font-semibold text-sm text-ss-ink leading-snug mb-1">On silence</p>
          <p className="font-mono text-xs text-ss-dim leading-relaxed">
            The most interesting space in a patch is what you remove. Silence is not absence.
          </p>
          <p className="font-mono text-2xs text-ss-ghost/50 mt-3">12.05.24</p>
        </div>
      </div>

      {/* IMAGE card top right */}
      <div className="absolute" style={{ right: 10, top: 10, width: 160, zIndex: 2,
        animation: 'heroFloat 20s ease-in-out 1s infinite alternate' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=75"
            alt="" className="w-full aspect-video object-cover"/>
        </div>
      </div>

      {/* LINK card */}
      <div className="absolute" style={{ left: 20, top: 240, width: 210, zIndex: 2,
        animation: 'heroFloat 24s ease-in-out 3s infinite alternate' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md p-3.5">
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Link</p>
          <p className="font-sans font-semibold text-sm text-ss-ink mb-1">ModWiggler Thread</p>
          <p className="font-mono text-xs text-ss-dim mb-2">Designing with space — minimal patches that breathe</p>
          <span className="font-mono text-2xs text-ss-accent">↗ modwiggler.com</span>
        </div>
      </div>

      {/* SIGNAL-CHAIN card */}
      <div className="absolute" style={{ left: 245, top: 195, width: 210, zIndex: 3,
        animation: 'heroFloat 18s ease-in-out 0.5s infinite alternate' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md p-3.5">
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Signal-Chain</p>
          <p className="font-sans font-semibold text-sm text-ss-ink mb-2.5">Reverb Chain</p>
          <div className="flex flex-col gap-1">
            {['Clouds','Erbe-Verb','Spring Tank'].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="font-mono text-2xs text-ss-ink bg-ss-surface border border-ss-border px-2 py-1 rounded-md">{item}</span>
                {i < arr.length-1 && <span className="text-ss-ghost/50 text-xs">↓</span>}
              </span>
            ))}
          </div>
          <p className="font-mono text-2xs text-ss-dim mt-2">Long tail, pre-delay 40ms.</p>
        </div>
      </div>

      {/* SYNTH PATCH card */}
      <div className="absolute" style={{ left: 20, top: 430, width: 185, zIndex: 2,
        animation: 'heroFloat 28s ease-in-out 4s infinite alternate' }}>
        <div className="rounded-xl border border-ss-border shadow-sm p-3.5" style={{ backgroundColor: '#eef1e8' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Synth Patch</p>
          <p className="font-sans font-semibold text-sm text-ss-ink mb-3">Atmos Drift</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-2xs text-ss-dim border border-ss-border/50 bg-white/70 px-1.5 py-0.5 rounded-md">Mutable Instruments</span>
          </div>
        </div>
      </div>

      {/* NOTE card bottom right */}
      <div className="absolute" style={{ left: 245, top: 400, width: 195, zIndex: 3,
        animation: 'heroFloat 22s ease-in-out 6s infinite alternate' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-sm p-3.5">
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-2">Note</p>
          <p className="font-mono text-sm text-ss-ink leading-relaxed">
            texture, space<br/>movement<br/>let it breathe
          </p>
          <p className="font-mono text-2xs text-ss-ghost/50 mt-3">12.05.24</p>
        </div>
      </div>

      {/* EFFECT CHAIN + image bottom right */}
      <div className="absolute" style={{ right: 10, top: 320, width: 200, zIndex: 2,
        animation: 'heroFloat 19s ease-in-out 2s infinite alternate' }}>
        <div className="rounded-xl border border-ss-border shadow-md p-3" style={{ backgroundColor: '#faf6e8' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Effect Chain</p>
          <p className="font-sans font-semibold text-sm text-ss-ink mb-2">Tape → Filter → Reverb</p>
          <div className="flex items-center gap-1.5">
            {['Tape','Filter','Reverb'].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-1">
                <span className="font-mono text-2xs text-ss-ink bg-white border border-ss-border/60 px-1.5 py-1 rounded-md">{item}</span>
                {i < arr.length-1 && <span className="text-ss-ghost/50 text-xs">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Image bottom right */}
      <div className="absolute" style={{ right: 10, top: 460, width: 145, zIndex: 2,
        animation: 'heroFloat 25s ease-in-out 3.5s infinite alternate' }}>
        <div className="rounded-xl border border-ss-border shadow-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&q=75"
            alt="" className="w-full aspect-square object-cover"/>
        </div>
      </div>

    </div>
  )
}

// ─── Feature Item ─────────────────────────────────────────

function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-10 h-10 rounded-lg border border-ss-border flex items-center justify-center text-ss-dim">
        {icon}
      </div>
      <h3 className="font-sans font-semibold text-sm text-ss-ink">{title}</h3>
      <p className="text-xs text-ss-dim leading-relaxed">{description}</p>
    </div>
  )
}

// ─── Fields in Action ────────────────────────────────────

const DEMO_FIELDS = [
  {
    id: 'b01', title: 'Distant Memories',
    author: 'Alex R.', category: 'Ambient',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=70',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&q=70',
      'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=300&q=70',
    ],
  },
  {
    id: 'b02', title: 'Granular Experiments',
    author: 'Mira K.', category: 'Sound Design',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=75',
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=70',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=70',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70',
    ],
  },
  {
    id: 'b03', title: 'Modular Ideas',
    author: 'Jonas T.', category: 'Experimental',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=70',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=70',
      'https://images.unsplash.com/photo-1574169208507-84376144848b?w=300&q=70',
    ],
  },
]

const TAGS = ['All', 'Ambient', 'Experimental', 'Sound Design', 'Research']

function FieldPreviewCard({ field, onClick }) {
  const seed = field.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  function pr(i) { const x = Math.sin(seed * 9301 + i * 49297) * 10000; return x - Math.floor(x) }

  const placements = [
    { top: '5%',  left: '5%',  w: '55%', rot: pr(0)*4-2 },
    { top: '20%', left: '40%', w: '50%', rot: pr(1)*5-2.5 },
    { top: '50%', left: '10%', w: '42%', rot: pr(2)*4-2 },
  ]

  return (
    <button onClick={onClick} className="text-left group w-full">
      <div className="w-full rounded-xl overflow-hidden border border-ss-border mb-4 relative"
        style={{ height: 220, background: 'linear-gradient(135deg, #f5f2ed, #ece8e2)' }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '20px 20px' }}/>
        {field.images.map((url, i) => (
          <div key={i} className="absolute overflow-hidden rounded-lg shadow-md"
            style={{ top: placements[i].top, left: placements[i].left, width: placements[i].w,
              aspectRatio: '4/3', transform: `rotate(${placements[i].rot}deg)`, zIndex: i+1 }}>
            <img src={url} alt="" className="w-full h-full object-cover"/>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sans font-semibold text-base text-ss-ink group-hover:text-ss-accent transition-colors">{field.title}</h3>
          <p className="text-xs text-ss-ghost mt-0.5">by {field.author}</p>
        </div>
        <span className="font-mono text-2xs text-ss-ghost border border-ss-border px-2 py-1 rounded-md">{field.category}</span>
      </div>
    </button>
  )
}

// ─── Avatar Cluster ───────────────────────────────────────

function AvatarCluster() {
  const colors = ['#c8b89a','#b8a88a','#d4c4b0','#bfaf9c','#a89880']
  return (
    <div className="flex -space-x-2">
      {colors.map((c, i) => (
        <div key={i} className="w-8 h-8 rounded-full border-2 border-white"
          style={{ backgroundColor: c }}/>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────

export default function Landing({ setPage, setActiveFieldId, store }) {
  const [activeTag, setActiveTag] = useState('All')

  function openField(id) {
    setActiveFieldId(id)
    setPage('field-detail')
  }

  return (
    <div className="min-h-screen bg-ss-bg">

      {/* ─── HERO ─── */}
      <section className="pt-14 min-h-screen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">

            {/* Left: Headline + CTA */}
            <div className="lg:w-[45%] flex-shrink-0 z-10 relative">

              <h1 className="font-sans text-4xl sm:text-5xl xl:text-6xl text-ss-ink leading-[1.05] mb-6"
                style={{ fontWeight: 800 }}>
                A visual space<br/>
                for sound,<br/>
                <span style={{
                  background: 'linear-gradient(135deg, #b5737a 0%, #8a9fb5 50%, #4a8a8a 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>signals</span> and<br/>
                creative drift.
              </h1>

              <p className="text-sm sm:text-base text-ss-dim leading-relaxed mb-8 max-w-sm">
                Collect sounds, images, links, notes and effects.<br/>
                Connect ideas. Shape textures.<br/>
                Build evolving fields that grow with you.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
                <button onClick={() => setPage('fields')}
                  className="flex items-center gap-2 px-5 py-3 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors">
                  Start your field →
                </button>
                <button onClick={() => setPage('explore')}
                  className="text-sm text-ss-dim font-medium hover:text-ss-ink transition-colors underline underline-offset-4 decoration-ss-border">
                  Explore fields
                </button>
              </div>

              <div className="flex items-center gap-3">
                <AvatarCluster />
                <p className="text-xs text-ss-dim leading-snug">
                  Join 8,657 creators exploring<br/>sounds and ideas every day.
                </p>
              </div>
            </div>

            {/* Right: Floating Cards — Desktop only */}
            <div className="hidden lg:block lg:flex-1 relative" style={{ height: 580 }}>
              <HeroCards />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURE BAR ─── */}
      <section className="border-t border-ss-border py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <FeatureItem
              icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>}
              title="Collect anything"
              description="Save sounds, images, links, notes and more."
            />
            <FeatureItem
              icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="4" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="14" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="14" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.3"/><line x1="6.5" y1="8" x2="11.5" y2="5" stroke="currentColor" strokeWidth="1.3"/><line x1="6.5" y1="10" x2="11.5" y2="13" stroke="currentColor" strokeWidth="1.3"/></svg>}
              title="Connect ideas"
              description="Visually connect signals and spark new ideas."
            />
            <FeatureItem
              icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 9 L4 5 L7 11 L10 3 L13 13 L16 7 L18 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
              title="Shape your sound"
              description="Add effects, shape textures and experiment freely."
            />
            <FeatureItem
              icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.3"/></svg>}
              title="Evolving by nature"
              description="Your fields grow with you. Nothing is ever final."
            />
          </div>
        </div>
      </section>

      {/* ─── FIELDS IN ACTION ─── */}
      <section className="border-t border-ss-border py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="mb-10">
            <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-4">Fields in action</p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ss-ink">See how others<br/>build their fields.</h2>
                <p className="text-sm text-ss-dim mt-2">Tap a field to explore.</p>
              </div>
              {/* Filter tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {TAGS.map(tag => (
                  <button key={tag} onClick={() => setActiveTag(tag)}
                    className={`font-sans text-xs px-3 py-1.5 rounded-lg border transition-all
                      ${activeTag === tag ? 'bg-ss-ink text-white border-ss-ink' : 'border-ss-border text-ss-dim hover:border-ss-muted hover:text-ss-ink'}`}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {DEMO_FIELDS.filter(f => activeTag === 'All' || f.category === activeTag).map((field, i) => (
              <div key={field.id} className="animate-slide-up opacity-0"
                style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.08}s` }}>
                <FieldPreviewCard field={field} onClick={() => openField(field.id)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EVERYTHING YOU NEED ─── */}
      <section className="border-t border-ss-border py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">

            {/* Left text */}
            <div className="lg:w-[40%] flex-shrink-0">
              <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-4">Designed for creators</p>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ss-ink leading-tight mb-4">
                Everything you need.<br/>Nothing you don't.
              </h2>
              <p className="text-sm text-ss-dim leading-relaxed mb-8">
                staticfield is a minimalist workspace for collecting, connecting and evolving your ideas.
              </p>
              <div className="flex items-center gap-3">
                <button onClick={() => setPage('fields')}
                  className="flex items-center gap-2 px-5 py-3 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors">
                  Start your field →
                </button>
                <button onClick={() => setPage('explore')}
                  className="text-sm text-ss-dim hover:text-ss-ink transition-colors underline underline-offset-4 decoration-ss-border">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right: UI illustration */}
            <div className="flex-1 relative">
              <div className="w-full rounded-2xl border border-ss-border overflow-hidden shadow-lg bg-white">
                {/* Mock UI Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-ss-border bg-ss-surface/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-ss-border"/>
                    <div className="w-3 h-3 rounded-full bg-ss-border"/>
                    <div className="w-3 h-3 rounded-full bg-ss-border"/>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="font-mono text-2xs text-ss-ghost">My Field</span>
                  </div>
                </div>
                {/* Mock Canvas */}
                <div className="relative p-4 overflow-hidden" style={{ height: 320,
                  background: 'radial-gradient(circle at 1px 1px, #e8e8e4 1px, transparent 0) 0 0 / 20px 20px, #fafaf8' }}>
                  {/* Mock cards */}
                  {[
                    { type: 'Field Recording', title: 'Rain on metal roof.wav', left: 20, top: 20, w: 180, hasWave: true },
                    { type: 'Note', title: 'structure is freedom', left: 230, top: 10, w: 155 },
                    { type: 'Signal Chain', title: 'Delay → Reverb', left: 20, top: 170, w: 160 },
                    { type: 'Image', title: 'Brutalist textures', left: 320, top: 110, w: 140, hasImg: true },
                    { type: 'Link', title: 'A Guide to Texture', left: 480, top: 180, w: 145 },
                  ].map((card, i) => (
                    <div key={i} className="absolute bg-white rounded-xl border border-ss-border shadow-sm p-2.5"
                      style={{ left: card.left, top: card.top, width: card.w }}>
                      <p className="font-mono text-2xs text-ss-ghost uppercase mb-1.5">{card.type}</p>
                      {card.hasWave && (
                        <div className="flex items-center gap-px mb-1.5 h-5">
                          {[3,6,9,5,12,8,4,10,7,5,9,6,11,4,8].map((h,j) => (
                            <div key={j} style={{width:2.5,height:h,backgroundColor:'#1a1814',borderRadius:1,opacity:0.6,flexShrink:0}}/>
                          ))}
                        </div>
                      )}
                      {card.hasImg && (
                        <div className="w-full aspect-video bg-ss-surface rounded-md mb-1.5 overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=60"
                            alt="" className="w-full h-full object-cover"/>
                        </div>
                      )}
                      <p className="font-sans text-xs font-semibold text-ss-ink leading-tight">{card.title}</p>
                    </div>
                  ))}
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path d="M 110,95 C 110,130 180,140 200,145" stroke="#d4d0c8" strokeWidth="1" fill="none" strokeDasharray="3 4"/>
                    <path d="M 110,185 C 140,185 200,180 200,175" stroke="#d4d0c8" strokeWidth="1" fill="none" strokeDasharray="3 4"/>
                    <circle cx="110" cy="95" r="2.5" fill="#c8c4bc"/>
                    <circle cx="110" cy="185" r="2.5" fill="#c8c4bc"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-ss-border px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
