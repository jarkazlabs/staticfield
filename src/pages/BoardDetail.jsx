// BoardDetail.jsx — Canvas-Ansicht, helles Theme
import { useMemo, useRef, useState, useEffect } from 'react'
import { boards, getCardsByBoard, getConnectionsByBoard } from '../data/signals.js'
import Card from '../components/Cards.jsx'

const CARD_W = 260

export default function BoardDetail({ boardId, setPage }) {
  const board = boards.find(b => b.id === boardId)
  const cards = useMemo(() => getCardsByBoard(boardId), [boardId])
  const conns  = useMemo(() => getConnectionsByBoard(boardId), [boardId])

  const canvasW = Math.max(1200, ...cards.map(c => c.position.x + CARD_W + 120))
  const canvasH = Math.max(900,  ...cards.map(c => c.position.y + 420))

  if (!board) return (
    <div className="min-h-screen flex items-center justify-center text-ss-dim text-sm">
      Board not found.
    </div>
  )

  function center(card) {
    return { x: card.position.x + CARD_W / 2, y: card.position.y + 80 }
  }

  return (
    <div className="min-h-screen bg-ss-bg pt-11 flex flex-col">

      {/* Header */}
      <div className="px-6 py-8 border-b border-ss-border bg-ss-bg">
        <button onClick={() => setPage('boards')}
          className="text-xs text-ss-ghost hover:text-ss-dim transition-colors mb-4 flex items-center gap-1.5 font-mono">
          ← Boards
        </button>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
          <span className="font-mono text-2xs text-ss-ghost tracking-widest uppercase">Board</span>
        </div>
        <h1 className="font-serif text-3xl text-ss-ink" style={{ fontWeight: 600 }}>{board.title}</h1>
        <p className="text-sm text-ss-dim mt-1 max-w-md">{board.description}</p>
        <div className="flex gap-2 mt-2">
          {board.tags.map(t => (
            <span key={t} className="font-mono text-2xs text-ss-ghost">#{t}</span>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto bg-ss-surface/40">
        <div className="relative" style={{ width: canvasW, height: canvasH }}>

          {/* SVG Verbindungslinien */}
          <svg className="absolute inset-0 pointer-events-none" width={canvasW} height={canvasH} style={{ zIndex: 0 }}>
            {conns.map((cn, i) => {
              const from = cards.find(c => c.id === cn.from)
              const to   = cards.find(c => c.id === cn.to)
              if (!from || !to) return null
              const f = center(from), t2 = center(to)
              const mx = (f.x + t2.x) / 2
              return (
                <path key={i}
                  d={`M${f.x},${f.y} C${mx},${f.y} ${mx},${t2.y} ${t2.x},${t2.y}`}
                  className="conn-line"
                />
              )
            })}
          </svg>

          {/* Cards */}
          {cards.map((card, i) => (
            <div key={card.id} className="absolute animate-fade-in opacity-0"
              style={{
                left: card.position.x, top: card.position.y,
                width: CARD_W, zIndex: 1,
                animationFillMode: 'forwards',
                animationDelay: `${i * 0.08}s`,
              }}
            >
              <Card card={card} />
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}
