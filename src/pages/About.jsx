// About.jsx — Manifest, helles Theme
export default function About() {
  return (
    <div className="min-h-screen pt-11 bg-ss-bg">
      <div className="max-w-2xl mx-auto px-6 py-16">

        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
          <span className="font-mono text-2xs text-ss-ghost tracking-widest uppercase">About</span>
        </div>
        <h1 className="font-sans text-5xl text-ss-ink mb-12 pb-10 border-b border-ss-border" style={{ fontWeight: 600 }}>
          What is graain?
        </h1>

        <blockquote className="font-sans text-2xl text-ss-ink italic leading-snug mb-12 pl-5 border-l-2 border-ss-muted">
          A calm visual workspace for sound, texture and signal culture.
        </blockquote>

        <div className="space-y-10">
          {[
            {
              heading: 'Why this exists',
              body: 'Most tools are built for productivity. graain is built for culture. A place to collect, organize and connect the things that shape how you work with sound — gear you love, patches that worked, field recordings you made, notes you wrote at 2am.',
            },
            {
              heading: "Who it's for",
              body: 'Modular synthesists. Ambient musicians. Tape obsessives. Field recording artists. Sound designers. Anyone who thinks about signal flow not just technically, but aesthetically.',
            },
            {
              heading: 'How it works',
              body: 'You open fields for specific territories. Inside each field, you patch signals — images, audio, gear notes, links, signal chains, and written notes — and draw connections between them.',
            },
            {
              heading: 'What it is not',
              body: 'Not a DAW. Not a social platform. Not a productivity app optimized for output. A space for thinking, not producing.',
            },
          ].map((s, i) => (
            <div key={i}>
              <h2 className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-3">{s.heading}</h2>
              <p className="text-sm text-ss-dim leading-relaxed">{s.body}</p>
            </div>
          ))}

          <div className="pt-6 border-t border-ss-border">
            <h2 className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-4">Aesthetic influences</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['Boards of Canada','Tycho','Are.na','Cosmos','Milanote','Make Noise','Mutable Instruments','Telefunken'].map(r => (
                <span key={r} className="font-sans text-base text-ss-dim italic">{r}</span>
              ))}
            </div>
          </div>

          <p className="font-mono text-2xs text-ss-ghost/50 pt-4">
            graain — MVP v0.1 — Vite + React + Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  )
}
