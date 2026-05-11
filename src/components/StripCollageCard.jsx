// StripCollageCard.jsx — Kompakte Hochformat-Collage für den Curated Signals Strip
// Gleiche Collage-Logik wie BoardCollage, aber hochformat + nur Overlay-Text

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

export default function StripCollageCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false)
  const collage = boardCollages[item.id]
  const seed = getBoardSeed(item.id)

  // Hochformat-Platzierungen — anders als BoardCollage
  const placements = [
    { top: '6%',  left: '5%',  w: '72%', rot: pseudoRandom(seed, 0) * 4 - 2 },
    { top: '28%', left: '22%', w: '68%', rot: pseudoRandom(seed, 1) * 5 - 2.5 },
    { top: '52%', left: '8%',  w: '55%', rot: pseudoRandom(seed, 2) * 4 - 2 },
  ]

  const notePlacement = { bottom: '12%', right: '6%', rot: pseudoRandom(seed, 3) * 6 - 3 }

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 group"
      style={{ width: 180 }}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    >
      {/* Hochformat-Collage */}
      <div
        className={`
          relative w-full overflow-hidden rounded-xl
          border border-ss-border
          transition-all duration-300
          ${hovered ? 'shadow-xl' : 'shadow-sm'}
        `}
        style={{ height: 240 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hintergrund */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f2ed] to-[#ece8e2]" />

        {/* Gitter */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {collage ? (
          <>
            {/* Überlagerte Bilder */}
            {collage.images.slice(0, 3).map((url, i) => (
              <div
                key={i}
                className="absolute overflow-hidden rounded shadow-md"
                style={{
                  top:       placements[i]?.top,
                  left:      placements[i]?.left,
                  width:     placements[i]?.w,
                  aspectRatio: '4/3',
                  transform: hovered
                    ? `rotate(${placements[i]?.rot * 0.3}deg) scale(1.03)`
                    : `rotate(${placements[i]?.rot}deg)`,
                  zIndex: i + 1,
                  transition: 'transform 0.4s ease',
                }}
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}

            {/* Notiz-Fragment */}
            {collage.notes?.[0] && (
              <div
                className="absolute bg-white/90 rounded px-1.5 py-0.5 shadow-sm z-10"
                style={{
                  ...notePlacement,
                  transform: `rotate(${notePlacement.rot}deg)`,
                }}
              >
                <p className="font-mono text-2xs text-ss-dim">{collage.notes[0]}</p>
              </div>
            )}

            {/* Audio */}
            {collage.hasAudio && (
              <div className="absolute top-2 left-2 z-20" onClick={e => e.stopPropagation()}>
                <AudioPreview audioType={collage.audioType} compact />
              </div>
            )}
          </>
        ) : (
          // Fallback: Einzelbild
          item.imageUrl && (
            <img src={item.imageUrl} alt={item.label}
              className="absolute inset-0 w-full h-full object-cover opacity-80" />
          )
        )}

        {/* Gradient + Label-Overlay — immer sichtbar */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-20" />
        <div className="absolute bottom-0 left-0 right-0 p-3 z-30">
          <p className="font-sans text-white text-sm font-semibold leading-tight">{item.label}</p>
          <p className="font-mono text-white/60 text-2xs mt-0.5">{item.count} items</p>
        </div>

        {/* Hover-Schimmer */}
        <div className={`absolute inset-0 z-20 transition-all duration-300 ${hovered ? 'bg-white/8' : 'bg-transparent'}`} />
      </div>
    </button>
  )
}
