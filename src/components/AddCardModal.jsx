// AddCardModal.jsx — Modal zum Erstellen neuer Cards
import { useState, useRef } from 'react'

const TYPES = [
  { id: 'note',      icon: '✏️', label: 'Note',          desc: 'Eigener Text' },
  { id: 'link',      icon: '🔗', label: 'Link',          desc: 'URL / Website' },
  { id: 'image',     icon: '🖼️', label: 'Bild',          desc: 'Bild hochladen' },
  { id: 'instagram', icon: '📸', label: 'Instagram',     desc: 'Post-URL' },
  { id: 'chain',     icon: '⛓', label: 'Effektkette',   desc: 'Signal Chain' },
]

export default function AddCardModal({ onAdd, onClose }) {
  const [step, setStep]       = useState('type') // 'type' | 'form'
  const [type, setType]       = useState(null)
  const [title, setTitle]     = useState('')
  const [description, setDesc] = useState('')
  const [url, setUrl]         = useState('')
  const [imageData, setImage] = useState(null)
  const [chain, setChain]     = useState(['', '→', '', '→', ''])
  const fileRef               = useRef()

  function handleTypeSelect(t) {
    setType(t)
    setStep('form')
  }

  function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setImage(ev.target.result)
    reader.readAsDataURL(file)
  }

  function handleSubmit() {
    if (!title.trim() && type !== 'chain') return
    const data = { title: title.trim(), description }
    if (type === 'link')      data.url = url
    if (type === 'instagram') data.url = url
    if (type === 'image')     data.imageUrl = imageData
    if (type === 'chain')     data.chain = chain
    onAdd(type, data)
    onClose()
  }

  function updateChainItem(i, val) {
    setChain(c => { const n = [...c]; n[i] = val; return n })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ss-border">
          <div className="flex items-center gap-2">
            {step === 'form' && (
              <button onClick={() => setStep('type')} className="text-ss-ghost hover:text-ss-ink text-sm mr-1">←</button>
            )}
            <h2 className="font-sans font-semibold text-ss-ink text-sm">
              {step === 'type' ? 'Neuen Signal hinzufügen' : `${TYPES.find(t => t.id === type)?.label} erstellen`}
            </h2>
          </div>
          <button onClick={onClose} className="text-ss-ghost hover:text-ss-ink text-lg leading-none">×</button>
        </div>

        {/* Step 1: Typ wählen */}
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

        {/* Step 2: Formular */}
        {step === 'form' && (
          <div className="p-5 flex flex-col gap-4">

            {/* Titel (außer Chain) */}
            {type !== 'chain' && (
              <div>
                <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Titel</label>
                <input value={title} onChange={e => setTitle(e.target.value)}
                  placeholder={type === 'instagram' ? 'z.B. Studio Setup' : 'Titel eingeben...'}
                  className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink placeholder-ss-ghost focus:outline-none focus:border-ss-ink transition-colors" />
              </div>
            )}

            {/* Beschreibung (Note, Link) */}
            {(type === 'note' || type === 'link') && (
              <div>
                <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Text / Notiz</label>
                <textarea value={description} onChange={e => setDesc(e.target.value)}
                  rows={4} placeholder="Notiz eingeben..."
                  className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink placeholder-ss-ghost focus:outline-none focus:border-ss-ink transition-colors resize-none" />
              </div>
            )}

            {/* URL (Link, Instagram) */}
            {(type === 'link' || type === 'instagram') && (
              <div>
                <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">
                  {type === 'instagram' ? 'Instagram Post URL' : 'URL'}
                </label>
                <input value={url} onChange={e => setUrl(e.target.value)}
                  placeholder={type === 'instagram' ? 'https://instagram.com/p/...' : 'https://...'}
                  className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink placeholder-ss-ghost focus:outline-none focus:border-ss-ink transition-colors font-mono" />
              </div>
            )}

            {/* Bild Upload */}
            {type === 'image' && (
              <div>
                <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Bild</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                {imageData
                  ? <div className="relative">
                      <img src={imageData} alt="" className="w-full h-40 object-cover rounded-lg border border-ss-border" />
                      <button onClick={() => setImage(null)}
                        className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 text-xs flex items-center justify-center border border-ss-border hover:bg-ss-surface">×</button>
                    </div>
                  : <button onClick={() => fileRef.current.click()}
                      className="w-full h-32 border-2 border-dashed border-ss-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-ss-muted transition-colors">
                      <span className="text-2xl">🖼️</span>
                      <span className="text-xs text-ss-ghost">Klicken zum Hochladen</span>
                    </button>
                }
              </div>
            )}

            {/* Signal Chain */}
            {type === 'chain' && (
              <div>
                <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Effektkette</label>
                <p className="text-xs text-ss-ghost mb-3">Geräte/Effekte in Reihenfolge eintragen</p>
                <div className="flex flex-col gap-2">
                  {[0, 2, 4].map(i => (
                    <div key={i} className="flex items-center gap-2">
                      <input value={chain[i]} onChange={e => updateChainItem(i, e.target.value)}
                        placeholder={`Gerät ${Math.floor(i/2)+1}`}
                        className="flex-1 border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink placeholder-ss-ghost focus:outline-none focus:border-ss-ink" />
                      {i < 4 && <span className="text-ss-ghost text-sm font-mono">→</span>}
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Notiz (optional)</label>
                  <input value={description} onChange={e => setDesc(e.target.value)}
                    placeholder="z.B. Pre-Delay 40ms, Room size 80%"
                    className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink placeholder-ss-ghost focus:outline-none focus:border-ss-ink" />
                </div>
              </div>
            )}

            {/* Submit */}
            <button onClick={handleSubmit}
              disabled={type !== 'chain' && !title.trim()}
              className="w-full py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-1">
              Signal hinzufügen
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
