export default function ImportFieldModal({ backup, fileSize, onConfirm, onClose }) {
  const sizeLabel = fileSize < 1024 * 1024
    ? `${Math.max(1, Math.round(fileSize / 1024))} KB`
    : `${(fileSize / 1024 / 1024).toFixed(1)} MB`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={event => event.target === event.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ss-border">
          <h2 className="font-sans font-semibold text-ss-ink text-sm">Import Field</h2>
          <button onClick={onClose} aria-label="Close import preview" className="text-ss-ghost hover:text-ss-ink text-lg leading-none">×</button>
        </div>

        <div className="p-5">
          <p className="text-xs text-ss-ghost uppercase tracking-widest mb-1.5">Field</p>
          <h3 className="font-sans font-bold text-lg text-ss-ink">{backup.field.title}</h3>
          {backup.field.description && (
            <p className="text-sm text-ss-dim mt-1 line-clamp-2">{backup.field.description}</p>
          )}

          <div className="grid grid-cols-3 gap-2 my-5">
            {[
              ['Signals', backup.cards.length],
              ['Sections', backup.sections.length],
              ['File size', sizeLabel],
            ].map(([label, value]) => (
              <div key={label} className="bg-ss-surface border border-ss-border rounded-lg px-3 py-2.5">
                <p className="font-mono text-2xs text-ss-ghost">{label}</p>
                <p className="font-sans font-semibold text-sm text-ss-ink mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-ss-dim leading-relaxed mb-5">
            This creates a new local field. Existing fields are not overwritten.
          </p>

          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border border-ss-border text-ss-dim text-sm font-semibold rounded-lg hover:border-ss-muted hover:text-ss-ink transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors"
            >
              Import as new
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

