// DiscoveryFeed.jsx — Kuratierter Discovery-Feed
// Sektionen mit Mixed Card Sizes, Audio-Previews, Editorial-Feeling

import { useState } from 'react'
import { discoverySections, discoveryCards } from '../data/discovery.js'
import AudioPreview from './AudioPreview.jsx'

// ─── Discovery Card Varianten ────────────────────────────

function DiscoveryImageCard({ card, size }) {
  const [hovered, setHovered] = useState(false)

  const heightMap = { large: 'h-64', medium: 'h-44', small: 'h-36' }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-ss-surface border border-ss-border cursor-pointer
        transition-all duration-300 ${hovered ? 'shadow-lg -translate-y-0.5' : 'shadow-sm'}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Bild */}
      <div className={`w-full ${heightMap[size] || 'h-44'} overflow-hidden`}>
        <img
          src={card.imageUrl}
          alt={card.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
        />
      </div>

      {/* Audio Preview Overlay */}
      {card.hasAudio && (
        <div className="absolute top-2.5 left-2.5 z-10" onClick={e => e.stopPropagation()}>
          <AudioPreview audioType={card.audioType} compact />
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        <h4 className="font-sans font-semibold text-sm text-ss-ink leading-tight">{card.title}</h4>
        {size !== 'small' && card.description && (
          <p className="text-xs text-ss-dim mt-1 leading-relaxed line-clamp-2">{card.description}</p>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {card.tags.slice(0, 2).map(t => (
            <span key={t} className="font-mono text-2xs text-ss-ghost">#{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function DiscoveryNoteCard({ card }) {
  return (
    <div className="group relative rounded-xl bg-white border border-ss-border p-4 cursor-pointer
      transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border-l-2 border-l-ss-muted">
      <p className="font-sans font-semibold text-sm text-ss-ink leading-snug mb-2">{card.title}</p>
      {card.description && (
        <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>
      )}
      <div className="flex flex-wrap gap-1 mt-3">
        {card.tags.slice(0, 2).map(t => (
          <span key={t} className="font-mono text-2xs text-ss-ghost">#{t}</span>
        ))}
      </div>
    </div>
  )
}

function DiscoveryCard({ card }) {
  if (card.type === 'note') return <DiscoveryNoteCard card={card} />
  if (card.imageUrl)        return <DiscoveryImageCard card={card} size={card.size} />
  return <DiscoveryNoteCard card={card} />
}

// ─── Section ─────────────────────────────────────────────

function DiscoverySection({ section, cards }) {
  if (!cards.length) return null

  // Layout: Large card links + rest in Grid rechts
  const [large, ...rest] = cards

  return (
    <section className="py-12 border-t border-ss-border">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-7">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
            <span className="font-sans text-2xs text-ss-ghost tracking-widest uppercase">{section.label}</span>
          </div>
          {section.description && (
            <p className="text-xs text-ss-dim max-w-xs">{section.description}</p>
          )}
        </div>
        <button className="text-xs text-ss-ghost hover:text-ss-dim transition-colors font-mono">
          see all →
        </button>
      </div>

      {/* Mixed Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Large card */}
        {large && (
          <div className={large.size === 'large' ? 'lg:col-span-1' : ''}>
            <DiscoveryCard card={large} />
          </div>
        )}
        {/* Rest */}
        {rest.map(card => (
          <div key={card.id}>
            <DiscoveryCard card={card} />
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────

export default function DiscoveryFeed() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {discoverySections.map(section => {
        const cards = discoveryCards.filter(c => c.section === section.id)
        return (
          <DiscoverySection
            key={section.id}
            section={section}
            cards={cards}
          />
        )
      })}
    </div>
  )
}
