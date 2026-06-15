// HeroPreview.jsx — Mockup-style: Cards links + rechts der Headline

// Mini-Waveform SVG
function Waveform({ heights, color = '#1a1814', opacity = 0.7 }) {
  return (
    <div className="flex items-center gap-px" style={{ height: 28 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 2.5, height: h, backgroundColor: color,
          borderRadius: 1, opacity, flexShrink: 0 }} />
      ))}
    </div>
  )
}

const WAVE1 = [3,6,10,14,8,16,11,5,13,9,12,7,15,8,6,11,13,5,9,14,7,10,4,8,12,6,9,5,8,13,7,11,4,9,12]
const WAVE2 = [2,5,9,13,7,15,10,4,12,8,11,6,14,7,5,10,12,4,8,15,6,9,3,7,11,5,10,4,7,12,6,10,3,8,11]

export default function HeroPreview() {
  return (
    <div className="relative w-full pointer-events-none" style={{ height: 560 }}>

      {/* SVG Verbindungslinien — alle Koordinaten sind relativ zur Containerbreite */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1, overflow: 'visible' }}>
        {/* note → field recording */}
        <path d="M 215,128 C 215,175 195,210 195,248" stroke="#c8c4bc" strokeWidth="1" fill="none"/>
        <circle cx="215" cy="128" r="3.5" fill="#b8b4ac"/>
        {/* field recording → synth patch */}
        <path d="M 195,330 C 195,370 205,400 205,430" stroke="#c8c4bc" strokeWidth="1" fill="none"/>
        <circle cx="195" cy="330" r="3.5" fill="#b8b4ac"/>
        {/* modular image → vinyl crackle */}
        <path d="M 820,220 C 820,240 890,248 890,268" stroke="#c8c4bc" strokeWidth="1" fill="none"/>
        <circle cx="820" cy="220" r="3.5" fill="#b8b4ac"/>
        {/* vinyl crackle → forest image */}
        <path d="M 890,360 C 890,380 860,390 840,400" stroke="#c8c4bc" strokeWidth="1" fill="none"/>
        <circle cx="890" cy="360" r="3.5" fill="#b8b4ac"/>
        {/* forest image → note card */}
        <path d="M 1000,470 C 1040,470 1060,455 1090,445" stroke="#c8c4bc" strokeWidth="1" fill="none"/>
        <circle cx="1000" cy="470" r="3.5" fill="#b8b4ac"/>
        {/* effect chain → tape image */}
        <path d="M 1000,660 C 1040,650 1060,640 1090,630" stroke="#c8c4bc" strokeWidth="1" fill="none"/>
        <circle cx="1000" cy="660" r="3.5" fill="#b8b4ac"/>
      </svg>

      {/* ─── LEFT CARDS ─── */}

      {/* Note / label card — top left */}
      <div className="absolute" style={{ left: 40, top: 60, width: 195, zIndex: 2,
        animation: 'heroFloat 22s ease-in-out 0s infinite alternate' }}>
        <div className="rounded-xl border border-ss-border shadow-sm p-3.5" style={{ backgroundColor: '#faf6e8' }}>
          <p className="font-mono text-xs text-ss-dim leading-relaxed">
            field recording<br/>early morning<br/>rain on metal roof
          </p>
        </div>
      </div>

      {/* Field Recording audio card */}
      <div className="absolute" style={{ left: 40, top: 200, width: 220, zIndex: 2,
        animation: 'heroFloat 26s ease-in-out 2s infinite alternate' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md p-3.5">
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-2">Field Recording</p>
          <Waveform heights={WAVE1} />
          <div className="flex items-center justify-between mt-2">
            <p className="font-mono text-2xs text-ss-dim truncate">Rain on metal roof.wav</p>
            <span className="text-ss-ink text-xs ml-2">▶</span>
          </div>
        </div>
      </div>

      {/* Synth Patch card */}
      <div className="absolute" style={{ left: 30, top: 390, width: 210, zIndex: 2,
        animation: 'heroFloat 20s ease-in-out 4s infinite alternate' }}>
        <div className="rounded-xl border border-ss-border shadow-sm p-3.5" style={{ backgroundColor: '#eef1e8' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Synth Patch</p>
          <p className="font-sans font-semibold text-sm text-ss-ink mb-3">Atmos Drift</p>
          {/* Mini patch diagram */}
          <div className="flex items-center gap-2 mb-3">
            {[0,1,2,3].map(i => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full border border-ss-border/60 bg-white/60 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-ss-dim/40"/>
                </div>
                <div className="w-4 h-0.5 bg-ss-border/60 rounded"/>
              </div>
            ))}
          </div>
          <span className="font-mono text-2xs text-ss-dim border border-ss-border/50 bg-white/50 px-2 py-0.5 rounded-md">
            Mutable Instruments
          </span>
        </div>
      </div>

      {/* ─── RIGHT CARDS ─── */}

      {/* Modular photo — top right */}
      <div className="absolute" style={{ right: 80, top: 40, width: 185, zIndex: 2,
        animation: 'heroFloat 24s ease-in-out 1s infinite alternate' }}>
        <div className="rounded-xl border border-ss-border shadow-md overflow-hidden">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=75"
              alt="" className="w-full aspect-square object-cover"/>
            {/* Connect dot */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-ss-ink border-2 border-white"/>
          </div>
        </div>
      </div>

      {/* Vinyl Crackle — right */}
      <div className="absolute" style={{ right: 30, top: 230, width: 215, zIndex: 3,
        animation: 'heroFloat 18s ease-in-out 3s infinite alternate' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-md p-3.5">
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Sample</p>
          <p className="font-sans font-semibold text-sm text-ss-ink mb-2.5">Vinyl Crackle 03</p>
          <Waveform heights={WAVE2} />
          <div className="flex items-center justify-between mt-2">
            <span className="text-ss-ink text-xs">▶</span>
            <span className="font-mono text-2xs text-ss-dim">00:07</span>
          </div>
        </div>
      </div>

      {/* Forest image */}
      <div className="absolute" style={{ right: 140, top: 390, width: 165, zIndex: 2,
        animation: 'heroFloat 30s ease-in-out 2.5s infinite alternate' }}>
        <div className="rounded-xl border border-ss-border shadow-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=75"
            alt="" className="w-full aspect-[4/3] object-cover"/>
        </div>
      </div>

      {/* Note card */}
      <div className="absolute" style={{ right: 20, top: 415, width: 175, zIndex: 3,
        animation: 'heroFloat 22s ease-in-out 6s infinite alternate' }}>
        <div className="bg-white rounded-xl border border-ss-border shadow-sm p-3.5">
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-2">Note</p>
          <p className="font-mono text-sm text-ss-ink leading-relaxed">
            texture, space<br/>movement<br/>let it breathe
          </p>
          <p className="font-mono text-2xs text-ss-ghost/50 mt-3">12.05.24</p>
        </div>
      </div>

      {/* Effect Chain card */}
      <div className="absolute" style={{ right: 145, top: 580, width: 215, zIndex: 3,
        animation: 'heroFloat 19s ease-in-out 1.5s infinite alternate' }}>
        <div className="rounded-xl border border-ss-border shadow-md p-3.5" style={{ backgroundColor: '#faf6e8' }}>
          <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">Effect Chain</p>
          <p className="font-sans font-semibold text-sm text-ss-ink mb-2.5">Tape → Filter → Reverb</p>
          <div className="flex items-center gap-2">
            {['Tape','Filter','Reverb'].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-2">
                <span className="font-mono text-2xs text-ss-ink bg-white border border-ss-border/60 px-2 py-1.5 rounded-lg">
                  {item}
                </span>
                {i < arr.length-1 && <span className="text-ss-ghost/50 text-xs">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tape machine photo */}
      <div className="absolute" style={{ right: 20, top: 570, width: 150, zIndex: 2,
        animation: 'heroFloat 27s ease-in-out 4s infinite alternate' }}>
        <div className="rounded-xl border border-ss-border shadow-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75"
            alt="" className="w-full aspect-square object-cover"/>
        </div>
      </div>

    </div>
  )
}
