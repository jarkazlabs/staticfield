// AtmosphericFragments.jsx
// Sehr subtile, langsam driftende Fragmente im Hero.
// Kein JavaScript-Scroll — nur CSS-Animationen.

export default function AtmosphericFragments() {
  const fragments = [
    // Waveform-Linie links
    {
      style: { top: '18%', left: '6%', opacity: 0.18 },
      animDuration: '18s', animDelay: '0s',
      content: (
        <svg width="64" height="18" viewBox="0 0 64 18" fill="none">
          {[2,5,9,4,12,7,3,10,6,8,4,11,5,9,3,7].map((h, i) => (
            <rect key={i} x={i*4} y={(14-h)/2} width="2" height={h} rx="1" fill="#9e9890"/>
          ))}
        </svg>
      ),
    },
    // Kleines Text-Fragment oben rechts
    {
      style: { top: '12%', right: '8%', opacity: 0.14 },
      animDuration: '22s', animDelay: '3s',
      content: (
        <div className="font-mono text-2xs text-ss-ghost leading-relaxed text-right">
          <div>tape · 7.5 ips</div>
          <div>oxide · B-Type</div>
        </div>
      ),
    },
    // Signal-Linie Mitte links
    {
      style: { top: '42%', left: '3%', opacity: 0.12 },
      animDuration: '26s', animDelay: '6s',
      content: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="#9e9890" strokeWidth="0.8" strokeDasharray="3 4"/>
          <circle cx="24" cy="24" r="12" stroke="#9e9890" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.6"/>
          <circle cx="24" cy="24" r="2" fill="#9e9890" opacity="0.8"/>
        </svg>
      ),
    },
    // Winziges Label unten links
    {
      style: { bottom: '22%', left: '5%', opacity: 0.15 },
      animDuration: '20s', animDelay: '9s',
      content: (
        <div className="font-mono text-2xs text-ss-ghost border border-ss-border/40 px-2 py-1 rounded bg-white/40 backdrop-blur-sm">
          field rec · dawn
        </div>
      ),
    },
    // Waveform rechts Mitte
    {
      style: { top: '35%', right: '4%', opacity: 0.16 },
      animDuration: '24s', animDelay: '4s',
      content: (
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
          <polyline
            points="0,12 6,6 12,16 18,4 24,18 30,8 36,14 42,5 48,12"
            stroke="#9e9890" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      ),
    },
    // Tiny diagram
    {
      style: { bottom: '28%', right: '6%', opacity: 0.13 },
      animDuration: '30s', animDelay: '12s',
      content: (
        <svg width="56" height="32" viewBox="0 0 56 32" fill="none">
          <rect x="1" y="8" width="16" height="16" rx="2" stroke="#9e9890" strokeWidth="0.8"/>
          <line x1="17" y1="16" x2="27" y2="16" stroke="#9e9890" strokeWidth="0.8" strokeDasharray="2 2"/>
          <rect x="27" y="8" width="16" height="16" rx="2" stroke="#9e9890" strokeWidth="0.8"/>
          <line x1="43" y1="16" x2="55" y2="16" stroke="#9e9890" strokeWidth="0.8" strokeDasharray="2 2"/>
        </svg>
      ),
    },
    // Sehr kleiner Text oben Mitte-links
    {
      style: { top: '28%', left: '9%', opacity: 0.11 },
      animDuration: '34s', animDelay: '2s',
      content: (
        <div className="font-mono text-2xs text-ss-ghost/60 leading-snug">
          <div>rings → clouds</div>
          <div>∿ 23 min</div>
        </div>
      ),
    },
    // Dünne horizontale Linie
    {
      style: { bottom: '35%', left: '7%', opacity: 0.10 },
      animDuration: '28s', animDelay: '15s',
      content: (
        <svg width="80" height="8" viewBox="0 0 80 8" fill="none">
          <line x1="0" y1="4" x2="80" y2="4" stroke="#9e9890" strokeWidth="0.6" strokeDasharray="3 5"/>
          <circle cx="0" cy="4" r="2" fill="#9e9890" opacity="0.6"/>
          <circle cx="80" cy="4" r="2" fill="#9e9890" opacity="0.6"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {fragments.map((f, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            ...f.style,
            animation: `heroFloat ${f.animDuration} ease-in-out ${f.animDelay} infinite alternate`,
          }}
        >
          {f.content}
        </div>
      ))}
    </div>
  )
}
