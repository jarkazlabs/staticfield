// AddBoardModal.jsx — Neues Field/Board erstellen
import { useState } from 'react'

export default function AddBoardModal({ onAdd, onClose, label = 'Field' }) {
  const [title, setTitle] = useState('')
  const [description, setDesc] = useState('')

  function handleSubmit() {
    if (!title.trim()) return
    onAdd(title.trim(), description.trim())
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ss-border">
          <h2 className="font-sans font-semibold text-ss-ink text-sm">New {label}</h2>
          <button onClick={onClose} className="text-ss-ghost hover:text-ss-ink text-lg leading-none">×</button>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Name</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder={`${label} name...`}
              autoFocus
              className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink placeholder-ss-ghost focus:outline-none focus:border-ss-ink transition-colors" />
          </div>
          <div>
            <label className="text-xs font-semibold text-ss-dim uppercase tracking-wide block mb-1.5">Description <span className="font-normal text-ss-ghost normal-case">(optional)</span></label>
            <input value={description} onChange={e => setDesc(e.target.value)}
              placeholder={`What is this ${label.toLowerCase()} about?`}
              className="w-full border border-ss-border rounded-lg px-3 py-2 text-sm text-ss-ink placeholder-ss-ghost focus:outline-none focus:border-ss-ink transition-colors" />
          </div>
          <button onClick={handleSubmit} disabled={!title.trim()}
            className="w-full py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Begin {label}
          </button>
        </div>
      </div>
    </div>
  )
}
