// BoardCanvas.jsx — Komplett überarbeitet
// - Echte Card-Höhe via ResizeObserver für korrekte Anchor-Punkte
// - Width + Height Resize
// - Chain-Card Fix
// - UX-Verbesserungen

import { useRef, useState, useEffect, useCallback } from 'react'
import AddCardModal      from './AddCardModal.jsx'
import EditCardModal     from './EditCardModal.jsx'
import DeleteCardModal   from './DeleteCardModal.jsx'
import CanvasSection     from './CanvasSection.jsx'
import PedalIcon         from './PedalIcon.jsx'
import { PatternCardContent } from './PatternCard.jsx'
import { CARD_TINTS } from '../data/tints.js'
import {
  CARD_HEIGHT_DEFAULT,
  CARD_WIDTH_DEFAULT,
  buildConnectionPath,
  findBestAnchors,
  getCanvasSize,
  getCardAnchors,
} from '../lib/canvasGeometry.js'

function getTintStyle(card) {
  const t = CARD_TINTS.find(t => t.id === card.tint)
  if (!t || t.id === 'none') return { backgroundColor: '#ffffff', borderColor: '#e8e8e4' }
  return { backgroundColor: t.bg, borderColor: t.border }
}

// ─── Type Badge ───────────────────────────────────────────

function TypeBadge({ type }) {
  const labels = { note:'Note', link:'Link', image:'Image', instagram:'Instagram', chain:'Signal-Chain', pattern:'Pattern' }
  return <span className="font-mono text-xs text-ss-ghost/70 tracking-widest uppercase">{labels[type]||type}</span>
}

