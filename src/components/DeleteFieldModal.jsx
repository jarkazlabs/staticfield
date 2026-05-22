// DeleteFieldModal.jsx — Zweistufige Löschbestätigung
// Stufe 1: Bestätigung JA/NEIN
// Stufe 2: Feldname eintippen

import { useState } from 'react'

export default function DeleteFieldModal({ field, onConfirm, onClose }) {
  const [step, setStep]   = useState(1) // 1 = confirm, 2 = type name
  const [input, setInput] = useState('')

  const nameMatches = input.trim() === field.title.trim()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L16 15H2L9 2Z" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
              <line x1="9" y1="7" x2="9" y2="11" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="13" r="0.8" fill="#ef4444"/>
            </svg>
          </div>

          {step === 1 ? (
            <>
              <h2 className="font-sans font-bold text-base text-ss-ink mb-1">
                Field löschen?
              </h2>
              <p className="text-sm text-ss-dim leading-relaxed">
                Du bist dabei, das Field{' '}
                <span className="font-semibold text-ss-ink">„{field.title}"</span>{' '}
                zu löschen. Alle Signals und Verbindungen gehen verloren.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-sans font-bold text-base text-ss-ink mb-1">
                Namen bestätigen
              </h2>
              <p className="text-sm text-ss-dim leading-relaxed">
                Tippe{' '}
                <span className="font-mono font-semibold text-ss-ink bg-ss-surface px-1.5 py-0.5 rounded">
                  {field.title}
                </span>{' '}
                ein um das Löschen zu bestätigen.
              </p>
            </>
          )}
        </div>

        {/* Step 2: Name input */}
        {step === 2 && (
          <div className="px-6 pb-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && nameMatches && onConfirm()}
              placeholder={field.title}
              autoFocus
              className="w-full border border-ss-border rounded-lg px-3 py-2.5 text-sm text-ss-ink font-mono
                placeholder-ss-ghost/40 focus:outline-none focus:border-red-300 transition-colors"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="px-6 pb-6 pt-4 flex gap-2.5">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-ss-border text-ss-dim text-sm font-semibold rounded-lg
              hover:border-ss-muted hover:text-ss-ink transition-colors">
            Abbrechen
          </button>

          {step === 1 ? (
            <button onClick={() => setStep(2)}
              className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg
                hover:bg-red-600 transition-colors">
              Ja, löschen
            </button>
          ) : (
            <button
              onClick={() => nameMatches && onConfirm()}
              disabled={!nameMatches}
              className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg
                hover:bg-red-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              Endgültig löschen
            </button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex gap-1 justify-center pb-4">
          {[1,2].map(s => (
            <div key={s} className={`w-1.5 h-1.5 rounded-full transition-colors ${step >= s ? 'bg-red-400' : 'bg-ss-border'}`}/>
          ))}
        </div>

      </div>
    </div>
  )
}
