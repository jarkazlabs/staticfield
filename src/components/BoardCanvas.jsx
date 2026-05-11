// BoardCanvas.jsx — Interaktiver Canvas
// Fix: Connect via globalen mouseup auf Canvas statt Card-Event
// Neu: Edit-Button, dynamische Chain

import { useRef, useState, useCallback, useEffect } from 'react'
import AddCardModal from './AddCardModal.jsx'
import EditCardModal from './EditCardModal.jsx'
import { CARD_TINTS } from '../data/tints.js'

function getTintStyle(card) {
  if (!card.tint || card.tint === 'none') return {}
  const t = CARD_TINTS.find(t => t.id === card.tint)
  if (!t) return {}
  return { backgroundColor: t.bg, borderColor: t.border }
}

const CARD_W = 250

// ─── Card-Inhalt ─────────────────────────────────────────

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
              onClick={e => e.stopPropagation()}
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
              onClick={e => e.stopPropagation()}
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
              {card.chain.filter(item => item && item !== '→').map((item, i, arr) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="font-mono text-2xs text-ss-ink bg-white border border-ss-border px-1.5 py-0.5 rounded-sm">
                    {item}
                  </span>
                  {i < arr.length - 1 && <span className="text-ss-ghost text-xs font-mono">→</span>}
                </span>
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

// ─── Canvas Card ─────────────────────────────────────────

function CanvasCard({ card, connectingFrom, onDragStart, onConnectDotDown, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false)
  const isTarget = connectingFrom && connectingFrom !== card.id

  return (
    <div
      className={`absolute select-none`}
      style={{
        left: card.position.x,
        top: card.position.y,
        width: CARD_W,
        zIndex: hovered ? 10 : 2,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={e => {
        // Nicht draggen wenn connect-dot oder button
        if (e.target.closest('[data-action]')) return
        if (connectingFrom) return // im Connect-Modus kein Drag
        onDragStart(e, card.id)
      }}
    >
      {/* Card */}
      <div
        className={`
          border rounded-lg p-3 flex flex-col gap-1
          transition-all duration-200
          ${connectingFrom && connectingFrom !== card.id
            ? 'border-ss-accent shadow-md cursor-crosshair ring-2 ring-ss-accent/20'
            : hovered ? 'shadow-lg cursor-grab' : 'shadow-sm cursor-grab'
          }
        `}
        style={getTintStyle(card)}
      >
        {/* Card Header */}
        <div className="flex justify-between items-start mb-1">
          <TypeBadge type={card.type} />
          {hovered && !connectingFrom && (
            <div className="flex items-center gap-1.5" data-action="buttons">
              {/* Edit */}
              <button
                data-action="edit"
                onMouseDown={e => { e.stopPropagation(); onEdit(card) }}
                className="text-ss-ghost hover:text-ss-ink text-xs transition-colors"
                title="Bearbeiten"
              >✏️</button>
              {/* Delete */}
              <button
                data-action="delete"
                onMouseDown={e => { e.stopPropagation(); onDelete(card.id) }}
                className="text-ss-ghost hover:text-red-400 text-xs transition-colors"
                title="Löschen"
              >✕</button>
            </div>
          )}
        </div>
        <CardContent card={card} />
      </div>

      {/* Connect-Dot — rechts mittig */}
      <div
        data-action="connect"
        className={`
          absolute -right-2.5 top-1/2 -translate-y-1/2
          w-5 h-5 rounded-full border-2 border-white
          flex items-center justify-center
          cursor-crosshair z-20
          transition-all duration-150
          ${connectingFrom === card.id
            ? 'bg-ss-accent scale-125 opacity-100'
            : hovered ? 'bg-ss-ink opacity-100 scale-100' : 'opacity-0 scale-75 bg-ss-ink'
          }
        `}
        style={{ boxShadow: '0 0 0 1px #e8e8e4' }}
        onMouseDown={e => { e.stopPropagation(); e.preventDefault(); onConnectDotDown(card.id) }}
        title="Verbindung ziehen"
      >
        <span className="text-white text-2xs leading-none">+</span>
      </div>
    </div>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────

export default function BoardCanvas({ boardId, cards, connections, addCard, updateCard, moveCard, deleteCard, addConnection, deleteConnection }) {
  const canvasRef        = useRef(null)
  const [dragging,       setDragging]      = useState(null)  // { cardId, offX, offY }
  const [connectingFrom, setConnectingFrom]= useState(null)  // cardId
  const [connectLine,    setConnectLine]   = useState(null)  // {x1,y1,x2,y2}
  const [showAddModal,   setShowAddModal]  = useState(false)
  const [editCard,       setEditCard]      = useState(null)  // card object

  const CANVAS_W = Math.max(1400, ...cards.map(c => c.position.x + CARD_W + 140))
  const CANVAS_H = Math.max(900,  ...cards.map(c => c.position.y + 420))

  // Rechter Rand einer Card (Connect-Punkt)
  function cardConnectPoint(cardId) {
    const c = cards.find(c => c.id === cardId)
    if (!c) return { x: 0, y: 0 }
    return { x: c.position.x + CARD_W + 10, y: c.position.y + 60 }
  }

  // ─── Mouse Move / Up auf Canvas ──────────────────────
  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left + canvasRef.current.scrollLeft
    const my = e.clientY - rect.top  + canvasRef.current.scrollTop

    if (dragging) {
      moveCard(dragging.cardId,
        Math.max(0, mx - dragging.offX),
        Math.max(0, my - dragging.offY)
      )
    }
    if (connectingFrom) {
      const from = cardConnectPoint(connectingFrom)
      setConnectLine({ x1: from.x, y1: from.y, x2: mx, y2: my })
    }
  }

  function handleMouseUp(e) {
    // Drag beenden
    if (dragging) { setDragging(null); return }

    // Connect: prüfe ob Maus über einer Card endet
    if (connectingFrom) {
      const rect = canvasRef.current.getBoundingClientRect()
      const mx = e.clientX - rect.left + canvasRef.current.scrollLeft
      const my = e.clientY - rect.top  + canvasRef.current.scrollTop

      // Finde Card unter Mausposition
      const target = cards.find(c => {
        return (
          c.id !== connectingFrom &&
          mx >= c.position.x && mx <= c.position.x + CARD_W &&
          my >= c.position.y && my <= c.position.y + 160
        )
      })
      if (target) addConnection(connectingFrom, target.id)
      setConnectingFrom(null)
      setConnectLine(null)
    }
  }

  function handleConnectDotDown(cardId) {
    setConnectingFrom(cardId)
    const from = cardConnectPoint(cardId)
    setConnectLine({ x1: from.x, y1: from.y, x2: from.x, y2: from.y })
  }

  function handleDragStart(e, cardId) {
    e.preventDefault()
    const rect = canvasRef.current.getBoundingClientRect()
    const card = cards.find(c => c.id === cardId)
    setDragging({
      cardId,
      offX: e.clientX - rect.left + canvasRef.current.scrollLeft - card.position.x,
      offY: e.clientY - rect.top  + canvasRef.current.scrollTop  - card.position.y,
    })
  }

  // ESC bricht Connect-Modus ab
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') { setConnectingFrom(null); setConnectLine(null) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Toolbar */}
      <div className="bg-white border-b border-ss-border px-5 py-2.5 flex items-center gap-3 flex-shrink-0">
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-ss-ink text-white text-xs font-semibold rounded-lg hover:bg-ss-dim transition-colors">
          + Signal hinzufügen
        </button>

        {connectingFrom && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-ss-accentBg border border-ss-accent/30 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-ss-accent animate-pulse" />
            <span className="text-xs text-ss-accent font-medium">
              Auf Ziel-Card loslassen — ESC zum Abbrechen
            </span>
          </div>
        )}

        <span className="ml-auto text-xs text-ss-ghost">{cards.length} Signals · Klick auf Linie = trennen</span>
      </div>

      {/* Scrollbarer Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 overflow-auto bg-[#fafaf8]"
        style={{ cursor: connectingFrom ? 'crosshair' : 'default' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { setDragging(null) }}
      >
        <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>

          {/* SVG Linien */}
          <svg className="absolute inset-0 pointer-events-none" width={CANVAS_W} height={CANVAS_H} style={{ zIndex: 1 }}>
            {connections.map(cn => {
              const f = cardConnectPoint(cn.from)
              const t = cardConnectPoint(cn.to)
              const mx = (f.x + t.x) / 2
              return (
                <g key={cn.id}>
                  {/* Click-Ziel (unsichtbar, dick) */}
                  <path
                    d={`M${f.x},${f.y} C${mx},${f.y} ${mx},${t.y} ${t.x},${t.y}`}
                    stroke="transparent" strokeWidth="14" fill="none"
                    style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
                    onClick={() => deleteConnection(cn.id)}
                  />
                  {/* Sichtbare Linie */}
                  <path
                    d={`M${f.x},${f.y} C${mx},${f.y} ${mx},${t.y} ${t.x},${t.y}`}
                    stroke="#c8c8c2" strokeWidth="1.5" fill="none" strokeDasharray="4 5"
                    style={{ pointerEvents: 'none' }}
                  />
                  <circle cx={t.x} cy={t.y} r="3" fill="#c8c8c2" style={{ pointerEvents: 'none' }} />
                </g>
              )
            })}
            {/* Live-Linie */}
            {connectLine && (
              <line x1={connectLine.x1} y1={connectLine.y1} x2={connectLine.x2} y2={connectLine.y2}
                stroke="#7a8c3c" strokeWidth="2" strokeDasharray="5 4" />
            )}
          </svg>

          {/* Cards */}
          {cards.map(card => (
            <CanvasCard
              key={card.id}
              card={card}
              connectingFrom={connectingFrom}
              onDragStart={handleDragStart}
              onConnectDotDown={handleConnectDotDown}
              onEdit={setEditCard}
              onDelete={deleteCard}
            />
          ))}

          {/* Leerer Canvas */}
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
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddCardModal onAdd={(type, data) => { addCard(boardId, type, data) }} onClose={() => setShowAddModal(false)} />
      )}
      {editCard && (
        <EditCardModal card={editCard} onSave={(id, data) => { updateCard(id, data); setEditCard(null) }} onClose={() => setEditCard(null)} />
      )}
    </div>
  )
}
