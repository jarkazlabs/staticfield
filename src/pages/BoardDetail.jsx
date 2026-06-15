// BoardDetail.jsx — Canvas auf Desktop, Card-Liste auf Mobile
import BoardCanvas from '../components/BoardCanvas.jsx'

// Mobile Card-Listen-Ansicht
function MobileCardList({ cards, store }) {
  const typeLabels = { note:'Note', link:'Link', image:'Image', instagram:'Instagram', chain:'Signal-Chain' }

  return (
    <div className="flex-1 overflow-auto px-4 py-4">
      <div className="flex flex-col gap-3 pb-20">
        {cards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-ss-ghost text-sm mb-3">Noch keine Signals.</p>
            <p className="text-xs text-ss-ghost/60">Öffne den Canvas auf einem größeren Bildschirm um Signals hinzuzufügen.</p>
          </div>
        )}
        {cards.map(card => (
          <div key={card.id} className="bg-white rounded-xl border border-ss-border p-4 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono text-2xs text-ss-ghost uppercase tracking-widest">
                {typeLabels[card.type] || card.type}
              </span>
              <button
                onClick={() => store.deleteCard(card.id)}
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
                className="font-mono text-2xs text-ss-accent mt-1.5 block truncate">↗ {card.url.replace('https://','')}</a>
            )}
            {card.chain && card.chain.filter(i => i !== '→').length > 0 && (
              <div className="flex items-center flex-wrap gap-1 mt-2">
                {card.chain.filter(i => i !== '→').map((item, i, arr) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="font-mono text-2xs bg-ss-surface border border-ss-border px-1.5 py-0.5 rounded">{item}</span>
                    {i < arr.length-1 && <span className="text-ss-ghost text-xs">→</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BoardDetail({ boardId, boards, store, setPage }) {
  const board       = boards.find(b => b.id === boardId)
  const cards = store.getBoardCards(boardId)
  const connections = store.getBoardConnections(boardId)
  const sections = store.getBoardSections(boardId)

  if (!board) return (
    <div className="min-h-screen flex items-center justify-center text-ss-dim text-sm">Board nicht gefunden.</div>
  )

  return (
    <div className="h-screen bg-ss-bg pt-14 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-ss-border bg-white flex items-start justify-between flex-shrink-0">
        <div>
          <button onClick={() => setPage('boards')}
            className="text-xs text-ss-ghost hover:text-ss-dim transition-colors mb-1.5 flex items-center gap-1.5">
            ← Boards
          </button>
          <h1 className="font-sans font-bold text-lg sm:text-xl text-ss-ink">{board.title}</h1>
          {board.description && <p className="text-xs text-ss-dim mt-0.5 max-w-lg hidden sm:block">{board.description}</p>}
        </div>
        <div className="text-right text-2xs text-ss-ghost leading-relaxed font-mono mt-1 hidden sm:block">
          <p>● Punkt an Card = verbinden</p>
          <p>● Linie = trennen · ✏️ = bearbeiten</p>
        </div>
      </div>

      {/* Mobile: Hinweis + Liste */}
      <div className="flex-1 flex flex-col overflow-hidden md:hidden">
        <div className="bg-ss-accentBg border-b border-ss-accent/20 px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#7a8c3c" strokeWidth="1.2"/>
            <line x1="7" y1="5" x2="7" y2="9" stroke="#7a8c3c" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="7" cy="3.5" r="0.8" fill="#7a8c3c"/>
          </svg>
          <p className="text-xs text-ss-accent font-medium">Canvas-Ansicht auf Desktop verfügbar. Hier: vereinfachte Liste.</p>
        </div>
        <MobileCardList cards={cards} store={store} />
      </div>

      {/* Desktop: Canvas */}
      <div className="hidden md:flex flex-1 flex-col overflow-hidden">
        <BoardCanvas
          boardId={boardId}
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
        />
      </div>
    </div>
  )
}
