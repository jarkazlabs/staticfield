// HeroPreview.jsx — Animierter Board-Vorschau-Screen im Hero
// Zeigt die Boards als schwebende Collage-Karten, leicht animiert

import { useState, useEffect } from 'react'
import { boardCollages } from '../data/discovery.js'
import { DEMO_BOARDS } from '../data/signals.js'

function pseudoRandom(seed, i) {
  const x = Math.sin(seed * 9301 + i * 49297 + 233) * 10000
  return x - Math.floor(x)
}
function getBoardSeed(id) {
  return id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
}

// Mini-Collage für einen einzelnen Board im Hero
function MiniBoard({ board, style }) {
  const collage = boardCollages[board.id]
  const seed = getBoardSeed(board.id)

  const placements = [
    { top: '6%',  left: '4%',  w: '58%', rot: pseudoRandom(seed, 0) * 4 - 2 },
    { top: '22%', left: '38%', w: '52%', rot: pseudoRandom(seed, 1) * 5 - 2.5 },
    { top: '52%', left: '8%',  w: '44%', rot: pseudoRandom(seed, 2) * 4 - 2 },
  ]

  return (
    <div
      className="absolute rounded-2xl overflow-hidden border border-ss-border shadow-xl"
      style={{
        background: 'linear-gradient(135deg, #f5f2ed, #ece8e2)',
        ...style,
      }}
    >
      {/* Gitter */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Bilder */}
      {collage?.images.slice(0, 3).map((url, i) => (
        <div key={i} className="absolute overflow-hidden rounded-lg shadow-md"
          style={{
            top:    placements[i].top,
            left:   placements[i].left,
            width:  placements[i].w,
            aspectRatio: i === 0 ? '4/3' : '3/2',
            transform: `rotate(${placements[i].rot}deg)`,
            zIndex: i + 1,
          }}>
          <img src={url} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Note-Fragment */}
      {collage?.notes?.[0] && (
        <div className="absolute z-10 bg-white/90 rounded px-2 py-1 shadow-sm"
          style={{ bottom: '12%', right: '6%', transform: `rotate(${pseudoRandom(seed, 3) * 6 - 3}deg)` }}>
          <p className="font-mono text-2xs text-ss-dim">{collage.notes[0]}</p>
        </div>
      )}

      {/* Board-Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-20"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}>
        <p className="font-sans text-white text-xs font-semibold">{board.title}</p>
      </div>
    </div>
  )
}

export default function HeroPreview() {
  const [tick, setTick] = useState(0)
  const boards = DEMO_BOARDS.slice(0, 3)

  // Subtile Animations-Ticks — ganz langsam
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000)
    return () => clearInterval(id)
  }, [])

  // Float-Werte per Tick leicht variieren
  const floats = boards.map((_, i) => ({
    y: Math.sin((tick + i * 1.7) * 0.4) * 5,
    rot: Math.sin((tick + i * 2.3) * 0.3) * 0.6,
  }))

  return (
    <div className="relative w-full mx-auto select-none" style={{ maxWidth: 760, height: 320 }}>

      {/* Board 1 — links, leicht nach hinten */}
      <MiniBoard
        board={boards[0]}
        style={{
          width: 260, height: 200,
          left: '2%', top: '12%',
          transform: `translateY(${floats[0].y}px) rotate(${-2.5 + floats[0].rot}deg)`,
          transition: 'transform 3s ease-in-out',
          zIndex: 1,
          opacity: 0.92,
        }}
      />

      {/* Board 2 — Mitte, vorne */}
      <MiniBoard
        board={boards[1]}
        style={{
          width: 280, height: 220,
          left: '50%', top: '4%',
          transform: `translateX(-50%) translateY(${floats[1].y}px) rotate(${1.2 + floats[1].rot}deg)`,
          transition: 'transform 3s ease-in-out',
          zIndex: 3,
        }}
      />

      {/* Board 3 — rechts */}
      <MiniBoard
        board={boards[2]}
        style={{
          width: 245, height: 195,
          right: '2%', top: '18%',
          transform: `translateY(${floats[2].y}px) rotate(${3 + floats[2].rot}deg)`,
          transition: 'transform 3s ease-in-out',
          zIndex: 2,
          opacity: 0.95,
        }}
      />

      {/* Weicher Fade nach unten */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
    </div>
  )
}
