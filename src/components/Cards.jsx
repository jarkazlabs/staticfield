// Cards.jsx — Alle 7 Card-Typen, helles Theme
import { useState } from 'react'

// ─── Gemeinsame Bausteine ─────────────────────────────────

function TypeLabel({ type }) {
  const map = {
    image: { label: 'Image',  color: 'text-ss-ghost' },
    audio: { label: 'Audio',  color: 'text-ss-accent' },
    video: { label: 'Video',  color: 'text-ss-dim' },
    link:  { label: 'Link',   color: 'text-ss-ghost' },
    note:  { label: 'Note',   color: 'text-ss-ghost' },
    gear:  { label: 'Gear',   color: 'text-ss-dim' },
    chain: { label: 'Chain',  color: 'text-ss-accent' },
  }
  const { label, color } = map[type] || map.note
  return (
    <span className={`font-mono text-2xs tracking-widest uppercase ${color}`}>
      {label}
    </span>
  )
}

function TagRow({ tags }) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {tags.map(t => (
        <span key={t} className="font-mono text-2xs text-ss-ghost border border-ss-border px-1.5 py-0.5 rounded-sm bg-ss-surface">
          {t}
        </span>
      ))}
    </div>
  )
}

function SourceLine({ source }) {
  if (!source) return null
  return <p className="font-mono text-2xs text-ss-ghost/70 mt-1.5 truncate">↗ {source}</p>
}

function CardShell({ children, className = '' }) {
  return (
    <div className={`bg-white border border-ss-border rounded card-hover overflow-hidden flex flex-col ${className}`}>
      {children}
    </div>
  )
}

// ─── 1. ImageCard ─────────────────────────────────────────
export function ImageCard({ card }) {
  return (
    <CardShell>
      <div className="w-full aspect-[4/3] bg-ss-surface overflow-hidden">
        {card.imageUrl
          ? <img src={card.imageUrl} alt={card.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          : <div className="w-full h-full flex items-center justify-center text-ss-ghost text-xs font-mono">[ image ]</div>
        }
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif text-base text-ss-ink leading-tight">{card.title}</h3>
          <TypeLabel type="image" />
        </div>
        {card.description && <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>}
        <TagRow tags={card.tags} />
        <SourceLine source={card.source} />
      </div>
    </CardShell>
  )
}

// ─── 2. AudioCard ─────────────────────────────────────────
export function AudioCard({ card }) {
  const [playing, setPlaying] = useState(false)
  const bars = [3,6,9,5,12,8,4,11,7,5,9,6,10,4,8]
  return (
    <CardShell>
      {/* Waveform-Bereich */}
      <div
        className="w-full h-14 bg-ss-surface flex items-center justify-center gap-0.5 cursor-pointer hover:bg-ss-accentBg transition-colors duration-200"
        onClick={() => setPlaying(p => !p)}
      >
        {bars.map((h, i) => (
          <span key={i} className="wbar" style={{
            height: `${h * 2.5}px`,
            animationName: playing ? 'wavePulse' : 'none',
            animationDuration: '1.4s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: `${i * 0.08}s`,
            opacity: playing ? undefined : 0.35,
          }} />
        ))}
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif text-base text-ss-ink leading-tight">{card.title}</h3>
          <TypeLabel type="audio" />
        </div>
        <span className="font-mono text-2xs text-ss-accent">{playing ? '▶ playing' : '▷ tap to play'}</span>
        {card.description && <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>}
        {card.gear?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {card.gear.map(g => (
              <span key={g} className="font-mono text-2xs text-ss-accent border border-ss-accentBg bg-ss-accentBg px-1.5 py-0.5 rounded-sm">{g}</span>
            ))}
          </div>
        )}
        <TagRow tags={card.tags} />
        <SourceLine source={card.source} />
      </div>
    </CardShell>
  )
}

