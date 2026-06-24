// Manifesto.jsx — Platzhalter
export default function Manifesto({ setPage }) {
  return (
    <div className="min-h-screen pt-14 bg-ss-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">

        <div className="mb-12">
          <h1 className="font-sans font-bold text-4xl sm:text-5xl text-ss-ink leading-tight mb-6">
            Why Staticfield exists.
          </h1>
          <div className="w-12 h-0.5 bg-ss-accent mb-8"/>
        </div>

        <div className="space-y-8 text-sm text-ss-dim leading-relaxed">
          <p className="text-lg text-ss-ink font-medium leading-relaxed">
            Most tools are built for output. Staticfield is built for process.
          </p>
          <p>
            Sound is not linear. Ideas don't arrive in order. Creative work is a field —
            open, shifting, connected in ways that can't be planned in advance.
          </p>
          <p>
            We built Staticfield because we needed a place to think before we produce.
            A space for field recordings, synth patches, tape aesthetics, signal chains,
            reference images, half-finished notes. A place where everything can connect to everything.
          </p>
          <p>
            Not a DAW. Not a mood board. Not a productivity app.<br/>
            A field. Yours.
          </p>

          <div className="border-t border-ss-border pt-8">
            <p className="font-mono text-2xs text-ss-ghost">Staticfield - JARKAZ Labs, 2026</p>
          </div>
        </div>

        <div className="mt-12">
          <button onClick={() => setPage('fields')}
            className="flex items-center gap-2 px-5 py-3 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors">
            Start your field →
          </button>
        </div>
      </div>
    </div>
  )
}
