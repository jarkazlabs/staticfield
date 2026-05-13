import { useState } from 'react'
import AddBoardModal from '../components/AddBoardModal.jsx'
import BoardCollage  from '../components/BoardCollage.jsx'

export default function Boards({ boards, store, setPage, setActiveBoardId }) {
  const [showModal, setShowModal] = useState(false)

  function openBoard(id) { setActiveBoardId(id); setPage('board-detail') }

  function handleAddBoard(title, description) {
    const id = store.addBoard(title, description)
    openBoard(id)
  }

  return (
    <div className="min-h-screen pt-14 bg-ss-bg">
      <div className="max-w-7xl mx-auto px-6">

        <div className="pt-14 pb-10 border-b border-ss-border flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
              <span className="text-2xs text-ss-ghost tracking-widest uppercase font-sans">Boards</span>
            </div>
            <h1 className="font-sans font-bold text-5xl text-ss-ink">Signal Boards</h1>
            <p className="text-sm text-ss-dim mt-2 max-w-md">Focused spaces. Sonic territories. Signal studies.</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors mb-1">
            + New Board
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 pb-20">
          {boards.map((board, i) => (
            <div key={board.id}
              className="animate-slide-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.06}s` }}>
              <BoardCollage
                board={board}
                boardCards={store.getBoardCards(board.id)}
                onClick={() => openBoard(board.id)}
                onDelete={store.deleteBoard}
              />
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <AddBoardModal onAdd={handleAddBoard} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
