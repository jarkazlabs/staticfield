// Explore.jsx — Discovery Feed, helles Theme
import { useState, useMemo } from 'react'
import { DEMO_CARDS as allCards } from '../data/signals.js'
import Card from '../components/Cards.jsx'

export default function Explore() {
  const [activeTag, setActiveTag] = useState('all')

  const allTags = useMemo(() => {
    const set = new Set()
    allCards.forEach(c => c.tags?.forEach(t => set.add(t)))
    return ['all', ...Array.from(set).sort()]
  }, [])

  const filtered = useMemo(() => {
    if (activeTag === 'all') return allCards
    return allCards.filter(c => c.tags?.includes(activeTag))
  }, [activeTag])

  return (
    <div className="min-h-screen pt-11 bg-ss-bg">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="pt-14 pb-10 border-b border-ss-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
            <span className="font-mono text-2xs text-ss-ghost tracking-widest uppercase">Discovery</span>
          </div>
          <h1 className="font-sans text-5xl text-ss-ink" style={{ fontWeight: 600 }}>
            Explore Signals
          </h1>
          <p className="text-sm text-ss-dim mt-2 max-w-md">
            Curated signals from all boards — images, sounds, gear, notes and connections.
          </p>
        </div>

        {/* Tag-Filter */}
        <div className="flex flex-wrap gap-2 py-5 border-b border-ss-border">
          {allTags.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className={`
                font-mono text-2xs px-3 py-1.5 rounded border transition-all duration-200
                ${activeTag === tag
                  ? 'border-ss-ink bg-ss-ink text-white'
                  : 'border-ss-border text-ss-ghost hover:border-ss-muted hover:text-ss-dim bg-white'
                }
              `}
            >
              {tag === 'all' ? '○ all' : `#${tag}`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-8 pb-20">
          {filtered.map((card, i) => (
            <div key={card.id}
              className="animate-slide-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}
            >
              <Card card={card} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-mono text-xs text-ss-ghost">no signals for this tag</p>
          </div>
        )}
      </div>
    </div>
  )
}
