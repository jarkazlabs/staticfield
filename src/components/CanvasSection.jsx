// CanvasSection.jsx
// - isActive = Vordergrund beim Bearbeiten
// - Lock-Funktion
// - Resize-Handle unten rechts

import { useState } from 'react'

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

export default function CanvasSection({ section, isActive, onActivate, onDragStart, onTouchStart, onUpdate, onDelete, onLockToggle, onInteractionStart, onInteractionEnd }) {
  const [editingLabel, setEditingLabel] = useState(false)
  const defaultLabel = !section.label || section.label === 'Section' ? 'Field Area' : section.label
  const [label,        setLabel]        = useState(defaultLabel)
  const [showTints,    setShowTints]    = useState(false)

  const tint   = SECTION_TINTS.find(t => t.id === (section.tint || 'none')) || SECTION_TINTS[0]
  const locked = section.locked || false

  // Active areas sit above focused or hovered signals so their controls stay reachable.
  const zIndex = isActive ? 35 : 0

  function commitLabel() { setEditingLabel(false); onUpdate(section.id, { label }) }

  function handleTintPick(tintId) { onUpdate(section.id, { tint: tintId }); setShowTints(false) }

  function handleLockToggle(e) { e.stopPropagation(); onLockToggle(section.id) }

  // Resize mouse
  function handleResizeMouseDown(e) {
    e.stopPropagation(); e.preventDefault()
    onInteractionStart()
    const startX = e.clientX, startY = e.clientY
    const startW = section.width || 340, startH = section.height || 220
    function onMove(ev) {
      onUpdate(section.id, {
        width:  Math.max(MIN_W, startW + ev.clientX - startX),
        height: Math.max(MIN_H, startH + ev.clientY - startY),
      })
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      onInteractionEnd()
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // Resize touch
  function handleResizeTouchStart(e) {
    e.stopPropagation()
    if (e.touches.length !== 1) return
    onInteractionStart()
    const startX = e.touches[0].clientX, startY = e.touches[0].clientY
    const startW = section.width || 340,  startH = section.height || 220
    function onMove(ev) {
      if (ev.touches.length !== 1) return; ev.preventDefault()
      onUpdate(section.id, {
        width:  Math.max(MIN_W, startW + ev.touches[0].clientX - startX),
        height: Math.max(MIN_H, startH + ev.touches[0].clientY - startY),
      })
    }
    function onEnd() {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
      onInteractionEnd()
    }
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onEnd)
  }

  return (
    <div
      className="absolute"
      style={{
        left:   section.position.x,
        top:    section.position.y,
        width:  section.width  || 340,
        height: section.height || 220,
        zIndex,
      }}
      onClick={e => { e.stopPropagation(); onActivate() }}
    >
      {/* Rahmen */}
      <div
        className="w-full h-full rounded-xl border-2 border-dashed relative group/section"
        style={{ backgroundColor: tint.bg, borderColor: locked ? '#c8c8c2' : tint.border }}
      >
        {/* Resize-Handle */}
        {!locked && (
          <div
            className="absolute bottom-0 right-0 w-7 h-7 cursor-se-resize flex items-end justify-end p-1.5 opacity-0 group-hover/section:opacity-100 transition-opacity"
            onMouseDown={handleResizeMouseDown}
            onTouchStart={handleResizeTouchStart}
            title="Resize field area"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M10 0 L10 10 L0 10 Z" fill={tint.border || '#d4d4ce'} />
            </svg>
          </div>
        )}
      </div>

      {/* Label-Leiste — außerhalb des Rahmens oben */}
      <div className="absolute -top-7 left-0 flex items-center gap-1.5 select-none">

        {/* Drag-Handle — nur wenn nicht gesperrt */}
        {!locked ? (
          <div
            className="flex flex-col gap-0.5 opacity-30 hover:opacity-70 cursor-grab active:cursor-grabbing transition-opacity mr-0.5 pt-0.5"
            onMouseDown={e => { e.stopPropagation(); onActivate(); onDragStart(e, section.id) }}
            onTouchStart={e => { e.stopPropagation(); onTouchStart(e, section.id) }}
          >
            {[0,1].map(i => (
              <div key={i} className="flex gap-0.5">
                {[0,1,2].map(j => <div key={j} className="w-1 h-1 rounded-full bg-ss-dim" />)}
              </div>
            ))}
          </div>
        ) : (
          <div className="w-4 mr-0.5" /> // Platzhalter
        )}

        {/* Editierbares Label */}
        {editingLabel ? (
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            onBlur={commitLabel}
            onKeyDown={e => { if (e.key==='Enter') commitLabel(); if (e.key==='Escape') setEditingLabel(false) }}
            className="bg-white border border-ss-border rounded px-2 py-0.5 text-xs text-ss-ink font-sans font-medium focus:outline-none focus:border-ss-ink w-32"
            autoFocus
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span
            className={`text-xs font-sans font-medium rounded px-2 py-0.5 border transition-colors
              ${isActive ? 'bg-white border-ss-border text-ss-ink' : 'bg-white/80 border-ss-border/60 text-ss-dim hover:text-ss-ink'}
              ${!locked ? 'cursor-default' : 'cursor-default'}`}
            onDoubleClick={e => { if(!locked){ e.stopPropagation(); setEditingLabel(true) } }}
            title={locked ? "Locked" : "Double-click to rename"}
          >
            {label}
          </span>
        )}

        {/* Tint-Picker */}
        {!locked && (
          <div className="relative">
            <button
              onClick={e => { e.stopPropagation(); setShowTints(s => !s) }}
              className="w-3.5 h-3.5 rounded-full border border-ss-border/60 hover:border-ss-muted transition-colors"
              style={{ backgroundColor: tint.bg === 'transparent' ? '#f5f2ed' : tint.bg.replace('0.6','1') }}
              title="Tone"
            />
            {showTints && (
              <div className="absolute top-6 left-0 bg-white border border-ss-border rounded-lg shadow-lg p-2 flex gap-1.5 z-50"
                onClick={e => e.stopPropagation()}>
                {SECTION_TINTS.map(t => (
                  <button key={t.id} onClick={() => handleTintPick(t.id)}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${(section.tint||'none')===t.id ? 'border-ss-ink scale-110' : 'border-ss-border hover:scale-110'}`}
                    style={{ backgroundColor: t.bg==='transparent' ? '#ffffff' : t.bg.replace('0.6','1'), borderStyle: t.id==='none' ? 'dashed' : 'solid' }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lock */}
        <button
          onClick={handleLockToggle}
          className={`text-xs transition-colors ${locked ? 'text-red-400' : 'text-ss-ghost/40 hover:text-ss-ghost'}`}
          title={locked ? 'Unlock field area' : 'Lock field area'}
        >
          {locked ? '🔒' : '🔓'}
        </button>

        {/* Löschen */}
        {!locked && (
          <button
            onClick={e => { e.stopPropagation(); onDelete(section.id) }}
            className="text-ss-ghost/40 hover:text-red-400 transition-colors text-xs"
            title="Remove field area"
          >✕</button>
        )}
      </div>
    </div>
  )
}
