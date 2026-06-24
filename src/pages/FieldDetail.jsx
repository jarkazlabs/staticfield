// FieldDetail.jsx — Field-Canvas (ehemals BoardDetail)
import { useState } from 'react'
import BoardCanvas from '../components/BoardCanvas.jsx'
import DeleteCardModal from '../components/DeleteCardModal.jsx'
import { createFieldBackup, downloadFieldBackup } from '../lib/fieldBackup.js'

function MobileCardList({ cards, store }) {
  const [signalToDelete, setSignalToDelete] = useState(null)
  const typeLabels = {
    note:'Note Signal',
    link:'Link Signal',
    image:'Image Signal',
    instagram:'Instagram Signal',
    chain:'Signal Chain',
    pattern:'Pattern Signal',
    youtube:'YouTube Signal',
  }
  return (
    <div className="flex-1 overflow-auto px-4 py-4">
      <div className="flex flex-col gap-3 pb-20">
        {cards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-ss-ghost text-sm mb-3">No signals yet.</p>
            <p className="text-xs text-ss-ghost/60">Open on desktop to add signals.</p>
          </div>
        )}
        {cards.map(card => (
          <div key={card.id} className="bg-white rounded-xl border border-ss-border p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono text-2xs text-ss-ghost uppercase tracking-widest">
                {typeLabels[card.type] || card.type}
              </span>
              <button onClick={() => setSignalToDelete(card)}
                className="text-ss-ghost/40 hover:text-red-400 text-xs transition-colors">✕</button>
            </div>
            {card.imageUrl && (
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-3 bg-ss-surface">
                <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover"/>
              </div>
            )}
            {card.title && <p className="font-sans font-semibold text-sm text-ss-ink leading-snug">{card.title}</p>}
            {card.description && <p className="text-xs text-ss-dim mt-1 leading-relaxed">{card.description}</p>}
            {card.url && (
              <a href={card.url} target="_blank" rel="noopener noreferrer"
                className="font-mono text-2xs text-ss-accent mt-1.5 block truncate">
                ↗ {card.url.replace('https://','')}
              </a>
            )}
          </div>
        ))}
      </div>
      {signalToDelete && (
        <DeleteCardModal
          card={signalToDelete}
          onClose={() => setSignalToDelete(null)}
          onConfirm={() => {
            store.deleteCard(signalToDelete.id)
            setSignalToDelete(null)
          }}
        />
      )}
    </div>
  )
}

export default function FieldDetail({ fieldId, fields, store, setPage }) {
  const field      = fields.find(b => b.id === fieldId)
  const cards = store.getBoardCards(fieldId)
  const connections = store.getBoardConnections(fieldId)
  const sections = store.getBoardSections(fieldId)

  function handleExport() {
    const backup = createFieldBackup(field, store.cards, store.connections, store.sections)
    downloadFieldBackup(backup)
  }

  if (!field) return (
    <div className="min-h-screen flex items-center justify-center text-ss-dim text-sm">Field not found.</div>
  )

  return (
    <div className="h-screen bg-ss-bg pt-14 flex flex-col overflow-hidden">
      <div className="px-4 sm:px-6 py-5 sm:py-6 border-b border-ss-border bg-white flex items-start justify-between flex-shrink-0">
        <div>
          <button onClick={() => setPage('fields')}
            className="text-sm text-ss-ghost hover:text-ss-dim transition-colors mb-2 flex items-center gap-1.5">
            ← Fields
          </button>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl text-ss-ink leading-tight">{field.title}</h1>
          {field.description && <p className="text-sm sm:text-base text-ss-dim mt-2 max-w-xl hidden sm:block">{field.description}</p>}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <button
            onClick={handleExport}
            className="px-4 py-2.5 border border-ss-border rounded-lg text-sm font-semibold text-ss-dim hover:text-ss-ink hover:border-ss-muted transition-colors"
          >
            Export
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex-1 flex flex-col overflow-hidden md:hidden">
        <div className="bg-ss-accentBg border-b border-ss-accent/20 px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#7a8c3c" strokeWidth="1.2"/>
            <line x1="7" y1="5" x2="7" y2="9" stroke="#7a8c3c" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="7" cy="3.5" r="0.8" fill="#7a8c3c"/>
          </svg>
          <p className="text-xs text-ss-accent font-medium">Canvas available on desktop. Showing list view.</p>
        </div>
        <MobileCardList cards={cards} store={store} />
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-1 flex-col overflow-hidden">
        <BoardCanvas
          boardId={fieldId}
          cards={cards}
          connections={connections}
          sections={sections}
          addCard={store.addCard}
          updateCard={store.updateCard}
          moveCard={store.moveCard}
          deleteCard={store.deleteCard}
          addConnection={store.addConnection}
          deleteConnection={store.deleteConnection}
          addSection={store.addSection}
          updateSection={store.updateSection}
          moveSection={store.moveSection}
          deleteSection={store.deleteSection}
          lockSection={store.lockSection}
          canUndo={store.canUndo}
          canRedo={store.canRedo}
          undo={store.undo}
          redo={store.redo}
          beginHistoryGroup={store.beginHistoryGroup}
          endHistoryGroup={store.endHistoryGroup}
        />
      </div>
    </div>
  )
}
