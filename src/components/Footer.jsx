export default function Footer({ setPage }) {
  const year = new Date().getFullYear()
  const links = ['Impressum', 'Privacy', 'Terms']

  return (
    <footer className="border-t border-ss-accent/20 bg-ss-accentBg px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-md">
          <p className="font-mono text-2xs text-ss-accent uppercase tracking-widest mb-3">staticfield</p>
          <p className="font-sans text-lg sm:text-xl font-semibold text-ss-ink leading-snug">
            A quiet place for signals, sketches and evolving fields.
          </p>
          <p className="text-xs text-ss-dim mt-4">© {year} JARKAZ Labs. All rights reserved.</p>
        </div>

        <div className="flex flex-col sm:items-end gap-4">
          <div className="flex flex-wrap gap-2">
            {links.map(link => (
              <span
                key={link}
                className="px-3 py-1.5 rounded-lg border border-ss-accent/20 bg-white/55 text-xs font-medium text-ss-dim"
              >
                {link}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPage('manifesto')}
            className="self-start sm:self-auto text-xs text-ss-accent hover:text-ss-ink transition-colors underline underline-offset-4 decoration-ss-accent/30"
          >
            Read the manifesto
          </button>
        </div>
      </div>
    </footer>
  )
}
