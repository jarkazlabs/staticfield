// BoardCanvas.jsx
// - Dots nur auf der richtigen Seite beim Hover
// - Saubere Connections (orthogonale Kurven)
// - Card resize handle
// - Section: Mitte spawnen, Vordergrund beim Bearbeiten
// - Lock für Cards und Sections

import { useRef, useState, useEffect } from 'react'
import AddCardModal   from './AddCardModal.jsx'
import EditCardModal  from './EditCardModal.jsx'
import CanvasSection  from './CanvasSection.jsx'
import { CARD_TINTS } from '../data/tints.js'

const CARD_W_DEFAULT  = 250
const CARD_H_ESTIMATE = 160

function getTintStyle(card) {
  const t = CARD_TINTS.find(t => t.id === card.tint)
  if (!t || t.id === 'none') return { backgroundColor: '#ffffff', borderColor: '#e8e8e4' }
  return { backgroundColor: t.bg, borderColor: t.border }
}

function getAnchors(card) {
  const w = card.width  || CARD_W_DEFAULT
  const h = card.height || CARD_H_ESTIMATE
  const x = card.position.x
  const y = card.position.y
  return {
    top:    { x: x + w / 2, y },
    bottom: { x: x + w / 2, y: y + h },
    left:   { x,             y: y + h / 2 },
    right:  { x: x + w,      y: y + h / 2 },
  }
}

function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

function bestAnchors(fromCard, toCard) {
  const fa = getAnchors(fromCard)
  const ta = getAnchors(toCard)
  let best = null, bestDist = Infinity
  for (const fk of Object.keys(fa)) {
    for (const tk of Object.keys(ta)) {
      const d = dist(fa[fk], ta[tk])
      if (d < bestDist) { bestDist = d; best = { from: fa[fk], to: ta[tk], fromSide: fk, toSide: tk } }
    }
  }
  return best
}

// Saubere orthogonale Bezier-Kurve
function buildPath(f, t, fromSide, toSide) {
  const dx = Math.abs(t.x - f.x)
  const dy = Math.abs(t.y - f.y)
  const tension = Math.max(60, Math.min(dx, dy) * 0.6 + 40)
  const offsets = {
    top:    { cx:  0, cy: -tension },
    bottom: { cx:  0, cy:  tension },
    left:   { cx: -tension, cy: 0 },
    right:  { cx:  tension, cy: 0 },
  }
  const fc = offsets[fromSide] || offsets.right
  const tc = offsets[toSide]   || offsets.left
  return `M${f.x},${f.y} C${f.x + fc.cx},${f.y + fc.cy} ${t.x + tc.cx},${t.y + tc.cy} ${t.x},${t.y}`
}

// ─── Card Content ─────────────────────────────────────────

function TypeBadge({ type }) {
  const labels = { note:'Note', link:'Link', image:'Image', instagram:'Instagram', chain:'Chain' }
  return <span className="font-mono text-2xs text-ss-ghost tracking-widest uppercase">{labels[type]||type}</span>
}

