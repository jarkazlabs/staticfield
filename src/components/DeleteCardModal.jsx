// DeleteCardModal.jsx — Zweistufige Bestätigung für Card-Löschung
import { useState } from 'react'

export default function DeleteCardModal({ card, onConfirm, onClose }) {
  const [step, setStep] = useState(1)

  const typeLabels = {
    note: 'Note', link: 'Link', image: 'Image',
    instagram: 'Instagram', chain: 'Signal-Chain', pattern: 'Pattern'
  }
  const label = typeLabels[card.type] || 'Signal'
  const title = card.title || label

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs mx-4 overflow-hidden">

        <div className="px-5 pt-5 pb-4">
          <div className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 13H2L8 2Z" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
              <line x1="8" y1="6.5" x2="8" y2="9.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="11.5" r="0.75" fill="#ef4444"/>
            </svg>
          </div>

          {step === 1 ? (
            <>
              <h2 className="font-sans font-bold text-sm text-ss-ink mb-1">Signal löschen?</h2>
              <p className="text-xs text-ss-dim leading-relaxed">
                <span className="font-semibold text-ss-ink">„{title}"</span> wird gelöscht.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-sans font-bold text-sm text-ss-ink mb-1">Bist du sicher?</h2>
              <p className="text-xs text-ss-dim leading-relaxed">
                Das Signal wird unwiderruflich entfernt. Verbindungen gehen ebenfalls verloren.
              </p>
            </>
          )}
        </div>

        <div className="px-5 pb-5 flex gap-2">
          <button onClick={onClose}
            className="flex-1 py-2 border border-ss-border text-ss-dim text-xs font-semibold rounded-lg hover:border-ss-muted hover:text-ss-ink transition-colors">
            Abbrechen
          </button>
          {step === 1 ? (
            <button onClick={() => setStep(2)}
              className="flex-1 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors">
              Ja
            </button>
          ) : (
            <button onClick={onConfirm}
              className="flex-1 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors">
              Ja, löschen
            </button>
          )}
        </div>

        <div className="flex gap-1 justify-center pb-3">
          {[1,2].map(s => (
            <div key={s} className={`w-1.5 h-1.5 rounded-full transition-colors ${step >= s ? 'bg-red-400' : 'bg-ss-border'}`}/>
          ))}
        </div>
      </div>
    </div>
  )
}
