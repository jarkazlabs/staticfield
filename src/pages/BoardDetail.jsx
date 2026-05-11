import { useMemo } from 'react'
import BoardCanvas from '../components/BoardCanvas.jsx'

export default function BoardDetail({ boardId, boards, store, setPage }) {
  const board       = boards.find(b => b.id === boardId)
  const cards       = useMemo(() => store.getBoardCards(boardId),       [store, boardId])
  const connections = useMemo(() => store.getBoardConnections(boardId), [store, boardId])

  if (!board) return (
    <div className="min-h-screen flex items-center justify-center text-ss-dim text-sm">Board nicht gefunden.</div>
  )

  return (
    <div className="h-screen bg-ss-bg pt-14 flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-ss-border bg-white flex items-start justify-between flex-shrink-0">
        <div>
          <button onClick={() => setPage('boards')}
            className="text-xs text-ss-ghost hover:text-ss-dim transition-colors mb-2 flex items-center gap-1.5">
            ← Boards
          </button>
          <h1 className="font-sans font-bold text-xl text-ss-ink">{board.title}</h1>
          {board.description && <p className="text-xs text-ss-dim mt-0.5 max-w-lg">{board.description}</p>}
        </div>
        <div className="text-right text-2xs text-ss-ghost leading-relaxed font-mono mt-1">
          <p>● Punkt an Card = verbinden</p>
          <p>● Linie anklicken = trennen</p>
          <p>● ✏️ = bearbeiten</p>
        </div>
      </div>

      <BoardCanvas
        boardId={boardId}
        cards={cards}
        connections={connections}
        addCard={store.addCard}
        updateCard={store.updateCard}
        moveCard={store.moveCard}
        deleteCard={store.deleteCard}
        addConnection={store.addConnection}
        deleteConnection={store.deleteConnection}
      />
    </div>
  )
}
