// EditCardModal.jsx — Signal verfeinern + Farbe wählen (Note & Chain)
import { useState, useRef } from 'react'
import { CARD_TINTS } from '../data/tints.js'
import { PatternForm } from './PatternCard.jsx'

const TINTABLE = ['note', 'chain']
const URL_TYPES = ['link', 'instagram', 'youtube']

export default function EditCardModal({ card, onSave, onClose }) {
  const [title,       setTitle]  = useState(card.title || '')
  const [description, setDesc]   = useState(card.description || '')
  const [url,         setUrl]    = useState(card.url || '')
  const [imageData,   setImage]  = useState(card.imageUrl || null)
  const [tint,        setTint]   = useState(card.tint || 'none')
  const [dragOver,    setDragOver] = useState(false)
  const [chainItems,  setChain]  = useState(
    card.chain ? card.chain.filter(i => i !== '→') : ['', '']
  )
  // Pattern state — initialisiert aus card
  const [patternData, setPatternData] = useState({
    notes:       card.notes       || '',
    bpm:         card.bpm         || '',
    scale:       card.scale       || '',
    description: card.description || '',
    title:       card.title       || '',
  })
  const fileRef = useRef()

  function processFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = ev => setImage(ev.target.result)
    reader.readAsDataURL(file)
  }

  function addChainItem()       { setChain(c => [...c, '']) }
  function removeChainItem(i)   { setChain(c => c.filter((_,idx) => idx !== i)) }
  function updateChainItem(i,v) { setChain(c => { const n=[...c]; n[i]=v; return n }) }

  function handleSave() {
    if (card.type === 'pattern') {
      onSave(card.id, { ...patternData, title: patternData.title || 'Pattern' })
      return
    }
    const updates = { title, description }
    if (TINTABLE.includes(card.type)) updates.tint = tint
    if (URL_TYPES.includes(card.type)) updates.url = url
    if (card.type === 'link' || card.type === 'image') updates.imageUrl = imageData
    if (card.type === 'chain') {
      const filled = chainItems.filter(Boolean)
      updates.chain = filled.reduce((acc, item, i) => {
        acc.push(item)
        if (i < filled.length - 1) acc.push('→')
        return acc
      }, [])
    }
    onSave(card.id, updates)
  }

  const canTint = TINTABLE.includes(card.type)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="rounded-xl shadow-2xl w-full max-w-md mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: canTint ? (CARD_TINTS.find(t => t.id === tint)?.bg || '#ffffff') : '#ffffff' }}>

        <div className="flex items-center justify-between px-5 py-4 border-b border-ss-border sticky top-0 rounded-t-xl"
          style={{ backgroundColor: canTint ? (CARD_TINTS.find(t => t.id === tint)?.bg || '#ffffff') : '#ffffff' }}>
          <h2 className="font-sans font-semibold text-ss-ink text-sm">
            Refine Signal
            <span className="ml-2 font-mono text-2xs text-ss-ghost uppercase">{card.type} signal</span>
          </h2>
          <button onClick={onClose} className="text-ss-ghost hover:text-ss-ink text-lg leading-none">×</button>
        </div>

        <div className="p-5 flex flex-col gap-4">

          {/* Titel */}
          {card.type !== 'chain' && (
            <div>
              <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Titel</label>
              <input value={title} onChange={e => setTitle(e.target.value)}
                className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink focus:outline-none focus:border-ss-ink transition-colors bg-white/60" />
            </div>
          )}

          {/* Beschreibung */}
          {(card.type === 'note' || card.type === 'link' || card.type === 'chain' || card.type === 'youtube') && (
            <div>
              <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">
                {card.type === 'note' ? 'Text' : 'Notiz'}
              </label>
              <textarea value={description} onChange={e => setDesc(e.target.value)}
                rows={card.type === 'note' ? 8 : 2}
                className="w-full border border-ss-border rounded-lg px-4 py-3 text-sm text-ss-ink focus:outline-none focus:border-ss-ink transition-colors resize-none leading-relaxed bg-white/60" />
            </div>
          )}

          {/* URL */}
          {URL_TYPES.includes(card.type) && (
            <div>
              <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">URL</label>
              <input value={url} onChange={e => setUrl(e.target.value)}
                className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink font-mono focus:outline-none focus:border-ss-ink transition-colors bg-white/60" />
            </div>
          )}

          {/* Bild für Link-Cards */}
          {card.type === 'link' && (
            <div>
              <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">
                Vorschaubild <span className="font-normal text-ss-ghost normal-case">(optional)</span>
              </label>
              <input ref={fileRef} type="file" accept="image/*" onChange={e => processFile(e.target.files[0])} className="hidden" />
              {imageData ? (
                <div className="relative">
                  <img src={imageData} alt="" className="w-full h-32 object-cover rounded-lg border border-ss-border" />
                  <button onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 text-xs flex items-center justify-center border border-ss-border hover:bg-ss-surface shadow-sm">×</button>
                </div>
              ) : (
                <div
                  onDragOver={e=>{e.preventDefault();setDragOver(true)}}
                  onDragLeave={e=>{e.preventDefault();setDragOver(false)}}
                  onDrop={e=>{e.preventDefault();setDragOver(false);processFile(e.dataTransfer.files[0])}}
                  onClick={() => fileRef.current.click()}
                  className={`w-full h-20 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${dragOver ? 'border-ss-accent bg-ss-accentBg' : 'border-ss-border hover:border-ss-muted hover:bg-ss-surface'}`}>
                  <span className="text-ss-ghost text-sm">🖼️</span>
                  <span className="text-xs text-ss-ghost">Bild droppen oder klicken</span>
                </div>
              )}
            </div>
          )}

          {/* Bild */}
          {card.type === 'image' && (
            <div>
              <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Beschreibung</label>
              <textarea value={description} onChange={e => setDesc(e.target.value)}
                rows={3}
                className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink focus:outline-none focus:border-ss-ink transition-colors resize-none bg-white/60" />
            </div>
          )}

          {/* Chain Editor */}
          {card.type === 'chain' && (
            <div>
              <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Signal Chain</label>
              <div className="flex items-center flex-wrap gap-1.5 p-3 rounded-lg border border-ss-border mb-3 bg-white/40">
                {chainItems.filter(Boolean).map((item, i, arr) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="font-mono text-xs text-ss-ink bg-white border border-ss-border px-2 py-0.5 rounded">{item}</span>
                    {i < arr.length - 1 && <span className="text-ss-ghost text-sm">→</span>}
                  </span>
                ))}
                {chainItems.filter(Boolean).length === 0 && <span className="text-xs text-ss-ghost">noch leer</span>}
              </div>
              <div className="flex flex-col gap-2">
                {chainItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-ss-ghost text-sm font-mono flex-shrink-0">→</span>}
                    {i === 0 && <span className="opacity-0 text-sm font-mono flex-shrink-0">→</span>}
                    <input value={item} onChange={e => updateChainItem(i, e.target.value)}
                      placeholder={`Node / effect ${i + 1}`}
                      className="flex-1 border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink focus:outline-none focus:border-ss-ink bg-white/60" />
                    {chainItems.length > 2 && (
                      <button onClick={() => removeChainItem(i)} className="text-ss-ghost hover:text-red-400 text-xs flex-shrink-0">✕</button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addChainItem}
                className="mt-3 flex items-center gap-1.5 text-xs text-ss-dim hover:text-ss-ink transition-colors border border-dashed border-ss-border rounded-lg px-3 py-2 w-full justify-center hover:border-ss-muted bg-white/30">
                + Add node / effect
              </button>
            </div>
          )}

          {/* ─── PATTERN ─── */}
          {card.type === 'pattern' && (
            <PatternForm data={patternData} onChange={setPatternData} />
          )}

          <button onClick={handleSave}
            className="w-full py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors mt-1">
            Keep Signal
          </button>

          {/* Farbe ganz unten */}
          {canTint && (
            <div className="pt-2 border-t border-ss-border/50">
              <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-2">Farbe</label>
              <div className="flex items-center gap-2">
                {CARD_TINTS.map(t => (
                  <button key={t.id} onClick={() => setTint(t.id)} title={t.label}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-150
                      ${tint === t.id ? 'scale-125 border-ss-ink' : 'border-ss-border hover:border-ss-muted hover:scale-110'}`}
                    style={{ backgroundColor: t.bg }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
