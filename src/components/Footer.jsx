export default function Footer({ setPage }) {
  const year = new Date().getFullYear()
  const links = ['Impressum', 'Privacy', 'Terms']

  return (
    <footer className="min-h-[100px] bg-ss-ink px-4 sm:px-6 py-8 text-white">
      <div className="max-w-7xl mx-auto min-h-[36px] flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-md">
          <p className="font-mono text-2xs text-white/55 uppercase tracking-widest mb-3">Staticfield</p>
          <p className="font-sans text-lg sm:text-xl font-semibold text-white leading-snug">
            A quiet place for signals, sketches and evolving fields.
          </p>
          <p className="text-xs text-white/55 mt-4">© {year} JARKAZ Labs. All rights reserved.</p>
        </div>

        <div className="flex flex-col sm:items-end gap-4">
          <div className="flex flex-wrap gap-2">
            {links.map(link => (
              <span
                key={link}
                className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/10 text-xs font-medium text-white/70"
              >
                {link}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPage('manifesto')}
            className="self-start sm:self-auto text-xs text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/25"
          >
            Read the manifesto
          </button>
        </div>
      </div>
    </footer>
  )
}
