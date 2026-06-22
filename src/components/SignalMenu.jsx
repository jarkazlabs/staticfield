const SIGNAL_TYPES = [
  { id: 'note', label: 'Note Signal', hint: 'Text, thought, observation' },
  { id: 'link', label: 'Link Signal', hint: 'Reference, source, thread' },
  { id: 'image', label: 'Image Signal', hint: 'Photo, texture, visual cue' },
  { id: 'pattern', label: 'Pattern Signal', hint: 'Notes, rhythm, sketch' },
  { id: 'chain', label: 'Signal Chain', hint: 'Pedals, modules, flow' },
  { id: 'youtube', label: 'YouTube Signal', hint: 'Video reference' },
]

function defaultsFor(type) {
  if (type === 'note') return { title: 'Untitled note', description: '', tint: 'paper' }
  if (type === 'link') return { title: 'Link Signal', url: '', description: '' }
  if (type === 'image') return { title: 'Image Signal', description: '' }
  if (type === 'pattern') return { title: 'Pattern Signal', notes: '', bpm: '', scale: '', description: '' }
  if (type === 'chain') return { title: 'Signal Chain', chain: ['Source', '→', 'Space'], tint: 'sage' }
  if (type === 'youtube') return { title: 'YouTube Signal', url: '', description: '' }
  return { title: 'Signal' }
}

export default function SignalMenu({ align = 'left', onSelect }) {
  return (
    <div
      className={`absolute top-full mt-2 z-50 w-64 rounded-xl border border-ss-border bg-white/95 p-1.5 shadow-xl backdrop-blur-md ${
        align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
      }`}
    >
      {SIGNAL_TYPES.map(signal => (
        <button
          key={signal.id}
          type="button"
          onClick={() => onSelect(signal.id, defaultsFor(signal.id))}
          className="group w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-ss-surface"
        >
          <span className="flex items-center justify-between gap-4">
            <span>
              <span className="block text-sm font-semibold text-ss-ink">{signal.label}</span>
              <span className="mt-0.5 block text-2xs text-ss-ghost">{signal.hint}</span>
            </span>
            <span className="h-2 w-2 rounded-full border border-ss-muted transition-colors group-hover:border-ss-accent group-hover:bg-ss-accent" />
          </span>
        </button>
      ))}
    </div>
  )
}
