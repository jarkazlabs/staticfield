// Boards.jsx — Übersicht + neues Board anlegen
import { useState } from 'react'
import AddBoardModal from '../components/AddBoardModal.jsx'

function BoardCard({ board, onClick, onDelete }) {
  return (
    <div className="group relative">
      <button onClick={onClick} className="text-left w-full">
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-ss-surface mb-3 border border-ss-border card-hover relative">
          {board.imageUrl
            ? <img src={board.imageUrl} alt={board.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            : <div className="w-full h-full flex items-center justify-center">
                <span className="text-ss-ghost text-3xl">◻</span>
              </div>
          }
          {board.isDemo && (
            <div className="absolute top-2 left-2 bg-white/90 rounded px-1.5 py-0.5">
              <span className="font-mono text-2xs text-ss-ghost">Demo</span>
            </div>
          )}
        </div>
        <div className="flex gap-1 flex-wrap mb-1">
          {board.tags.slice(0,2).map(t => (
            <span key={t} className="font-mono text-2xs text-ss-ghost">#{t}</span>
          ))}
        </div>
        <h3 className="font-sans font-semibold text-base text-ss-ink group-hover:text-ss-accent transition-colors leading-tight">
          {board.title}
        </h3>
        <p className="text-xs text-ss-dim mt-1 line-clamp-2">{board.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-ss-ghost">by {board.author}</span>
        </div>
      </button>
      {!board.isDemo && (
        <button onClick={() => onDelete(board.id)}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full w-6 h-6 flex items-center justify-center text-xs text-ss-ghost hover:text-red-400 border border-ss-border">
          ✕
        </button>
      )}
    </div>
  )
}

export default function Boards({ boards, store, setPage, setActiveBoardId }) {
  const [showModal, setShowModal] = useState(false)

  function openBoard(id) {
    setActiveBoardId(id)
    setPage('board-detail')
  }

  function handleAddBoard(title, description) {
    const id = store.addBoard(title, description)
    openBoard(id)
  }

  return (
    <div className="min-h-screen pt-11 bg-ss-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="pt-14 pb-10 border-b border-ss-border flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-ss-accent" />
              <span className="text-2xs text-ss-ghost tracking-widest uppercase font-sans">Boards</span>
            </div>
            <h1 className="font-sans font-bold text-5xl text-ss-ink">Signal Boards</h1>
            <p className="text-sm text-ss-dim mt-2 max-w-md">Fokussierte Spaces für deine sonischen Territorien.</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors mb-1">
            + Neues Board
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 pb-20">
          {boards.map((board, i) => (
            <div key={board.id} className="animate-slide-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.06}s` }}>
              <BoardCard board={board} onClick={() => openBoard(board.id)} onDelete={store.deleteBoard} />
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
