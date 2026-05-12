// CanvasSection.jsx — Verschiebbare Section auf dem Canvas
// Dünner Rahmen, editierbares Label, löschbar

import { useState, useRef } from 'react'
import { CARD_TINTS } from '../data/tints.js'

const SECTION_TINTS = [
  { id: 'none',     bg: 'transparent',  border: '#d4d4ce' },
  { id: 'paper',    bg: 'rgba(250,247,242,0.6)', border: '#d8d2c8' },
  { id: 'sage',     bg: 'rgba(242,245,238,0.6)', border: '#ccdcc4' },
  { id: 'slate',    bg: 'rgba(238,241,245,0.6)', border: '#c4d0dc' },
  { id: 'amber',    bg: 'rgba(250,244,234,0.6)', border: '#dcd0bc' },
  { id: 'rose',     bg: 'rgba(247,240,240,0.6)', border: '#dcc8c8' },
]

export default function CanvasSection({ section, onDragStart, onTouchStart, onUpdate, onDelete }) {
  const [editingLabel, setEditingLabel] = useState(false)
  const [label,        setLabel]        = useState(section.label || 'Section')
  const [showTints,    setShowTints]    = useState(false)
  const inputRef = useRef()

  const tint = SECTION_TINTS.find(t => t.id === (section.tint || 'none')) || SECTION_TINTS[0]

  function commitLabel() {
    setEditingLabel(false)
    onUpdate(section.id, { label })
  }

  function handleTintPick(tintId) {
    onUpdate(section.id, { tint: tintId })
    setShowTints(false)
  }

  return (
    <div
      className="absolute"
      style={{
        left:   section.position.x,
        top:    section.position.y,
        width:  section.width,
        height: section.height,
        zIndex: 0, // hinter Cards
      }}
    >
      {/* Section-Rahmen */}
      <div
        className="w-full h-full rounded-xl border-2 border-dashed relative"
        style={{
          backgroundColor: tint.bg,
          borderColor: tint.border,
        }}
      >
        {/* Label-Leiste oben links — Drag-Handle */}
        <div
          className="absolute -top-7 left-0 flex items-center gap-1.5 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={e => { e.stopPropagation(); onDragStart(e, section.id) }}
          onTouchStart={e => { e.stopPropagation(); onTouchStart(e, section.id) }}
        >
          {/* Drag-Indikator */}
          <div className="flex flex-col gap-0.5 opacity-40 mr-0.5">
            {[0,1].map(i => (
              <div key={i} className="flex gap-0.5">
                {[0,1,2].map(j => <div key={j} className="w-1 h-1 rounded-full bg-ss-dim" />)}
              </div>
            ))}
          </div>

          {/* Editierbares Label */}
          {editingLabel ? (
            <input
              ref={inputRef}
              value={label}
              onChange={e => setLabel(e.target.value)}
              onBlur={commitLabel}
              onKeyDown={e => { if (e.key === 'Enter') commitLabel(); if (e.key === 'Escape') setEditingLabel(false) }}
              className="bg-white border border-ss-border rounded px-2 py-0.5 text-xs text-ss-ink font-sans font-medium focus:outline-none focus:border-ss-ink w-32"
              autoFocus
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <span
              className="text-xs font-sans font-medium text-ss-dim bg-white/80 rounded px-2 py-0.5 border border-ss-border/60 hover:text-ss-ink transition-colors"
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
              className="w-4 h-4 rounded-full border border-ss-border/60 hover:border-ss-muted transition-colors"
              style={{ backgroundColor: tint.bg === 'transparent' ? '#fff' : tint.bg }}
              title="Farbe"
            />
            {showTints && (
              <div className="absolute top-6 left-0 bg-white border border-ss-border rounded-lg shadow-lg p-2 flex gap-1.5 z-50">
                {SECTION_TINTS.map(t => (
                  <button key={t.id} onClick={() => handleTintPick(t.id)}
                    className={`w-5 h-5 rounded-full border-2 transition-all
                      ${section.tint === t.id ? 'border-ss-ink scale-110' : 'border-ss-border hover:scale-110'}`}
                    style={{ backgroundColor: t.bg === 'transparent' ? '#ffffff' : t.bg,
                             borderStyle: t.id === 'none' ? 'dashed' : 'solid' }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Löschen */}
          <button
            onClick={e => { e.stopPropagation(); onDelete(section.id) }}
            className="w-4 h-4 flex items-center justify-center text-ss-ghost/50 hover:text-red-400 transition-colors text-xs"
            title="Section löschen"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
