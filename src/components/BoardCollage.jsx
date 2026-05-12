// BoardCollage.jsx — Collage-artige Board-Vorschau
// Demo-Boards: Collage aus boardCollages-Daten
// Eigene Boards: Collage aus den tatsächlich gespeicherten Image-Cards

import { useState } from 'react'
import AudioPreview from './AudioPreview.jsx'
import { boardCollages } from '../data/discovery.js'

function pseudoRandom(seed, i) {
  const x = Math.sin(seed * 9301 + i * 49297 + 233) * 10000
  return x - Math.floor(x)
}
function getBoardSeed(id) {
  return id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
}

// Platzierungen für bis zu 3 Bilder
function getPlacements(seed) {
  return [
    { top: '8%',  left: '6%',  w: '55%', rot: pseudoRandom(seed, 0) * 4 - 2 },
    { top: '18%', left: '44%', w: '48%', rot: pseudoRandom(seed, 1) * 6 - 3 },
    { top: '54%', left: '12%', w: '38%', rot: pseudoRandom(seed, 2) * 5 - 2.5 },
  ]
}
function getNotePlacements(seed) {
  return [
    { bottom: '14%', right: '8%',  rot: pseudoRandom(seed, 3) * 6 - 3 },
    { top:    '8%',  left:  '42%', rot: pseudoRandom(seed, 4) * 4 - 2 },
  ]
}

export default function BoardCollage({ board, boardCards = [], onClick, onDelete }) {
  const [hovered, setHovered] = useState(false)
  const collage = boardCollages[board.id]
  const seed = getBoardSeed(board.id)
  const placements = getPlacements(seed)
  const notePlacements = getNotePlacements(seed)

  // Für eigene Boards: Bilder aus tatsächlichen Cards bauen
  const userImages = boardCards
    .filter(c => c.type === 'image' && c.imageUrl)
    .slice(0, 3)
    .map(c => c.imageUrl)

  const userNotes = boardCards
    .filter(c => c.type === 'note' && c.title)
    .slice(0, 2)
    .map(c => c.title.slice(0, 20))

  // Entscheiden: Demo-Collage oder User-Collage
  const images = collage ? collage.images : userImages
  const notes  = collage ? collage.notes  : userNotes
  const hasAudio  = collage?.hasAudio || false
  const audioType = collage?.audioType || 'ambient'
  const hasContent = images.length > 0

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Collage-Fläche */}
      <div className={`
        relative w-full overflow-hidden rounded-xl bg-[#f0ede8]
        border border-ss-border
        transition-all duration-300
        ${hovered ? 'shadow-xl' : 'shadow-sm'}
      `}
        style={{ height: 220 }}
      >
        {/* Hintergrundton */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f2ed] to-[#ece8e2]" />

        {/* Leichtes Gitter */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {hasContent ? (
          <>
            {/* Overlappende Bilder */}
            {images.map((url, i) => (
              <div key={i} className="absolute overflow-hidden rounded shadow-md"
                style={{
                  top: placements[i]?.top, left: placements[i]?.left, width: placements[i]?.w,
                  aspectRatio: i === 0 ? '4/3' : '3/2',
                  transform: hovered
                    ? `rotate(${placements[i]?.rot * 0.4}deg) scale(1.02)`
                    : `rotate(${placements[i]?.rot}deg)`,
                  zIndex: i + 1,
                  transition: 'transform 0.4s ease',
                }}>
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            {/* Text-Fragmente */}
            {notes?.map((note, i) => (
              <div key={i} className="absolute bg-white/90 rounded px-2 py-1 shadow-sm"
                style={{ ...notePlacements[i], transform: `rotate(${notePlacements[i]?.rot}deg)`, zIndex: 10, maxWidth: 90 }}>
                <p className="font-mono text-2xs text-ss-dim leading-tight">{note}</p>
              </div>
            ))}
            {/* Audio */}
            {hasAudio && (
              <div className="absolute top-2.5 left-2.5 z-20" onClick={e => e.stopPropagation()}>
                <AudioPreview audioType={audioType} compact />
              </div>
            )}
          </>
        ) : (
          /* Fallback: leeres Board — Schachbrett-Muster + Hinweis */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-ss-ghost/40 text-4xl">◻</span>
            <span className="font-mono text-2xs text-ss-ghost/40">empty board</span>
          </div>
        )}

        {/* Hover-Overlay */}
        <div className={`
          absolute inset-0 bg-ss-ink/0 transition-all duration-300 z-30
          flex items-center justify-center
          ${hovered ? 'bg-ss-ink/10' : ''}
        `}>
          {hovered && (
            <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg transform translate-y-0 transition-transform">
              <span className="text-xs font-semibold text-ss-ink">Open board →</span>
            </div>
          )}
        </div>

        {/* Demo Badge */}
        {board.isDemo && (
          <div className="absolute bottom-2.5 right-2.5 z-20 bg-white/80 rounded px-1.5 py-0.5">
            <span className="font-mono text-2xs text-ss-ghost">Demo</span>
          </div>
        )}
      </div>

      {/* Board Info */}
      <div className="mt-3 flex flex-col gap-0.5">
        <div className="flex flex-wrap gap-1 mb-0.5">
          {board.tags.slice(0, 2).map(t => (
            <span key={t} className="font-mono text-2xs text-ss-ghost">#{t}</span>
          ))}
        </div>
        <h3 className={`font-sans font-semibold text-base text-ss-ink leading-tight transition-colors duration-200 ${hovered ? 'text-ss-accent' : ''}`}>
          {board.title}
        </h3>
        <p className="text-xs text-ss-dim line-clamp-1 mt-0.5">{board.description}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-ss-ghost">by {board.author}</span>
          {!board.isDemo && onDelete && (
            <button
              onClick={e => { e.stopPropagation(); onDelete(board.id) }}
              className="text-2xs text-ss-ghost/50 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
