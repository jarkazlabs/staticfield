// BoardCanvas.jsx — Interaktiver Canvas
// - 4 Verbindungspunkte pro Card (oben, unten, links, rechts)
// - Linie geht zum nächstgelegenen Punkt der Ziel-Card
// - Touch-Support für Mobile
// - Weiße Card-Hintergründe erzwungen

import { useRef, useState, useCallback, useEffect } from 'react'
import AddCardModal   from './AddCardModal.jsx'
import EditCardModal  from './EditCardModal.jsx'
import CanvasSection  from './CanvasSection.jsx'
import { CARD_TINTS } from '../data/tints.js'

const CARD_W = 250
const CARD_H_ESTIMATE = 160 // Geschätzte Höhe für Punkt-Berechnung

function getTintStyle(card) {
  const t = CARD_TINTS.find(t => t.id === card.tint)
  if (!t || t.id === 'none') return { backgroundColor: '#ffffff', borderColor: '#e8e8e4' }
  return { backgroundColor: t.bg, borderColor: t.border }
}

// Alle 4 Anker-Punkte einer Card
function getAnchors(card) {
  const x = card.position.x
  const y = card.position.y
  return {
    top:    { x: x + CARD_W / 2,  y: y },
    bottom: { x: x + CARD_W / 2,  y: y + CARD_H_ESTIMATE },
    left:   { x: x,               y: y + CARD_H_ESTIMATE / 2 },
    right:  { x: x + CARD_W,      y: y + CARD_H_ESTIMATE / 2 },
  }
}

// Distanz zwischen zwei Punkten
function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