// ─── 3. VideoCard ─────────────────────────────────────────
export function VideoCard({ card }) {
  return (
    <CardShell>
      <div className="w-full aspect-video bg-ss-surface flex flex-col items-center justify-center gap-2">
        <div className="w-9 h-9 rounded-full bg-white border border-ss-border flex items-center justify-center shadow-sm">
          <span className="text-ss-dim text-sm ml-0.5">▶</span>
        </div>
        <span className="font-mono text-2xs text-ss-ghost">video placeholder</span>
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif text-base text-ss-ink leading-tight">{card.title}</h3>
          <TypeLabel type="video" />
        </div>
        {card.description && <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>}
        <TagRow tags={card.tags} />
        <SourceLine source={card.source} />
      </div>
    </CardShell>
  )
}

// ─── 4. LinkCard ─────────────────────────────────────────
export function LinkCard({ card }) {
  return (
    <CardShell>
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif text-base text-ss-ink leading-tight">{card.title}</h3>
          <TypeLabel type="link" />
        </div>
        {card.description && <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>}
        {card.url && (
          <a href={card.url} target="_blank" rel="noopener noreferrer"
            className="font-mono text-2xs text-ss-accent hover:underline truncate mt-1">
            ↗ {card.url.replace('https://', '')}
          </a>
        )}
        <TagRow tags={card.tags} />
        <SourceLine source={card.source} />
      </div>
    </CardShell>
  )
}

// ─── 5. NoteCard ─────────────────────────────────────────
export function NoteCard({ card }) {
  return (
    <CardShell className="border-l-2 border-l-ss-muted">
      <div className="p-4 flex flex-col gap-2">
        <TypeLabel type="note" />
        <h3 className="font-serif text-xl text-ss-ink leading-snug italic mt-1">
          &ldquo;{card.title}&rdquo;
        </h3>
        {card.description && <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>}
        <TagRow tags={card.tags} />
      </div>
    </CardShell>
  )
}

// ─── 6. GearCard ─────────────────────────────────────────
export function GearCard({ card }) {
  return (
    <CardShell>
      <div className="p-3 flex flex-col gap-1.5">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="font-mono text-2xs text-ss-ghost uppercase tracking-widest mb-1">{card.manufacturer || 'Hardware'}</p>
            <h3 className="font-serif text-base text-ss-ink leading-tight">{card.title}</h3>
          </div>
          <TypeLabel type="gear" />
        </div>
        {card.description && <p className="text-xs text-ss-dim leading-relaxed mt-1">{card.description}</p>}
        {card.price && (
          <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-1 bg-ss-surface rounded-sm border border-ss-border w-fit">
            <span className="font-mono text-2xs text-ss-ghost">Est.</span>
            <span className="font-mono text-2xs text-ss-ink font-medium">{card.price}</span>
          </div>
        )}
        <TagRow tags={card.tags} />
        <SourceLine source={card.source} />
      </div>
    </CardShell>
  )
}

// ─── 7. SignalChainCard ───────────────────────────────────
export function SignalChainCard({ card }) {
  return (
    <CardShell>
      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-serif text-base text-ss-ink leading-tight">{card.title}</h3>
          <TypeLabel type="chain" />
        </div>
        {card.chain && (
          <div className="flex items-center flex-wrap gap-1.5 p-2.5 bg-ss-surface rounded border border-ss-border my-1">
            {card.chain.map((item, i) => (
              <span key={i} className={
                item === '→'
                  ? 'text-ss-ghost font-mono text-xs'
                  : 'font-mono text-2xs text-ss-ink bg-white border border-ss-border px-2 py-1 rounded-sm'
              }>{item}</span>
            ))}
          </div>
        )}
        {card.description && <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>}
        <TagRow tags={card.tags} />
      </div>
    </CardShell>
  )
}

// ─── Dispatcher ───────────────────────────────────────────
export default function Card({ card }) {
  switch (card.type) {
    case 'image': return <ImageCard  card={card} />
    case 'audio': return <AudioCard  card={card} />
    case 'video': return <VideoCard  card={card} />
    case 'link':  return <LinkCard   card={card} />
    case 'note':  return <NoteCard   card={card} />
    case 'gear':  return <GearCard   card={card} />
    case 'chain': return <SignalChainCard card={card} />
    default:      return <NoteCard   card={card} />
  }
}
