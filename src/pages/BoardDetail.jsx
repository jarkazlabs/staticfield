// BoardDetail.jsx — Board-Ansicht mit interaktivem Canvas
import { useMemo } from 'react'
import BoardCanvas from '../components/BoardCanvas.jsx'

export default function BoardDetail({ boardId, boards, store, setPage }) {
  const board = boards.find(b => b.id === boardId)
  const cards       = useMemo(() => store.getBoardCards(boardId),       [store, boardId])
  const connections = useMemo(() => store.getBoardConnections(boardId), [store, boardId])

  if (!board) return (
    <div className="min-h-screen flex items-center justify-center text-ss-dim text-sm">Board nicht gefunden.</div>
  )

  return (
    <div className="min-h-screen bg-ss-bg pt-11 flex flex-col">
      <div className="px-6 py-6 border-b border-ss-border bg-white flex items-start justify-between">
        <div>
          <button onClick={() => setPage('boards')}
            className="text-xs text-ss-ghost hover:text-ss-dim transition-colors mb-3 flex items-center gap-1.5">
            ← Boards
          </button>
          <h1 className="font-sans font-bold text-2xl text-ss-ink">{board.title}</h1>
          {board.description && (
            <p className="text-sm text-ss-dim mt-1 max-w-lg">{board.description}</p>
          )}
          {board.isDemo && (
            <span className="inline-block mt-2 font-mono text-2xs text-ss-ghost border border-ss-border px-1.5 py-0.5 rounded">Demo Board</span>
          )}
        </div>
        <div className="text-right text-xs text-ss-ghost leading-relaxed">
          <p>Punkt an Card = verbinden</p>
          <p>Klick auf Linie = trennen</p>
          <p>Card ziehen = verschieben</p>
        </div>
      </div>

      <BoardCanvas
        boardId={boardId}
        cards={cards}
        connections={connections}
        addCard={store.addCard}
        moveCard={store.moveCard}
        deleteCard={store.deleteCard}
        addConnection={store.addConnection}
        deleteConnection={store.deleteConnection}
      />
    </div>
  )
}
