// CanvasSection.jsx — Verschiebbare + resizbare Section
// Drag am Label = verschieben
// Drag am Dreieck unten rechts = Größe ändern

import { useState, useRef, useCallback } from 'react'

const SECTION_TINTS = [
  { id: 'none',  bg: 'transparent',             border: '#d4d4ce' },
  { id: 'paper', bg: 'rgba(250,247,242,0.6)',    border: '#d8d2c8' },
  { id: 'sage',  bg: 'rgba(242,245,238,0.6)',    border: '#ccdcc4' },
  { id: 'slate', bg: 'rgba(238,241,245,0.6)',    border: '#c4d0dc' },
  { id: 'amber', bg: 'rgba(250,244,234,0.6)',    border: '#dcd0bc' },
  { id: 'rose',  bg: 'rgba(247,240,240,0.6)',    border: '#dcc8c8' },
]

const MIN_W = 180
const MIN_H = 120

export default function CanvasSection({ section, canvasRef, onDragStart, onTouchStart, onUpdate, onDelete }) {
  const [editingLabel, setEditingLabel] = useState(false)
  const [label,        setLabel]        = useState(section.label || 'Section')
  const [showTints,    setShowTints]    = useState(false)
  const resizingRef = useRef(null)

  const tint = SECTION_TINTS.find(t => t.id === (section.tint || 'none')) || SECTION_TINTS[0]

  function commitLabel() {
    setEditingLabel(false)
    onUpdate(section.id, { label })
  }

  function handleTintPick(tintId) {
    onUpdate(section.id, { tint: tintId })
    setShowTints(false)
  }

  // ─── Resize via mouse ────────────────────────────────
  function handleResizeMouseDown(e) {
    e.stopPropagation()
    e.preventDefault()
    const startX   = e.clientX
    const startY   = e.clientY
    const startW   = section.width
    const startH   = section.height

    function onMove(ev) {
      const dw = ev.clientX - startX
      const dh = ev.clientY - startY
      onUpdate(section.id, {
        width:  Math.max(MIN_W, startW + dw),
        height: Math.max(MIN_H, startH + dh),
      })
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
  }

  // ─── Resize via touch ─────────────────────────────────
  function handleResizeTouchStart(e) {
    e.stopPropagation()
    if (e.touches.length !== 1) return
    const startX = e.touches[0].clientX
    const startY = e.touches[0].clientY
    const startW = section.width
    const startH = section.height

    function onMove(ev) {
      if (ev.touches.length !== 1) return
      ev.preventDefault()
      const dw = ev.touches[0].clientX - startX
      const dh = ev.touches[0].clientY - startY
      onUpdate(section.id, {
        width:  Math.max(MIN_W, startW + dw),
        height: Math.max(MIN_H, startH + dh),
      })
    }
    function onEnd() {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend',  onEnd)
    }
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend',  onEnd)
  }

  return (
    <div
      className="absolute"
      style={{
        left:   section.position.x,
        top:    section.position.y,
        width:  section.width  || 340,
        height: section.height || 220,
        zIndex: 0,
      }}
    >
      {/* Rahmen */}
      <div
        className="w-full h-full rounded-xl border-2 border-dashed relative group/section"
        style={{ backgroundColor: tint.bg, borderColor: tint.border }}
      >

        {/* Resize-Handle — unten rechts */}
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-end justify-end p-1 opacity-0 group-hover/section:opacity-100 transition-opacity"
          onMouseDown={handleResizeMouseDown}
          onTouchStart={handleResizeTouchStart}
          title="Größe ändern"
        >
          {/* Dreieck-Icon */}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M10 0 L10 10 L0 10 Z" fill={tint.border || '#d4d4ce'} />
          </svg>
        </div>

        {/* Section-Größe als Hint */}
        <div className="absolute bottom-1.5 left-3 opacity-0 group-hover/section:opacity-100 transition-opacity">
          <span className="font-mono text-2xs text-ss-ghost/50">
            {Math.round(section.width || 340)} × {Math.round(section.height || 220)}
          </span>
        </div>
      </div>

      {/* Label-Leiste — oben, außerhalb des Rahmens */}
      <div className="absolute -top-7 left-0 flex items-center gap-1.5 select-none">
        {/* Drag-Handle */}
        <div
          className="flex flex-col gap-0.5 opacity-30 hover:opacity-60 cursor-grab active:cursor-grabbing transition-opacity mr-0.5 pt-0.5"
          onMouseDown={e => { e.stopPropagation(); onDragStart(e, section.id) }}
          onTouchStart={e => { e.stopPropagation(); onTouchStart(e, section.id) }}
        >
          {[0,1].map(i => (
            <div key={i} className="flex gap-0.5">
              {[0,1,2].map(j => <div key={j} className="w-1 h-1 rounded-full bg-ss-dim" />)}
            </div>
          ))}
        </div>

        {/* Label */}
        {editingLabel ? (
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            onBlur={commitLabel}
            onKeyDown={e => {
              if (e.key === 'Enter') commitLabel()
              if (e.key === 'Escape') setEditingLabel(false)
            }}
            className="bg-white border border-ss-border rounded px-2 py-0.5 text-xs text-ss-ink font-sans font-medium focus:outline-none focus:border-ss-ink w-32"
            autoFocus
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span
            className="text-xs font-sans font-medium text-ss-dim bg-white/80 rounded px-2 py-0.5 border border-ss-border/60 hover:text-ss-ink transition-colors cursor-default"
            onDoubleClick={e => { e.stopPropagation(); setEditingLabel(true) }}
            title="Doppelklick zum Umbenennen"
          >
            {label}
          </span>
        )}

        {/* Tint-Picker */}
        <div className="relative">
          <button
            onClick={e => { e.stopPropagation(); setShowTints(s => !s) }}
            className="w-3.5 h-3.5 rounded-full border border-ss-border/60 hover:border-ss-muted transition-colors"
            style={{ backgroundColor: tint.bg === 'transparent' ? '#f5f2ed' : tint.bg.replace('0.6', '1') }}
            title="Farbe"
          />
          {showTints && (
            <div className="absolute top-6 left-0 bg-white border border-ss-border rounded-lg shadow-lg p-2 flex gap-1.5 z-50">
              {SECTION_TINTS.map(t => (
                <button key={t.id} onClick={() => handleTintPick(t.id)}
                  className={`w-5 h-5 rounded-full border-2 transition-all
                    ${(section.tint || 'none') === t.id ? 'border-ss-ink scale-110' : 'border-ss-border hover:scale-110'}`}
                  style={{
                    backgroundColor: t.bg === 'transparent' ? '#ffffff' : t.bg.replace('0.6','1'),
                    borderStyle: t.id === 'none' ? 'dashed' : 'solid',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Löschen */}
        <button
          onClick={e => { e.stopPropagation(); onDelete(section.id) }}
          className="w-4 h-4 flex items-center justify-center text-ss-ghost/40 hover:text-red-400 transition-colors text-xs"
          title="Section löschen"
        >✕</button>
      </div>
    </div>
  )
}
