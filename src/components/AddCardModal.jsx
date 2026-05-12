// AddCardModal.jsx — Mit Drag & Drop Bild-Upload + größeres Note-Feld + Farbe unten

import { useState, useRef } from 'react'
import { CARD_TINTS } from '../data/tints.js'

const TYPES = [
  { id: 'note',      icon: '✏️', label: 'Note',        desc: 'Eigener Text' },
  { id: 'link',      icon: '🔗', label: 'Link',        desc: 'URL / Website' },
  { id: 'image',     icon: '🖼️', label: 'Bild',        desc: 'Bild hochladen oder droppen' },
  { id: 'instagram', icon: '📸', label: 'Instagram',   desc: 'Post-URL' },
  { id: 'chain', icon: '⛓',  label: 'Signal-Chain', desc: 'Signal Chain' },
]

export default function AddCardModal({ onAdd, onClose }) {
  const [step,       setStep]   = useState('type')
  const [type,       setType]   = useState(null)
  const [title,      setTitle]  = useState('')
  const [description,setDesc]   = useState('')
  const [url,        setUrl]    = useState('')
  const [imageData,  setImage]  = useState(null)
  const [tint,       setTint]   = useState('none')
  const [chain,      setChain]  = useState(['', '', ''])
  const [dragOver,   setDragOver] = useState(false)
  const fileRef = useRef()

  function handleTypeSelect(t) { setType(t); setStep('form') }

  function processFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = ev => setImage(ev.target.result)
    reader.readAsDataURL(file)
  }

  function handleImageUpload(e) { processFile(e.target.files[0]) }

  // Drag & Drop Handler
  function handleDragOver(e)  { e.preventDefault(); setDragOver(true) }
  function handleDragLeave(e) { e.preventDefault(); setDragOver(false) }
  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    processFile(file)
  }

  function addChainItem()       { setChain(c => [...c, '']) }
  function removeChainItem(i)   { setChain(c => c.filter((_, idx) => idx !== i)) }
  function updateChainItem(i,v) { setChain(c => { const n=[...c]; n[i]=v; return n }) }

  function handleSubmit() {
    const data = { title: title.trim(), description }
    if (type === 'note' || type === 'chain') data.tint = tint
    if (type === 'link' || type === 'instagram') data.url = url
    if (type === 'image' || type === 'link') data.imageUrl = imageData
    if (type === 'chain') {
      const filled = chain.filter(Boolean)
      data.chain = filled.reduce((acc, item, i) => {
        acc.push(item)
        if (i < filled.length - 1) acc.push('→')
        return acc
      }, [])
      data.title = data.title || 'Signal Chain'
    }
    onAdd(type, data)
    onClose()
  }

  const canSubmit = type === 'chain'
    ? chain.some(Boolean)
    : type === 'image' ? !!imageData : !!title.trim()

  const currentTintBg = CARD_TINTS.find(t => t.id === tint)?.bg || '#ffffff'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="rounded-xl shadow-2xl w-full max-w-md mx-4 max-h-[92vh] overflow-y-auto"
        style={{ backgroundColor: (type === 'note' || type === 'chain') ? currentTintBg : '#ffffff' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ss-border sticky top-0 rounded-t-xl z-10"
          style={{ backgroundColor: (type === 'note' || type === 'chain') ? currentTintBg : '#ffffff' }}>
          <div className="flex items-center gap-2">
            {step === 'form' && (
              <button onClick={() => setStep('type')} className="text-ss-ghost hover:text-ss-ink text-sm mr-1">←</button>
            )}
            <h2 className="font-sans font-semibold text-ss-ink text-sm">
              {step === 'type' ? 'Signal hinzufügen' : TYPES.find(t => t.id === type)?.label}
            </h2>
          </div>
          <button onClick={onClose} className="text-ss-ghost hover:text-ss-ink text-lg leading-none">×</button>
        </div>

        {/* Typ-Auswahl */}
        {step === 'type' && (
          <div className="p-4 grid grid-cols-1 gap-2">
            {TYPES.map(t => (
              <button key={t.id} onClick={() => handleTypeSelect(t.id)}
                className="flex items-center gap-3 p-3 rounded-lg border border-ss-border hover:border-ss-muted hover:bg-ss-surface transition-all text-left group">
                <span className="text-xl w-8 text-center">{t.icon}</span>
                <div>
                  <p className="font-sans font-semibold text-ss-ink text-sm">{t.label}</p>
                  <p className="text-xs text-ss-ghost">{t.desc}</p>
                </div>
                <span className="ml-auto text-ss-ghost group-hover:text-ss-dim">→</span>
              </button>
            ))}
          </div>
        )}

        {/* Formular */}
        {step === 'form' && (
          <div className="p-5 flex flex-col gap-4">

            {/* ─── NOTE ─── */}
            {type === 'note' && (
              <>
                {/* Titel */}
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Titel</label>
                  <input value={title} onChange={e => setTitle(e.target.value)}
                    placeholder="Titel eingeben..."
                    className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink placeholder-ss-ghost focus:outline-none focus:border-ss-ink bg-white/60" />
                </div>
                {/* Großes Textfeld */}
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Text</label>
                  <textarea value={description} onChange={e => setDesc(e.target.value)}
                    rows={8}
                    placeholder="Notiz, Gedanke, Beobachtung..."
                    className="w-full border border-ss-border rounded-lg px-4 py-3 text-sm text-ss-ink placeholder-ss-ghost/60 focus:outline-none focus:border-ss-ink transition-colors resize-none leading-relaxed bg-white/60" />
                </div>
                {/* Farbe ganz unten */}
                <div className="pt-2 border-t border-ss-border/50">
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-2">Farbe</label>
                  <div className="flex items-center gap-2">
                    {CARD_TINTS.map(t => (
                      <button key={t.id} onClick={() => setTint(t.id)} title={t.label}
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-150
                          ${tint === t.id ? 'scale-125 border-ss-ink' : 'border-ss-border hover:scale-110 hover:border-ss-muted'}`}
                        style={{ backgroundColor: t.bg }} />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ─── LINK ─── */}
            {type === 'link' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Titel</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titel eingeben..."
                    className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink focus:outline-none focus:border-ss-ink" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">URL</label>
                  <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..."
                    className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink font-mono focus:outline-none focus:border-ss-ink" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Beschreibung</label>
                  <textarea value={description} onChange={e => setDesc(e.target.value)} rows={2}
                    placeholder="Optional..."
                    className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink focus:outline-none focus:border-ss-ink resize-none" />
                </div>
                {/* Optionales Vorschaubild */}
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Vorschaubild <span className="font-normal text-ss-ghost normal-case">(optional)</span></label>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {imageData ? (
                    <div className="relative">
                      <img src={imageData} alt="" className="w-full h-32 object-cover rounded-lg border border-ss-border" />
                      <button onClick={() => setImage(null)}
                        className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 text-xs flex items-center justify-center border border-ss-border hover:bg-ss-surface shadow-sm">×</button>
                    </div>
                  ) : (
                    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                      onClick={() => fileRef.current.click()}
                      className={`w-full h-20 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${dragOver ? 'border-ss-accent bg-ss-accentBg' : 'border-ss-border hover:border-ss-muted hover:bg-ss-surface'}`}>
                      <span className="text-ss-ghost text-sm">🖼️</span>
                      <span className="text-xs text-ss-ghost">Bild droppen oder klicken</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ─── INSTAGRAM ─── */}
            {type === 'instagram' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Titel</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="z.B. Studio Setup"
                    className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink focus:outline-none focus:border-ss-ink" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Instagram Post URL</label>
                  <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://instagram.com/p/..."
                    className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink font-mono focus:outline-none focus:border-ss-ink" />
                </div>
              </>
            )}

            {/* ─── BILD — Drag & Drop ─── */}
            {type === 'image' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Titel</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titel eingeben..."
                    className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink focus:outline-none focus:border-ss-ink" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Bild</label>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

                  {imageData ? (
                    <div className="relative">
                      <img src={imageData} alt="" className="w-full h-48 object-cover rounded-lg border border-ss-border" />
                      <button onClick={() => setImage(null)}
                        className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 text-xs flex items-center justify-center border border-ss-border hover:bg-ss-surface shadow-sm">
                        ×
                      </button>
                    </div>
                  ) : (
                    /* Drag & Drop Zone */
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileRef.current.click()}
                      className={`
                        w-full h-44 border-2 border-dashed rounded-xl
                        flex flex-col items-center justify-center gap-3
                        cursor-pointer transition-all duration-200
                        ${dragOver
                          ? 'border-ss-accent bg-ss-accentBg scale-[1.01]'
                          : 'border-ss-border hover:border-ss-muted hover:bg-ss-surface'
                        }
                      `}
                    >
                      <div className={`text-3xl transition-transform duration-200 ${dragOver ? 'scale-125' : ''}`}>
                        🖼️
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-ss-dim font-medium">
                          {dragOver ? 'Loslassen zum Hochladen' : 'Bild hier hineinziehen'}
                        </p>
                        <p className="text-xs text-ss-ghost mt-1">oder klicken zum Auswählen</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Beschreibung</label>
                  <textarea value={description} onChange={e => setDesc(e.target.value)} rows={2}
                    placeholder="Optional..."
                    className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink focus:outline-none focus:border-ss-ink resize-none" />
                </div>
              </>
            )}

            {/* ─── CHAIN ─── */}
            {type === 'chain' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Signal-Chain</label>
                  {/* Vorschau */}
                  <div className="flex items-center flex-wrap gap-1.5 p-3 bg-white/50 rounded-lg border border-ss-border mb-3 min-h-[44px]">
                    {chain.filter(Boolean).map((item, i, arr) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="font-mono text-xs text-ss-ink bg-white border border-ss-border px-2 py-0.5 rounded">{item}</span>
                        {i < arr.length - 1 && <span className="text-ss-ghost text-sm">→</span>}
                      </span>
                    ))}
                    {!chain.some(Boolean) && <span className="text-xs text-ss-ghost">noch leer</span>}
                  </div>
                  {/* Inputs */}
                  <div className="flex flex-col gap-2">
                    {chain.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {i > 0 && <span className="text-ss-ghost text-sm font-mono flex-shrink-0">→</span>}
                        {i === 0 && <span className="opacity-0 text-sm font-mono flex-shrink-0">→</span>}
                        <input value={item} onChange={e => updateChainItem(i, e.target.value)}
                          placeholder={`Gerät / Effekt ${i + 1}`}
                          className="flex-1 border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink focus:outline-none focus:border-ss-ink bg-white/60" />
                        {chain.length > 2 && (
                          <button onClick={() => removeChainItem(i)} className="text-ss-ghost hover:text-red-400 text-xs flex-shrink-0">✕</button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button onClick={addChainItem}
                    className="mt-2 flex items-center gap-1.5 text-xs text-ss-dim hover:text-ss-ink transition-colors border border-dashed border-ss-border rounded-lg px-3 py-2 w-full justify-center hover:border-ss-muted bg-white/30">
                    + Gerät hinzufügen
                  </button>
                </div>
                {/* Farbe ganz unten */}
                <div className="pt-2 border-t border-ss-border/50">
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-2">Farbe</label>
                  <div className="flex items-center gap-2">
                    {CARD_TINTS.map(t => (
                      <button key={t.id} onClick={() => setTint(t.id)} title={t.label}
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-150
                          ${tint === t.id ? 'scale-125 border-ss-ink' : 'border-ss-border hover:scale-110 hover:border-ss-muted'}`}
                        style={{ backgroundColor: t.bg }} />
                    ))}
                  </div>
                </div>
              </>
            )}

            <button onClick={handleSubmit} disabled={!canSubmit}
              className="w-full py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-1">
              Signal hinzufügen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
