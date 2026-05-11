// BoardCanvas.jsx — Interaktiver Canvas
// - Cards verschieben via Drag & Drop
// - Verbindungen ziehen (Drag von Connect-Punkt)
// - Verbindungen löschen (Klick auf Linie)
// - Cards löschen

import { useRef, useState, useCallback } from 'react'
import AddCardModal from './AddCardModal.jsx'

const CARD_W = 240

// ─── Card-Rendering nach Typ ─────────────────────────────

function TypeBadge({ type }) {
  const labels = { note: 'Note', link: 'Link', image: 'Image', instagram: 'Instagram', chain: 'Chain' }
  return <span className="font-mono text-2xs text-ss-ghost tracking-widest uppercase">{labels[type] || type}</span>
}

function CardContent({ card }) {
  switch (card.type) {
    case 'image':
      return (
        <>
          {card.imageUrl && (
            <div className="w-full aspect-video bg-ss-surface overflow-hidden rounded-sm mb-2">
              <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
            </div>
          )}
          <p className="font-sans font-semibold text-sm text-ss-ink leading-tight">{card.title}</p>
          {card.description && <p className="text-xs text-ss-dim mt-1 leading-relaxed">{card.description}</p>}
        </>
      )
    case 'note':
      return (
        <>
          <p className="font-sans font-semibold text-sm text-ss-ink leading-snug">{card.title}</p>
          {card.description && <p className="text-xs text-ss-dim mt-1.5 leading-relaxed">{card.description}</p>}
        </>
      )
    case 'link':
      return (
        <>
          <p className="font-sans font-semibold text-sm text-ss-ink leading-tight">{card.title}</p>
          {card.description && <p className="text-xs text-ss-dim mt-1 leading-relaxed">{card.description}</p>}
          {card.url && (
            <a href={card.url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-2xs text-ss-accent hover:underline mt-1.5 block truncate">
              ↗ {card.url.replace('https://', '')}
            </a>
          )}
        </>
      )
    case 'instagram':
      return (
        <>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-base">📸</span>
            <span className="font-mono text-2xs text-ss-ghost">Instagram</span>
          </div>
          <p className="font-sans font-semibold text-sm text-ss-ink leading-tight">{card.title}</p>
          {card.url && (
            <a href={card.url} target="_blank" rel="noopener noreferrer"
              className="font-mono text-2xs text-ss-accent hover:underline mt-1.5 block truncate">
              ↗ {card.url.replace('https://www.instagram.com/', 'instagram.com/')}
            </a>
          )}
        </>
      )
    case 'chain':
      return (
        <>
          <p className="font-sans font-semibold text-sm text-ss-ink leading-tight mb-2">
            {card.title || 'Signal Chain'}
          </p>
          {card.chain && (
            <div className="flex items-center flex-wrap gap-1 p-2 bg-ss-surface rounded border border-ss-border">
              {card.chain.filter(Boolean).map((item, i) => (
                <span key={i} className={
                  item === '→'
                    ? 'text-ss-ghost text-xs font-mono'
                    : 'font-mono text-2xs text-ss-ink bg-white border border-ss-border px-1.5 py-0.5 rounded-sm'
                }>{item}</span>
              ))}
            </div>
          )}
          {card.description && <p className="text-xs text-ss-dim mt-1.5">{card.description}</p>}
        </>
      )
    default:
      return <p className="text-sm text-ss-ink">{card.title}</p>
  }
}

// ─── Einzelne Card auf dem Canvas ────────────────────────
function CanvasCard({ card, isConnecting, onDragStart, onConnectStart, onConnectEnd, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`absolute select-none ${isConnecting ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'}`}
      style={{ left: card.position.x, top: card.position.y, width: CARD_W, zIndex: hovered ? 10 : 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={e => {
        // Nicht starten wenn Connect-Punkt geklickt
        if (e.target.dataset.connect) return
        if (isConnecting) { onConnectEnd(card.id); return }
        onDragStart(e, card.id)
      }}
    >
      {/* Card selbst */}
      <div className={`
        bg-white border rounded-lg p-3 flex flex-col gap-1
        transition-shadow duration-200
        ${hovered ? 'shadow-lg border-ss-muted' : 'shadow-sm border-ss-border'}
      `}>
        <div className="flex justify-between items-start mb-1">
          <TypeBadge type={card.type} />
          {/* Delete-Button */}
          {hovered && (
            <button
              onMouseDown={e => { e.stopPropagation(); onDelete(card.id) }}
              className="text-ss-ghost hover:text-red-400 text-xs leading-none transition-colors ml-2"
              title="Löschen"
            >✕</button>
          )}
        </div>
        <CardContent card={card} />
      </div>

      {/* Connect-Punkt (erscheint bei Hover) */}
      {(hovered || isConnecting) && (
        <div
          data-connect="true"
          className={`
            absolute -right-2 top-1/2 -translate-y-1/2
            w-4 h-4 rounded-full border-2 border-white
            cursor-crosshair z-20 transition-colors
            ${isConnecting ? 'bg-ss-accent scale-125' : 'bg-ss-ink hover:bg-ss-accent'}
          `}
          style={{ boxShadow: '0 0 0 1px #e8e8e4' }}
          onMouseDown={e => { e.stopPropagation(); onConnectStart(card.id) }}
          title="Verbindung ziehen"
        />
      )}
    </div>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────
export default function BoardCanvas({ boardId, cards, connections, addCard, moveCard, deleteCard, addConnection, deleteConnection }) {
  const canvasRef       = useRef(null)
  const [dragging,      setDragging]      = useState(null)   // { cardId, offX, offY }
  const [connecting,    setConnecting]    = useState(null)   // cardId des Startpunkts
  const [connectLine,   setConnectLine]   = useState(null)   // { x1,y1,x2,y2 } während des Ziehens
  const [showAddModal,  setShowAddModal]  = useState(false)

  const CANVAS_W = Math.max(1400, ...cards.map(c => c.position.x + CARD_W + 120))
  const CANVAS_H = Math.max(900,  ...cards.map(c => c.position.y + 400))

  // Kartenposition aus ID
  const cardCenter = useCallback((cardId) => {
    const c = cards.find(c => c.id === cardId)
    if (!c) return { x: 0, y: 0 }
    return { x: c.position.x + CARD_W, y: c.position.y + 60 }
  }, [cards])

  // ─── Mouse Events ──────────────────────────────────────
  function handleDragStart(e, cardId) {
    e.preventDefault()
    const rect = canvasRef.current.getBoundingClientRect()
    const card = cards.find(c => c.id === cardId)
    setDragging({
      cardId,
      offX: e.clientX - rect.left - card.position.x,
      offY: e.clientY - rect.top  - card.position.y,
    })
  }

  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    if (dragging) {
      moveCard(dragging.cardId,
        Math.max(0, mx - dragging.offX),
        Math.max(0, my - dragging.offY)
      )
    }

    if (connecting) {
      const from = cardCenter(connecting)
      setConnectLine({ x1: from.x, y1: from.y, x2: mx, y2: my })
    }
  }

  function handleMouseUp() {
    setDragging(null)
    if (connecting) {
      setConnecting(null)
      setConnectLine(null)
    }
  }

  function handleConnectStart(cardId) {
    setConnecting(cardId)
    const from = cardCenter(cardId)
    setConnectLine({ x1: from.x, y1: from.y, x2: from.x, y2: from.y })
  }

  function handleConnectEnd(targetId) {
    if (connecting && connecting !== targetId) {
      addConnection(connecting, targetId)
    }
    setConnecting(null)
    setConnectLine(null)
  }

  function handleAddCard(type, data) {
    addCard(boardId, type, data)
  }

  return (
    <div className="flex-1 overflow-auto bg-ss-surface/30 relative">

      {/* Toolbar */}
      <div className="sticky top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-b border-ss-border px-5 py-2.5 flex items-center gap-3">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-ss-ink text-white text-xs font-semibold rounded-lg hover:bg-ss-dim transition-colors"
        >
          + Signal hinzufügen
        </button>
        {connecting && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-ss-accentBg border border-ss-accent/30 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-ss-accent animate-pulse" />
            <span className="text-xs text-ss-accent font-medium">Verbindung ziehen — auf Ziel-Card klicken</span>
            <button onClick={() => { setConnecting(null); setConnectLine(null) }}
              className="text-ss-accent/60 hover:text-ss-accent ml-1 text-xs">Abbrechen</button>
          </div>
        )}
        <span className="ml-auto text-xs text-ss-ghost">{cards.length} Signals</span>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative"
        style={{ width: CANVAS_W, height: CANVAS_H, cursor: connecting ? 'crosshair' : 'default' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* SVG: Verbindungslinien + Live-Linie */}
        <svg className="absolute inset-0 pointer-events-none" width={CANVAS_W} height={CANVAS_H} style={{ zIndex: 1 }}>
          {/* Bestehende Verbindungen */}
          {connections.map(cn => {
            const f = cardCenter(cn.from)
            const t = cardCenter(cn.to)
            const mx = (f.x + t.x) / 2
            return (
              <g key={cn.id}>
                {/* Unsichtbare dicke Linie für einfacheres Klicken */}
                <path
                  d={`M${f.x},${f.y} C${mx},${f.y} ${mx},${t.y} ${t.x},${t.y}`}
                  stroke="transparent" strokeWidth="12" fill="none"
                  style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
                  onClick={() => deleteConnection(cn.id)}
                />
                {/* Sichtbare Linie */}
                <path
                  d={`M${f.x},${f.y} C${mx},${f.y} ${mx},${t.y} ${t.x},${t.y}`}
                  stroke="#d4d4ce" strokeWidth="1.5" fill="none"
                  strokeDasharray="4 5"
                  style={{ pointerEvents: 'none' }}
                />
                {/* Endpunkt */}
                <circle cx={t.x} cy={t.y} r="3" fill="#d4d4ce" style={{ pointerEvents: 'none' }} />
              </g>
            )
          })}

          {/* Live-Verbindungslinie während des Ziehens */}
          {connectLine && (
            <line
              x1={connectLine.x1} y1={connectLine.y1}
              x2={connectLine.x2} y2={connectLine.y2}
              stroke="#7a8c3c" strokeWidth="1.5" strokeDasharray="4 4"
            />
          )}
        </svg>

        {/* Cards */}
        {cards.map(card => (
          <CanvasCard
            key={card.id}
            card={card}
            isConnecting={!!connecting}
            onDragStart={handleDragStart}
            onConnectStart={handleConnectStart}
            onConnectEnd={handleConnectEnd}
            onDelete={deleteCard}
          />
        ))}

        {/* Leerer Canvas Hinweis */}
        {cards.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-ss-ghost text-sm">Noch keine Signals auf diesem Board.</p>
            <button onClick={() => setShowAddModal(true)}
              className="px-4 py-2 border border-ss-border rounded-lg text-sm text-ss-dim hover:border-ss-muted hover:text-ss-ink transition-all">
              + Ersten Signal hinzufügen
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showAddModal && (
        <AddCardModal onAdd={handleAddCard} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  )
}