function CardContent({ card }) {
  switch (card.type) {
    case 'image':
      return <>
        {card.imageUrl && <div className="w-full aspect-video overflow-hidden rounded-sm mb-2"><img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover"/></div>}
        <p className="font-sans font-semibold text-sm text-ss-ink leading-tight">{card.title}</p>
        {card.description && <p className="text-xs text-ss-dim mt-1 leading-relaxed">{card.description}</p>}
      </>
    case 'note':
      return <>
        <p className="font-sans font-semibold text-sm text-ss-ink leading-snug">{card.title}</p>
        {card.description && <p className="text-xs text-ss-dim mt-1.5 leading-relaxed">{card.description}</p>}
      </>
    case 'link':
      return <>
        {card.imageUrl && <div className="w-full aspect-video overflow-hidden rounded-sm mb-2"><img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover opacity-90"/></div>}
        <p className="font-sans font-semibold text-sm text-ss-ink leading-tight">{card.title}</p>
        {card.description && <p className="text-xs text-ss-dim mt-1 leading-relaxed">{card.description}</p>}
        {card.url && <a href={card.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="font-mono text-2xs text-ss-accent hover:underline mt-1.5 block truncate">↗ {card.url.replace('https://','')}</a>}
      </>
    case 'instagram':
      return <>
        <div className="flex items-center gap-1.5 mb-1"><span className="text-base">📸</span><span className="font-mono text-2xs text-ss-ghost">Instagram</span></div>
        <p className="font-sans font-semibold text-sm text-ss-ink leading-tight">{card.title}</p>
        {card.url && <a href={card.url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} className="font-mono text-2xs text-ss-accent hover:underline mt-1.5 block truncate">↗ {card.url.replace('https://www.instagram.com/','instagram.com/')}</a>}
      </>
    case 'chain':
      return <>
        <p className="font-sans font-semibold text-sm text-ss-ink leading-tight mb-2">{card.title||'Signal Chain'}</p>
        {card.chain && <div className="flex items-center flex-wrap gap-1 p-2 rounded border border-ss-border" style={{backgroundColor:'rgba(255,255,255,0.5)'}}>
          {card.chain.filter(i=>i&&i!=='→').map((item,i,arr)=>(
            <span key={i} className="flex items-center gap-1">
              <span className="font-mono text-2xs text-ss-ink bg-white border border-ss-border px-1.5 py-0.5 rounded-sm">{item}</span>
              {i<arr.length-1 && <span className="text-ss-ghost text-xs font-mono">→</span>}
            </span>
          ))}
        </div>}
        {card.description && <p className="text-xs text-ss-dim mt-1.5">{card.description}</p>}
      </>
    default: return <p className="text-sm text-ss-ink">{card.title}</p>
  }
}

// ─── Canvas Card ──────────────────────────────────────────

function CanvasCard({ card, connectingFrom, onDragStart, onTouchStart, onConnectDotDown, onEdit, onDelete, onResize, onLockToggle }) {
  const [hovered,     setHovered]     = useState(false)
  const [hoveredSide, setHoveredSide] = useState(null) // 'top'|'bottom'|'left'|'right'
  const cardRef = useRef(null)
  const tintStyle  = getTintStyle(card)
  const cardW = card.width  || CARD_W_DEFAULT
  const locked = card.locked || false

  // Welche Seite der Card ist die Maus am nächsten?
  function detectSide(e) {
    if (!cardRef.current) return null
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const w = rect.width
    const h = rect.height
    const dLeft   = x
    const dRight  = w - x
    const dTop    = y
    const dBottom = h - y
    const min = Math.min(dLeft, dRight, dTop, dBottom)
    if (min === dTop)    return 'top'
    if (min === dBottom) return 'bottom'
    if (min === dLeft)   return 'left'
    return 'right'
  }

  function handleMouseMove(e) {
    if (!hovered) return
    setHoveredSide(detectSide(e))
  }

  // Resize mouse
  function handleResizeMouseDown(e) {
    e.stopPropagation(); e.preventDefault()
    const startX = e.clientX, startY = e.clientY
    const startW = cardW
    function onMove(ev) { onResize(card.id, Math.max(180, startW + ev.clientX - startX)) }
    function onUp()     { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // Resize touch
  function handleResizeTouchStart(e) {
    e.stopPropagation()
    if (e.touches.length !== 1) return
    const startX = e.touches[0].clientX, startW = cardW
    function onMove(ev) { if(ev.touches.length!==1)return; ev.preventDefault(); onResize(card.id, Math.max(180, startW + ev.touches[0].clientX - startX)) }
    function onEnd()    { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd) }
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)
  }

  // Dots: nur die Seite zeigen auf der die Maus ist
  const dotsConfig = {
    top:    { style: { top: -6,     left: '50%',  transform: 'translateX(-50%)' } },
    bottom: { style: { bottom: -6,  left: '50%',  transform: 'translateX(-50%)' } },
    left:   { style: { left: -6,    top:  '50%',  transform: 'translateY(-50%)' } },
    right:  { style: { right: -6,   top:  '50%',  transform: 'translateY(-50%)' } },
  }

  // Welche Dots zeigen: beim Verbinden alle, beim Hover nur die nächste Seite
  const visibleDots = connectingFrom
    ? (connectingFrom === card.id ? Object.keys(dotsConfig) : []) // Quelle zeigt alle, Ziele keine Dots
    : (hovered && hoveredSide ? [hoveredSide] : [])

  return (
    <div
      className="absolute select-none"
      style={{ left: card.position.x, top: card.position.y, width: cardW, zIndex: hovered ? 10 : 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setHoveredSide(null) }}
      onMouseMove={handleMouseMove}
      onMouseDown={e => {
        if (e.target.closest('[data-action]')) return
        if (connectingFrom || locked) return
        onDragStart(e, card.id)
      }}
      onTouchStart={e => {
        if (e.target.closest('[data-action]')) return
        if (connectingFrom || locked) return
        onTouchStart(e, card.id)
      }}
    >
      {/* Card */}
      <div
        ref={cardRef}
        className={`
          border rounded-lg p-3 flex flex-col gap-1 relative
          transition-shadow duration-200
          ${locked ? 'cursor-default' : connectingFrom && connectingFrom !== card.id ? 'ring-2 ring-ss-accent/30 cursor-crosshair shadow-md' : hovered ? 'shadow-lg cursor-grab' : 'shadow-sm cursor-grab'}
        `}
        style={tintStyle}
      >
        {/* Lock-Indikator */}
        {locked && (
          <div className="absolute top-2 right-2 text-ss-ghost/40 text-xs" title="Gesperrt">🔒</div>
        )}
        <div className="flex justify-between items-start mb-1">
          <TypeBadge type={card.type} />
          {hovered && !connectingFrom && (
            <div className="flex items-center gap-1.5" data-action="buttons">
              <button data-action="lock" onMouseDown={e=>{e.stopPropagation(); onLockToggle(card.id)}}
                className={`text-xs transition-colors ${locked ? 'text-ss-accent' : 'text-ss-ghost hover:text-ss-dim'}`} title={locked?'Entsperren':'Sperren'}>🔒</button>
              <button data-action="edit" onMouseDown={e=>{e.stopPropagation(); onEdit(card)}}
                className="text-ss-ghost hover:text-ss-ink text-xs transition-colors" title="Bearbeiten">✏️</button>
              <button data-action="delete" onMouseDown={e=>{e.stopPropagation(); onDelete(card.id)}}
                className="text-ss-ghost hover:text-red-400 text-xs transition-colors" title="Löschen">✕</button>
            </div>
          )}
        </div>
        <CardContent card={card} />

        {/* Resize-Handle unten rechts */}
        {hovered && !locked && (
          <div data-action="resize"
            className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize flex items-end justify-end p-1"
            onMouseDown={handleResizeMouseDown}
            onTouchStart={handleResizeTouchStart}
            title="Breite ändern"
          >
            <svg width="8" height="8" viewBox="0 0 8 8"><path d="M8 0 L8 8 L0 8 Z" fill="#d4d4ce"/></svg>
          </div>
        )}
      </div>

      {/* Verbindungspunkte — nur sichtbare Seite */}
      {visibleDots.map(side => (
        <div key={side} data-action="connect"
          className="absolute w-3.5 h-3.5 rounded-full flex items-center justify-center cursor-crosshair z-20 transition-all duration-100"
          style={{
            ...dotsConfig[side].style,
            backgroundColor: '#9e9e9a',
            boxShadow: '0 0 0 2px white, 0 1px 4px rgba(0,0,0,0.12)',
          }}
          onMouseDown={e=>{e.stopPropagation(); e.preventDefault(); onConnectDotDown(card.id, side)}}
          title="Verbindung ziehen"
        >
          <span style={{fontSize:8, color:'white', lineHeight:1, fontWeight:700}}>+</span>
        </div>
      ))}

      {/* Ziel-Highlight beim Verbinden */}
      {connectingFrom && connectingFrom !== card.id && hovered && (
        <div className="absolute inset-0 rounded-lg ring-2 ring-ss-accent pointer-events-none" style={{zIndex:11}} />
      )}
    </div>
  )
}

// ─── Hauptkomponente ──────────────────────────────────────

export default function BoardCanvas({ boardId, cards, connections, sections, addCard, updateCard, moveCard, deleteCard, addConnection, deleteConnection, addSection, updateSection, moveSection, deleteSection }) {
  const canvasRef        = useRef(null)
  const [dragging,       setDragging]       = useState(null)
  const [connectingFrom, setConnectingFrom] = useState(null)
  const [connectLine,    setConnectLine]    = useState(null)
  const [showAddModal,   setShowAddModal]   = useState(false)
  const [editCard,       setEditCard]       = useState(null)
  const [activeSection,  setActiveSection]  = useState(null) // Section im Vordergrund

  const CANVAS_W = Math.max(1600, ...cards.map(c => c.position.x + (c.width||CARD_W_DEFAULT) + 200), 100)
  const CANVAS_H = Math.max(1000, ...cards.map(c => c.position.y + 500), 100)

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
    return getAnchors(c)[side] || getAnchors(c).right
  }

  function handleMouseMove(e) {
    const pos = canvasPos(e.clientX, e.clientY)
    if (dragging) {
      if (dragging.sectionId) {
        const sec = sections.find(s => s.id === dragging.sectionId)
        if (sec?.locked) return
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
    if (dragging) { setDragging(null); return }
    if (connectingFrom) {
      const pos = canvasPos(e.clientX, e.clientY)
      const target = cards.find(c =>
        c.id !== connectingFrom.cardId &&
        pos.x >= c.position.x && pos.x <= c.position.x + (c.width||CARD_W_DEFAULT) &&
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
    if (!card || card.locked) return
    setDragging({ cardId, offX: pos.x - card.position.x, offY: pos.y - card.position.y })
  }

  function handleSectionDragStart(e, sectionId) {
    e.preventDefault()
    const sec = sections.find(s => s.id === sectionId)
    if (!sec || sec.locked) return
    const pos = canvasPos(e.clientX, e.clientY)
    setDragging({ sectionId, offX: pos.x - sec.position.x, offY: pos.y - sec.position.y })
  }

  function handleSectionTouchStart(e, sectionId) {
    if (e.touches.length !== 1) return
    const sec = sections.find(s => s.id === sectionId)
    if (!sec || sec.locked) return
    const t = e.touches[0]
    const pos = canvasPos(t.clientX, t.clientY)
    setDragging({ sectionId, offX: pos.x - sec.position.x, offY: pos.y - sec.position.y })
  }

  function handleTouchStart(e, cardId) {
    if (e.touches.length !== 1) return
    const t = e.touches[0]
    const pos = canvasPos(t.clientX, t.clientY)
    const card = cards.find(c => c.id === cardId)
    if (!card || card.locked) return
    setDragging({ cardId, offX: pos.x - card.position.x, offY: pos.y - card.position.y })
  }

  function handleTouchMove(e) {
    if (!dragging || e.touches.length !== 1) return
    e.preventDefault()
    const t = e.touches[0]
    const pos = canvasPos(t.clientX, t.clientY)
    if (dragging.sectionId) {
      moveSection(dragging.sectionId, Math.max(0, pos.x - dragging.offX), Math.max(0, pos.y - dragging.offY))
    } else {
      moveCard(dragging.cardId, Math.max(0, pos.x - dragging.offX), Math.max(0, pos.y - dragging.offY))
    }
  }

  function handleConnectDotDown(cardId, side) {
    setConnectingFrom({ cardId, side })
    const from = anchorPoint(cardId, side)
    setConnectLine({ x1:from.x, y1:from.y, x2:from.x, y2:from.y })
  }

  function handleResizeCard(cardId, newWidth) {
    updateCard(cardId, { width: newWidth })
  }

  function handleLockToggle(cardId) {
    const card = cards.find(c => c.id === cardId)
    if (card) updateCard(cardId, { locked: !card.locked })
  }

  // Section spawnen in Canvas-Mitte
  function handleAddSection() {
    const el = canvasRef.current
    const cx = el.scrollLeft + el.clientWidth  / 2 - 170
    const cy = el.scrollTop  + el.clientHeight / 2 - 110
    addSection(boardId, { x: cx, y: cy })
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
        <button onClick={handleAddSection}
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
        onTouchEnd={() => setDragging(null)}
        onClick={() => setActiveSection(null)}
      >
        <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>

          {/* Sections */}
          {sections.map(section => (
            <CanvasSection
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              onActivate={() => setActiveSection(section.id)}
              onDragStart={handleSectionDragStart}
              onTouchStart={handleSectionTouchStart}
              onUpdate={updateSection}
              onDelete={deleteSection}
            />
          ))}

          {/* SVG Linien */}
          <svg className="absolute inset-0 pointer-events-none" width={CANVAS_W} height={CANVAS_H} style={{zIndex:1}}>
            {connections.map(cn => {
              const fromCard = cards.find(c => c.id === cn.from)
              const toCard   = cards.find(c => c.id === cn.to)
              if (!fromCard || !toCard) return null
              const pts = bestAnchors(fromCard, toCard)
              if (!pts) return null
              const { from: f, to: t, fromSide, toSide } = pts
              const path = buildPath(f, t, fromSide, toSide)
              return (
                <g key={cn.id}>
                  <path d={path} stroke="transparent" strokeWidth="14" fill="none"
                    style={{pointerEvents:'stroke', cursor:'pointer'}} onClick={()=>deleteConnection(cn.id)} />
                  <path d={path} stroke="#c8c8c2" strokeWidth="1.5" fill="none" strokeDasharray="4 5"
                    style={{pointerEvents:'none'}} />
                  <circle cx={f.x} cy={f.y} r="2.5" fill="#c8c8c2" style={{pointerEvents:'none'}} />
                  <circle cx={t.x} cy={t.y} r="2.5" fill="#c8c8c2" style={{pointerEvents:'none'}} />
                </g>
              )
            })}
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
              connectingFrom={connectingFrom?.cardId}
              onDragStart={handleDragStart}
              onTouchStart={handleTouchStart}
              onConnectDotDown={handleConnectDotDown}
              onEdit={setEditCard}
              onDelete={deleteCard}
              onResize={handleResizeCard}
              onLockToggle={handleLockToggle}
            />
          ))}

          {cards.length === 0 && sections.length === 0 && (
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

      {showAddModal && <AddCardModal onAdd={(type,data)=>addCard(boardId,type,data)} onClose={()=>setShowAddModal(false)} />}
      {editCard    && <EditCardModal card={editCard} onSave={(id,data)=>{updateCard(id,data);setEditCard(null)}} onClose={()=>setEditCard(null)} />}
    </div>
  )
}