// Beste Anker-Kombination zwischen zwei Cards
function bestAnchors(fromCard, toCard) {
  const fa = getAnchors(fromCard)
  const ta = getAnchors(toCard)
  let best = null, bestDist = Infinity
  for (const fk of Object.keys(fa)) {
    for (const tk of Object.keys(ta)) {
      const d = dist(fa[fk], ta[tk])
      if (d < bestDist) { bestDist = d; best = { from: fa[fk], to: ta[tk] } }
    }
  }
  return best
}

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
            <div className="w-full aspect-video overflow-hidden rounded-sm mb-2">
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
            <div className="flex items-center flex-wrap gap-1 p-2 rounded border border-ss-border"
              style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
              {card.chain.filter(item => item && item !== '→').map((item, i, arr) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="font-mono text-2xs text-ss-ink bg-white border border-ss-border px-1.5 py-0.5 rounded-sm">{item}</span>
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

// ─── Einzelne Card ────────────────────────────────────────

function CanvasCard({ card, connectingFrom, onDragStart, onTouchStart, onConnectDotDown, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false)
  const tintStyle = getTintStyle(card)

  // Ankerpunkte relativ zur Card (für Dot-Anzeige)
  const dots = [
    { key: 'top',    style: { top: -6, left: '50%', transform: 'translateX(-50%)' } },
    { key: 'bottom', style: { bottom: -6, left: '50%', transform: 'translateX(-50%)' } },
    { key: 'left',   style: { left: -6, top: '50%', transform: 'translateY(-50%)' } },
    { key: 'right',  style: { right: -6, top: '50%', transform: 'translateY(-50%)' } },
  ]

  return (
    <div
      className="absolute select-none"
      style={{ left: card.position.x, top: card.position.y, width: CARD_W, zIndex: hovered ? 10 : 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={e => {
        if (e.target.closest('[data-action]')) return
        if (connectingFrom) return
        onDragStart(e, card.id)
      }}
      onTouchStart={e => {
        if (e.target.closest('[data-action]')) return
        if (connectingFrom) return
        onTouchStart(e, card.id)
      }}
    >
      {/* Card */}
      <div
        className={`
          border rounded-lg p-3 flex flex-col gap-1
          transition-shadow duration-200
          ${connectingFrom && connectingFrom !== card.id
            ? 'ring-2 ring-ss-accent/30 cursor-crosshair shadow-md'
            : hovered ? 'shadow-lg cursor-grab' : 'shadow-sm cursor-grab'
          }
        `}
        style={tintStyle}
      >
        <div className="flex justify-between items-start mb-1">
          <TypeBadge type={card.type} />
          {hovered && !connectingFrom && (
            <div className="flex items-center gap-1.5" data-action="buttons">
              <button data-action="edit"
                onMouseDown={e => { e.stopPropagation(); onEdit(card) }}
                className="text-ss-ghost hover:text-ss-ink text-xs transition-colors" title="Bearbeiten">✏️</button>
              <button data-action="delete"
                onMouseDown={e => { e.stopPropagation(); onDelete(card.id) }}
                className="text-ss-ghost hover:text-red-400 text-xs transition-colors" title="Löschen">✕</button>
            </div>
          )}
        </div>
        <CardContent card={card} />
      </div>

      {/* 4 Verbindungspunkte */}
      {(hovered || connectingFrom) && dots.map(dot => (
        <div
          key={dot.key}
          data-action="connect"
          className={`
            absolute w-4 h-4 rounded-full border-2 border-white
            flex items-center justify-center cursor-crosshair z-20
            transition-all duration-150
            ${connectingFrom === card.id
              ? 'bg-ss-accent scale-125 opacity-100'
              : hovered ? 'bg-ss-ink opacity-100' : 'opacity-0 bg-ss-ink'
            }
          `}
          style={{ ...dot.style, boxShadow: '0 0 0 1px #e8e8e4' }}
          onMouseDown={e => { e.stopPropagation(); e.preventDefault(); onConnectDotDown(card.id, dot.key) }}
          title="Verbindung ziehen"
        />
      ))}
    </div>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────

export default function BoardCanvas({ boardId, cards, connections, sections, addCard, updateCard, moveCard, deleteCard, addConnection, deleteConnection, addSection, updateSection, moveSection, deleteSection }) {
  const canvasRef        = useRef(null)
  const [dragging,       setDragging]       = useState(null)  // { cardId, offX, offY } OR { sectionId, offX, offY }
  const [connectingFrom, setConnectingFrom] = useState(null)
  const [connectLine,    setConnectLine]    = useState(null)
  const [showAddModal,   setShowAddModal]   = useState(false)
  const [editCard,       setEditCard]       = useState(null)

  const CANVAS_W = Math.max(1600, ...cards.map(c => c.position.x + CARD_W + 200), 100)
  const CANVAS_H = Math.max(1000, ...cards.map(c => c.position.y + 500), 100)

  // Mausposition relativ zum Canvas (mit Scroll)
  function canvasPos(clientX, clientY) {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: clientX - rect.left  + canvasRef.current.scrollLeft,
      y: clientY - rect.top   + canvasRef.current.scrollTop,
    }
  }

  // Ankerpunkt aus Richtung
  function anchorPoint(cardId, side) {
    const c = cards.find(c => c.id === cardId)
    if (!c) return { x: 0, y: 0 }
    const a = getAnchors(c)
    return a[side] || a.right
  }

  // ─── Mouse ──────────────────────────────────────────
  function handleMouseMove(e) {
    const pos = canvasPos(e.clientX, e.clientY)
    if (dragging) {
      if (dragging.sectionId) {
        moveSection(dragging.sectionId,
          Math.max(0, pos.x - dragging.offX),
          Math.max(0, pos.y - dragging.offY)
        )
      } else {
        moveCard(dragging.cardId,
          Math.max(0, pos.x - dragging.offX),
          Math.max(0, pos.y - dragging.offY)
        )
      }
    }
    if (connectingFrom) {
      const from = anchorPoint(connectingFrom.cardId, connectingFrom.side)
      setConnectLine({ x1: from.x, y1: from.y, x2: pos.x, y2: pos.y })
    }
  }

  function handleMouseUp(e) {
    if (dragging) { setDragging(null); return }
    if (connectingFrom) {
      const pos = canvasPos(e.clientX, e.clientY)
      const target = cards.find(c =>
        c.id !== connectingFrom.cardId &&
        pos.x >= c.position.x && pos.x <= c.position.x + CARD_W &&
        pos.y >= c.position.y && pos.y <= c.position.y + CARD_H_ESTIMATE
      )
      if (target) addConnection(connectingFrom.cardId, target.id)
      setConnectingFrom(null)
      setConnectLine(null)
    }
  }

  function handleDragStart(e, cardId) {
    e.preventDefault()
    const pos = canvasPos(e.clientX, e.clientY)
    const card = cards.find(c => c.id === cardId)
    setDragging({ cardId, offX: pos.x - card.position.x, offY: pos.y - card.position.y })
  }

  function handleSectionDragStart(e, sectionId) {
    e.preventDefault()
    const pos = canvasPos(e.clientX, e.clientY)
    const sec = sections.find(s => s.id === sectionId)
    setDragging({ sectionId, offX: pos.x - sec.position.x, offY: pos.y - sec.position.y })
  }

  function handleSectionTouchStart(e, sectionId) {
    if (e.touches.length !== 1) return
    const t = e.touches[0]
    const pos = canvasPos(t.clientX, t.clientY)
    const sec = sections.find(s => s.id === sectionId)
    setDragging({ sectionId, offX: pos.x - sec.position.x, offY: pos.y - sec.position.y })
  }

  function handleConnectDotDown(cardId, side) {
    setConnectingFrom({ cardId, side })
    const from = anchorPoint(cardId, side)
    setConnectLine({ x1: from.x, y1: from.y, x2: from.x, y2: from.y })
  }

  // ─── Touch ──────────────────────────────────────────
  function handleTouchStart(e, cardId) {
    if (e.touches.length !== 1) return
    const t = e.touches[0]
    const pos = canvasPos(t.clientX, t.clientY)
    const card = cards.find(c => c.id === cardId)
    setDragging({ cardId, offX: pos.x - card.position.x, offY: pos.y - card.position.y })
  }

  function handleTouchMove(e) {
    if (!dragging || e.touches.length !== 1) return
    e.preventDefault()
    const t = e.touches[0]
    const pos = canvasPos(t.clientX, t.clientY)
    if (dragging.sectionId) {
      moveSection(dragging.sectionId,
        Math.max(0, pos.x - dragging.offX),
        Math.max(0, pos.y - dragging.offY)
      )
    } else {
      moveCard(dragging.cardId,
        Math.max(0, pos.x - dragging.offX),
        Math.max(0, pos.y - dragging.offY)
      )
    }
  }

  function handleTouchEnd() {
    setDragging(null)
  }

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
          + Signal
        </button>
        <button onClick={() => addSection(boardId)}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-ss-border text-ss-dim text-xs font-semibold rounded-lg hover:border-ss-muted hover:text-ss-ink transition-colors">
          + Section
        </button>
        {connectingFrom && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-ss-accentBg border border-ss-accent/30 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-ss-accent animate-pulse" />
            <span className="text-xs text-ss-accent font-medium">Auf Ziel-Card loslassen — ESC abbr.</span>
          </div>
        )}
        <span className="ml-auto text-xs text-ss-ghost hidden sm:block">{cards.length} Signals · Linie = trennen</span>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 overflow-auto bg-[#fafaf8]"
        style={{ cursor: connectingFrom ? 'crosshair' : 'default', touchAction: dragging ? 'none' : 'pan-x pan-y' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setDragging(null)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>

          {/* SVG Linien */}
          <svg className="absolute inset-0 pointer-events-none" width={CANVAS_W} height={CANVAS_H} style={{ zIndex: 1 }}>
            {connections.map(cn => {
              const fromCard = cards.find(c => c.id === cn.from)
              const toCard   = cards.find(c => c.id === cn.to)
              if (!fromCard || !toCard) return null
              const pts = bestAnchors(fromCard, toCard)
              if (!pts) return null
              const { from: f, to: t } = pts
              const mx = (f.x + t.x) / 2
              return (
                <g key={cn.id}>
                  <path
                    d={`M${f.x},${f.y} C${mx},${f.y} ${mx},${t.y} ${t.x},${t.y}`}
                    stroke="transparent" strokeWidth="14" fill="none"
                    style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
                    onClick={() => deleteConnection(cn.id)}
                  />
                  <path
                    d={`M${f.x},${f.y} C${mx},${f.y} ${mx},${t.y} ${t.x},${t.y}`}
                    stroke="#c8c8c2" strokeWidth="1.5" fill="none" strokeDasharray="4 5"
                    style={{ pointerEvents: 'none' }}
                  />
                  <circle cx={f.x} cy={f.y} r="3" fill="#c8c8c2" style={{ pointerEvents: 'none' }} />
                  <circle cx={t.x} cy={t.y} r="3" fill="#c8c8c2" style={{ pointerEvents: 'none' }} />
                </g>
              )
            })}
            {connectLine && (
              <line x1={connectLine.x1} y1={connectLine.y1} x2={connectLine.x2} y2={connectLine.y2}
                stroke="#7a8c3c" strokeWidth="2" strokeDasharray="5 4" />
            )}
          </svg>

          {/* Sections — hinter Cards (z-index 0) */}
          {sections.map(section => (
            <CanvasSection
              key={section.id}
              section={section}
              onDragStart={handleSectionDragStart}
              onTouchStart={handleSectionTouchStart}
              onUpdate={updateSection}
              onDelete={deleteSection}
            />
          ))}

          {/* Cards */}
          {cards.map(card => (
            <CanvasCard
              key={card.id}
              card={card}
              connectingFrom={connectingFrom?.cardId}
              onDragStart={handleDragStart}
              onTouchStart={handleTouchStart}
              onConnectDotDown={handleConnectDotDown}
              onEdit={setEditCard}
              onDelete={deleteCard}
            />
          ))}

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

      {showAddModal && (
        <AddCardModal onAdd={(type, data) => addCard(boardId, type, data)} onClose={() => setShowAddModal(false)} />
      )}
      {editCard && (
        <EditCardModal card={editCard} onSave={(id, data) => { updateCard(id, data); setEditCard(null) }} onClose={() => setEditCard(null)} />
      )}
    </div>
  )
}