// ─── Note Card mit Expand-Toggle ─────────────────────────
function NoteCardContent({ title, description }) {
  const [expanded, setExpanded] = useState(false)
  const [expandedHeight, setExpandedHeight] = useState(96)
  const COLLAPSED_H = 96 // px — ca. 5 Zeilen

  // Brauchen wir den Toggle überhaupt?
  const textRef = useRef(null)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    if (textRef.current) {
      setOverflows(textRef.current.scrollHeight > COLLAPSED_H + 4)
      setExpandedHeight(textRef.current.scrollHeight)
    }
  }, [description])

  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-sans font-semibold text-sm text-ss-ink leading-snug">{title}</p>
      {description && (
        <div className="relative">
          <div
            ref={textRef}
            className="text-xs text-ss-dim leading-relaxed transition-all duration-300 overflow-hidden"
            style={{ maxHeight: expanded ? `${expandedHeight}px` : `${COLLAPSED_H}px` }}
          >
            {description}
          </div>
          {/* Toggle-Button — nur wenn Text überläuft */}
          {overflows && (
            <button
              data-action="expand"
              onMouseDown={e => { e.stopPropagation(); setExpanded(v => !v) }}
              className="mt-1.5 flex items-center gap-1 font-mono text-2xs text-ss-ghost/60 hover:text-ss-accent transition-colors"
            >
              <span>{expanded ? '↑' : '↓'}</span>
              <span>{expanded ? 'weniger' : 'mehr'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Card Content ─────────────────────────────────────────

function CardContent({ card }) {
  switch (card.type) {

    case 'image':
      return <div className="flex flex-col gap-2">
        {card.imageUrl && <div className="w-full aspect-video overflow-hidden rounded-md"><img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover"/></div>}
        <p className="font-sans font-semibold text-sm text-ss-ink leading-snug">{card.title}</p>
        {card.description && <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>}
      </div>

    case 'note':
      return <NoteCardContent title={card.title} description={card.description} />

    case 'link':
      return <div className="flex flex-col gap-2">
        {card.imageUrl && <div className="w-full aspect-video overflow-hidden rounded-md"><img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover opacity-90"/></div>}
        <p className="font-sans font-semibold text-sm text-ss-ink leading-snug">{card.title}</p>
        {card.description && <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>}
        {card.url && <a href={card.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
          className="inline-flex items-center gap-1 font-mono text-2xs text-ss-accent hover:text-ss-ink transition-colors truncate">
          <span>↗</span><span className="truncate">{card.url.replace(/^https?:\/\/(www\.)?/,'')}</span>
        </a>}
      </div>

    case 'instagram':
      return <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">📸</span>
          <span className="font-mono text-2xs text-ss-ghost">Instagram</span>
        </div>
        <p className="font-sans font-semibold text-sm text-ss-ink leading-snug">{card.title}</p>
        {card.url && <a href={card.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
          className="font-mono text-2xs text-ss-accent hover:underline truncate">
          ↗ {card.url.replace('https://www.instagram.com/','instagram.com/')}
        </a>}
      </div>

    case 'chain': {
      // Chain-Items bereinigen: alle nicht-leeren, nicht-Pfeil Items
      const items = (card.chain || []).filter(i => i && i.trim() && i !== '→')
      return <div className="flex flex-col gap-2">
        {card.title && card.title !== 'Signal Chain' &&
          <p className="font-sans font-semibold text-sm text-ss-ink leading-snug">{card.title}</p>}
        {items.length > 0
          ? <div className="flex items-center flex-wrap gap-2 p-2.5 rounded-lg border border-ss-border/60" style={{backgroundColor:'rgba(0,0,0,0.02)'}}>
              {items.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="flex flex-col items-center gap-1">
                    <PedalIcon size={18} color="#9e9890" />
                    <span className="font-mono text-2xs text-ss-ink bg-white border border-ss-border px-1.5 py-0.5 rounded-md shadow-sm leading-tight text-center" style={{maxWidth:72, wordBreak:'break-word'}}>{item}</span>
                  </span>
                  {i < items.length-1 && <span className="text-ss-ghost/40 text-xs self-start mt-2">→</span>}
                </span>
              ))}
            </div>
          : <p className="text-xs text-ss-ghost/50 italic">Noch keine Geräte hinzugefügt</p>
        }
        {card.description && <p className="text-xs text-ss-dim leading-relaxed">{card.description}</p>}
      </div>
    }

    case 'pattern':
      return <PatternCardContent card={card} />

    default:
      return <p className="text-sm text-ss-ink">{card.title}</p>
  }
}

// ─── Canvas Card ──────────────────────────────────────────

function CanvasCard({ card, connectingFrom, selected, onSelect, onDragStart, onTouchStart, onConnectDotDown, onEdit, onDelete, onDuplicate, onResize, onLockToggle, onHeightChange, onInteractionStart, onInteractionEnd }) {
  const [hovered,     setHovered]     = useState(false)
  const [hoveredSide, setHoveredSide] = useState(null)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const cardRef      = useRef(null)
  const contentRef   = useRef(null)
  const mouseDownPos = useRef(null)
  const tintStyle  = getTintStyle(card)
  const cardW      = card.width || CARD_WIDTH_DEFAULT
  const locked     = card.locked || false

  // Menü schließen bei Klick außerhalb
  useEffect(() => {
    if (!menuOpen) return
    function onOut(e) { if (!e.target.closest('[data-menu]')) setMenuOpen(false) }
    window.addEventListener('mousedown', onOut)
    window.addEventListener('touchstart', onOut)
    return () => { window.removeEventListener('mousedown', onOut); window.removeEventListener('touchstart', onOut) }
  }, [menuOpen])

  // Echte Höhe messen und nach oben melden
  useEffect(() => {
    if (!contentRef.current) return
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        onHeightChange(card.id, entry.contentRect.height)
      }
    })
    ro.observe(contentRef.current)
    return () => ro.disconnect()
  }, [card.id, onHeightChange])

  function detectSide(e) {
    if (!cardRef.current) return 'right'
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left, y = e.clientY - rect.top
    const dL = x, dR = rect.width - x, dT = y, dB = rect.height - y
    const min = Math.min(dL, dR, dT, dB)
    if (min === dT) return 'top'
    if (min === dB) return 'bottom'
    if (min === dL) return 'left'
    return 'right'
  }

  function handleMouseMove(e) { if (hovered) setHoveredSide(detectSide(e)) }

  // Resize: Breite UND Höhe
  function handleResizeMouseDown(e) {
    e.stopPropagation(); e.preventDefault()
    onInteractionStart()
    const startX = e.clientX, startY = e.clientY
    const startW = cardW
    const startH = contentRef.current?.offsetHeight || CARD_HEIGHT_DEFAULT
    function onMove(ev) {
      const newW = Math.max(180, startW + ev.clientX - startX)
      const newH = Math.max(80,  startH + ev.clientY - startY)
      onResize(card.id, newW, newH)
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      onInteractionEnd()
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  function handleResizeTouchStart(e) {
    e.stopPropagation()
    if (e.touches.length !== 1) return
    onInteractionStart()
    const t0 = e.touches[0]
    const startX = t0.clientX, startY = t0.clientY
    const startW = cardW, startH = contentRef.current?.offsetHeight || CARD_HEIGHT_DEFAULT
    function onMove(ev) {
      if (ev.touches.length !== 1) return; ev.preventDefault()
      onResize(card.id,
        Math.max(180, startW + ev.touches[0].clientX - startX),
        Math.max(80,  startH + ev.touches[0].clientY - startY)
      )
    }
    function onEnd() {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
      onInteractionEnd()
    }
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)
  }

  const dotsConfig = {
    top:    { style: { top: -7,    left: '50%', transform: 'translateX(-50%)' } },
    bottom: { style: { bottom: -7, left: '50%', transform: 'translateX(-50%)' } },
    left:   { style: { left: -7,   top: '50%',  transform: 'translateY(-50%)' } },
    right:  { style: { right: -7,  top: '50%',  transform: 'translateY(-50%)' } },
  }

  // Dots alleen bij hover en niet selected (zodat toolbar en dots nooit tegelijk)
  const visibleDots = connectingFrom
    ? (connectingFrom === card.id ? Object.keys(dotsConfig) : [])
    : (!selected && hovered && hoveredSide ? [hoveredSide] : [])

  // Minimale Höhe falls card.height gesetzt
  const minHeight = card.height ? { minHeight: card.height } : {}

  return (
    <div
      className="absolute select-none"
      style={{ left: card.position.x, top: card.position.y, width: cardW, zIndex: (selected || hovered) ? 10 : 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setHoveredSide(null) }}
      onMouseMove={handleMouseMove}
      onMouseDown={e => {
        if (e.target.closest('[data-action]')) return
        mouseDownPos.current = { x: e.clientX, y: e.clientY }
        if (connectingFrom || locked) return
        onDragStart(e, card.id)
      }}
      onTouchStart={e => {
        if (e.target.closest('[data-action]')) return
        if (connectingFrom) return
        if (!locked) onTouchStart(e, card.id)
      }}
      onClick={e => {
        if (e.target.closest('[data-action]')) return
        if (connectingFrom) return
        // Check dat het geen drag was
        const down = mouseDownPos.current
        if (down && (Math.abs(e.clientX - down.x) > 5 || Math.abs(e.clientY - down.y) > 5)) return
        e.stopPropagation()
        onSelect(selected ? null : card.id)
        setMenuOpen(false)
      }}

    >
      {/* Card Shell */}
      <div
        ref={cardRef}
        className={`
          border rounded-xl flex flex-col relative overflow-hidden
          transition-all duration-200
          ${locked
            ? 'cursor-default shadow-sm'
            : connectingFrom && connectingFrom !== card.id
              ? 'ring-2 ring-ss-accent/40 cursor-crosshair shadow-lg'
              : selected
                ? 'ring-2 ring-ss-ink/20 shadow-xl cursor-grab'
                : hovered ? 'shadow-lg cursor-grab' : 'shadow-sm cursor-grab'
          }
        `}
        style={{ ...tintStyle, ...minHeight }}
      >
        {/* Type Badge oben */}
        <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
          <TypeBadge type={card.type} />
          {locked && <span className="text-2xs text-red-400 mr-1">🔒</span>}
        </div>

        {/* Content */}
        <div ref={contentRef} className="px-3 pb-3 flex-1">
          <CardContent card={card} />
        </div>

        {/* Resize Handle */}
        {(hovered || selected) && !locked && (
          <div data-action="resize"
            className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-1.5 opacity-60 hover:opacity-100 transition-opacity"
            onMouseDown={handleResizeMouseDown}
            onTouchStart={handleResizeTouchStart}
            title="Größe ändern"
          >
            <svg width="9" height="9" viewBox="0 0 9 9">
              <path d="M9 0 L9 9 L0 9 Z" fill="#c8c8c2"/>
            </svg>
          </div>
        )}
      </div>

      {/* ── Bottom Toolbar — alleen bij selected ── */}
      {selected && !connectingFrom && (
        <div data-action="toolbar"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white border border-ss-border rounded-xl shadow-lg px-1.5 py-1"
          style={{ bottom: -42, zIndex: 30, whiteSpace: 'nowrap' }}
        >
          {/* Duplicate */}
          <button data-action="duplicate"
            onClick={e => { e.stopPropagation(); onDuplicate(card) }}
            className="flex items-center px-2 py-1.5 rounded-lg text-ss-dim hover:text-ss-ink hover:bg-ss-surface transition-colors"
            title="Duplizieren">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M3 9H2a1 1 0 01-1-1V2a1 1 0 011-1h6a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
          {/* Lock */}
          <button data-action="lock"
            onClick={e => { e.stopPropagation(); onLockToggle(card.id) }}
            className={`flex items-center px-2 py-1.5 rounded-lg transition-colors text-xs ${locked ? 'text-red-400 hover:bg-red-50' : 'text-ss-dim hover:text-ss-ink hover:bg-ss-surface'}`}
            title={locked ? 'Entsperren' : 'Sperren'}>
            {locked ? '🔒' : '🔓'}
          </button>
          <div className="w-px h-5 bg-ss-border mx-0.5"/>
          {/* ··· */}
          <div className="relative" data-menu>
            <button data-action="menu"
              onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}
              className="flex items-center px-2 py-1.5 rounded-lg text-ss-dim hover:text-ss-ink hover:bg-ss-surface transition-colors"
              title="Mehr">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="2.5" cy="6.5" r="1.2" fill="currentColor"/>
                <circle cx="6.5" cy="6.5" r="1.2" fill="currentColor"/>
                <circle cx="10.5" cy="6.5" r="1.2" fill="currentColor"/>
              </svg>
            </button>
            {menuOpen && (
              <div data-menu className="absolute bottom-full mb-2 right-0 bg-white border border-ss-border rounded-xl shadow-xl py-1 min-w-[145px]" style={{ zIndex: 50 }}>
                <button data-action="edit"
                  onClick={e => { e.stopPropagation(); onEdit(card); setMenuOpen(false); onSelect(null) }}
                  className="w-full text-left px-3 py-2 text-xs text-ss-ink hover:bg-ss-surface transition-colors flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8.5 1.5l2 2L4 10H2v-2L8.5 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                  </svg>
                  Bearbeiten
                </button>
                <div className="h-px bg-ss-border/60 mx-2 my-1"/>
                <button data-action="delete"
                  onClick={e => { e.stopPropagation(); onDelete(card.id); setMenuOpen(false); onSelect(null) }}
                  className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 3h8M5 3V2h2v1M4 5l.5 5M8 5l-.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  Löschen
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Verbindungspunkte */}
      {visibleDots.map(side => (
        <div key={side} data-action="connect"
          className="absolute w-3.5 h-3.5 rounded-full flex items-center justify-center cursor-crosshair z-20 transition-all duration-100 hover:scale-125"
          style={{
            ...dotsConfig[side].style,
            backgroundColor: connectingFrom === card.id ? '#7a8c3c' : '#a8a8a0',
            boxShadow: '0 0 0 2.5px white, 0 2px 4px rgba(0,0,0,0.1)',
          }}
          onMouseDown={e=>{e.stopPropagation(); e.preventDefault(); onConnectDotDown(card.id, side)}}
          title="Verbindung ziehen"
        >
          <span style={{fontSize:7, color:'white', fontWeight:800, lineHeight:1}}>+</span>
        </div>
      ))}

      {/* Ziel-Highlight */}
      {connectingFrom && connectingFrom !== card.id && hovered && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-ss-accent pointer-events-none" style={{zIndex:11}} />
      )}
    </div>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────

export default function BoardCanvas({ boardId, cards, connections, sections, addCard, updateCard, moveCard, deleteCard, addConnection, deleteConnection, addSection, updateSection, moveSection, deleteSection, lockSection, beginHistoryGroup, endHistoryGroup }) {
  const canvasRef        = useRef(null)
  const [dragging,       setDragging]       = useState(null)
  const [connectingFrom, setConnectingFrom] = useState(null)
  const [connectLine,    setConnectLine]    = useState(null)
  const [showAddModal,   setShowAddModal]   = useState(false)
  const [editCard,       setEditCard]       = useState(null)
  const [cardToDelete,   setCardToDelete]   = useState(null)
  const [activeSection,  setActiveSection]  = useState(null)
  const [selectedCardId, setSelectedCardId] = useState(null)
  // Echte gemessene Höhen der Cards
  const [cardHeights,    setCardHeights]    = useState({})

  const handleHeightChange = useCallback((cardId, h) => {
    setCardHeights(prev => prev[cardId] === h ? prev : { ...prev, [cardId]: h })
  }, [])

  const canvasSize = getCanvasSize(cards, cardHeights)

  function canvasPos(clientX, clientY) {
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: clientX - rect.left + canvasRef.current.scrollLeft,
      y: clientY - rect.top  + canvasRef.current.scrollTop,
    }
  }

  function anchorPoint(cardId, side) {
    const c = cards.find(c => c.id === cardId)
    if (!c) return { x:0, y:0 }
    const anchors = getCardAnchors(c, cardHeights[cardId])
    return anchors[side] || anchors.right
  }

  function handleMouseMove(e) {
    const pos = canvasPos(e.clientX, e.clientY)
    if (dragging) {
      if (dragging.sectionId) {
        moveSection(dragging.sectionId, Math.max(0, pos.x - dragging.offX), Math.max(0, pos.y - dragging.offY))
      } else {
        moveCard(dragging.cardId, Math.max(0, pos.x - dragging.offX), Math.max(0, pos.y - dragging.offY))
      }
    }
    if (connectingFrom) {
      const from = anchorPoint(connectingFrom.cardId, connectingFrom.side)
      setConnectLine({ x1:from.x, y1:from.y, x2:pos.x, y2:pos.y })
    }
  }

  function handleMouseUp(e) {
    if (dragging) {
      setDragging(null)
      endHistoryGroup()
      return
    }
    if (connectingFrom) {
      const pos = canvasPos(e.clientX, e.clientY)
      const target = cards.find(c => {
        const h = cardHeights[c.id] || CARD_HEIGHT_DEFAULT
        return c.id !== connectingFrom.cardId &&
          pos.x >= c.position.x && pos.x <= c.position.x + (c.width||CARD_WIDTH_DEFAULT) &&
          pos.y >= c.position.y && pos.y <= c.position.y + h
      })
      if (target) addConnection(connectingFrom.cardId, target.id)
      setConnectingFrom(null); setConnectLine(null)
    }
  }

  function handleDragStart(e, cardId) {
    const pos = canvasPos(e.clientX, e.clientY)
    const card = cards.find(c => c.id === cardId)
    if (!card || card.locked) return
    beginHistoryGroup()
    setDragging({ cardId, offX: pos.x - card.position.x, offY: pos.y - card.position.y })
  }

  function handleSectionDragStart(e, sectionId) {
    e.preventDefault()
    const sec = sections.find(s => s.id === sectionId)
    if (!sec || sec.locked) return
    beginHistoryGroup()
    const pos = canvasPos(e.clientX, e.clientY)
    setDragging({ sectionId, offX: pos.x - sec.position.x, offY: pos.y - sec.position.y })
  }

  function handleSectionTouchStart(e, sectionId) {
    if (e.touches.length !== 1) return
    const sec = sections.find(s => s.id === sectionId)
    if (!sec || sec.locked) return
    beginHistoryGroup()
    const pos = canvasPos(e.touches[0].clientX, e.touches[0].clientY)
    setDragging({ sectionId, offX: pos.x - sec.position.x, offY: pos.y - sec.position.y })
  }

  function handleTouchStart(e, cardId) {
    if (e.touches.length !== 1) return
    const card = cards.find(c => c.id === cardId)
    if (!card || card.locked) return
    beginHistoryGroup()
    const pos = canvasPos(e.touches[0].clientX, e.touches[0].clientY)
    setDragging({ cardId, offX: pos.x - card.position.x, offY: pos.y - card.position.y })
  }

  function handleTouchMove(e) {
    if (!dragging || e.touches.length !== 1) return
    e.preventDefault()
    const pos = canvasPos(e.touches[0].clientX, e.touches[0].clientY)
    if (dragging.sectionId) moveSection(dragging.sectionId, Math.max(0,pos.x-dragging.offX), Math.max(0,pos.y-dragging.offY))
    else moveCard(dragging.cardId, Math.max(0,pos.x-dragging.offX), Math.max(0,pos.y-dragging.offY))
  }

  function handleConnectDotDown(cardId, side) {
    setConnectingFrom({ cardId, side })
    const from = anchorPoint(cardId, side)
    setConnectLine({ x1:from.x, y1:from.y, x2:from.x, y2:from.y })
  }

  function handleResizeCard(cardId, newW, newH) {
    updateCard(cardId, { width: newW, height: newH })
  }

  function handleLockToggle(cardId) {
    const card = cards.find(c => c.id === cardId)
    if (card) updateCard(cardId, { locked: !card.locked })
  }

  function handleDuplicate(card) {
    const { id: _id, boardId: _b, position, ...rest } = card
    addCard(boardId, card.type, {
      ...rest,
      position: { x: (position?.x || 100) + 24, y: (position?.y || 100) + 24 },
    })
  }

  function handleAddSection() {
    const el = canvasRef.current
    const cx = el.scrollLeft + el.clientWidth  / 2 - 170
    const cy = el.scrollTop  + el.clientHeight / 2 - 110
    addSection(boardId, { x: cx, y: cy })
  }

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') { setConnectingFrom(null); setConnectLine(null) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Toolbar */}
      <div className="bg-white border-b border-ss-border px-5 py-2.5 flex items-center gap-2.5 flex-shrink-0">
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-ss-ink text-white text-xs font-semibold rounded-lg hover:bg-ss-dim transition-colors">
          + Signal
        </button>
        <button onClick={handleAddSection}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-ss-border text-ss-dim text-xs font-semibold rounded-lg hover:border-ss-muted hover:text-ss-ink transition-colors">
          + Section
        </button>
        {connectingFrom && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-ss-accentBg border border-ss-accent/30 rounded-lg ml-1">
            <div className="w-2 h-2 rounded-full bg-ss-accent animate-pulse" />
            <span className="text-xs text-ss-accent font-medium">Auf Ziel-Card loslassen — ESC abbr.</span>
          </div>
        )}
        <span className="ml-auto text-2xs text-ss-ghost hidden sm:block font-mono">{cards.length} signals · click line to disconnect</span>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 overflow-auto"
        style={{
          background: 'radial-gradient(circle at 1px 1px, #e8e8e4 1px, transparent 0) 0 0 / 24px 24px',
          backgroundColor: '#fafaf8',
          cursor: connectingFrom ? 'crosshair' : 'default',
          touchAction: dragging ? 'none' : 'pan-x pan-y',
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          if (dragging) endHistoryGroup()
          setDragging(null)
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => {
          if (dragging) endHistoryGroup()
          setDragging(null)
        }}
        onClick={() => { setActiveSection(null); setSelectedCardId(null) }}
      >
        <div className="relative" style={{ width: canvasSize.width, height: canvasSize.height }}>

          {/* Sections */}
          {sections.map(section => (
            <CanvasSection key={section.id} section={section}
              isActive={activeSection === section.id}
              onActivate={() => setActiveSection(section.id)}
              onDragStart={handleSectionDragStart}
              onTouchStart={handleSectionTouchStart}
              onUpdate={updateSection}
              onDelete={deleteSection}
              onLockToggle={lockSection}
              onInteractionStart={beginHistoryGroup}
              onInteractionEnd={endHistoryGroup}
            />
          ))}

          {/* SVG Linien */}
          <svg className="absolute inset-0 pointer-events-none" width={canvasSize.width} height={canvasSize.height} style={{zIndex:1}}>
            <defs>
              <marker id="dot-end" markerWidth="4" markerHeight="4" refX="2" refY="2">
                <circle cx="2" cy="2" r="1.5" fill="#c0c0b8"/>
              </marker>
            </defs>
            {connections.map(cn => {
              const fc = cards.find(c => c.id === cn.from)
              const tc = cards.find(c => c.id === cn.to)
              if (!fc || !tc) return null
              const pts = findBestAnchors(fc, tc, cardHeights)
              if (!pts) return null
              const { from: f, to: t, fromSide, toSide } = pts
              const path = buildConnectionPath(f, t, fromSide, toSide)
              return (
                <g key={cn.id}>
                  <path d={path} stroke="transparent" strokeWidth="12" fill="none"
                    style={{pointerEvents:'stroke', cursor:'pointer'}} onClick={()=>deleteConnection(cn.id)} />
                  <path d={path} stroke="#c8c8c0" strokeWidth="1.5" fill="none" strokeDasharray="4 5"
                    markerEnd="url(#dot-end)" style={{pointerEvents:'none'}} />
                </g>
              )
            })}
            {connectLine && (
              <line x1={connectLine.x1} y1={connectLine.y1} x2={connectLine.x2} y2={connectLine.y2}
                stroke="#7a8c3c" strokeWidth="1.5" strokeDasharray="5 4" />
            )}
          </svg>

          {/* Cards */}
          {cards.map(card => (
            <CanvasCard key={card.id} card={card}
              connectingFrom={connectingFrom?.cardId}
              selected={selectedCardId === card.id}
              onSelect={setSelectedCardId}
              onDragStart={handleDragStart}
              onTouchStart={handleTouchStart}
              onConnectDotDown={handleConnectDotDown}
              onEdit={setEditCard}
              onDelete={c => setCardToDelete(cards.find(x => x.id === c) || { id: c, type: 'note', title: '' })}
              onDuplicate={handleDuplicate}
              onResize={handleResizeCard}
              onLockToggle={handleLockToggle}
              onHeightChange={handleHeightChange}
              onInteractionStart={beginHistoryGroup}
              onInteractionEnd={endHistoryGroup}
            />
          ))}

          {cards.length === 0 && sections.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <p className="text-ss-ghost/60 text-sm">Empty field.</p>
              <button onClick={() => setShowAddModal(true)}
                className="px-4 py-2 border border-ss-border rounded-lg text-sm text-ss-dim hover:border-ss-muted hover:text-ss-ink transition-all">
                + Add first signal
              </button>
            </div>
          )}
        </div>
      </div>

      {showAddModal && <AddCardModal onAdd={(type,data)=>addCard(boardId,type,data)} onClose={()=>setShowAddModal(false)} />}
      {editCard    && <EditCardModal card={editCard} onSave={(id,data)=>{updateCard(id,data);setEditCard(null)}} onClose={()=>setEditCard(null)} />}
      {cardToDelete && <DeleteCardModal card={cardToDelete} onConfirm={() => { deleteCard(cardToDelete.id); setCardToDelete(null) }} onClose={() => setCardToDelete(null)} />}
    </div>
  )
}
