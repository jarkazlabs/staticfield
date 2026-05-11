// Boards.jsx — Board-Übersicht, helles Theme
import { boards } from '../data/signals.js'

function BoardCard({ board, onClick }) {
  return (
    <button onClick={onClick} className="text-left group w-full">
      <div className="aspect-video w-full rounded overflow-hidden bg-ss-surface mb-3 relative card-hover border border-ss-border">
        <img src={board.imageUrl} alt={board.title}
          className="w-full h-full object-cover brightness-90 transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-wrap gap-1 mb-1.5">
        {board.tags.slice(0,2).map(t => (
          <span key={t} className="font-mono text-2xs text-ss-ghost">#{t}</span>
        ))}
      </div>
      <h3 className="font-serif text-lg text-ss-ink group-hover:text-ss-accent transition-colors duration-200 leading-tight">
        {board.title}
      </h3>
      <p className="text-xs text-ss-dim mt-1 leading-relaxed line-clamp-2">{board.description}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-ss-ghost">by {board.author}</span>
        <span className="font-mono text-2xs text-ss-ghost">{board.followers} followers</span>
      </div>
    </button>
  )
}

export default function Boards({ setPage, setActiveBoardId }) {
  function open(id) {
    setActiveBoardId(id)
    setPage('board-detail')
  }

  return (
    <div className="min-h-screen pt-11 bg-ss-bg">
      <div className="max-w-7xl mx-auto px-6">

        <div className="pt-14 pb-10 border-b border-ss-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
            <span className="font-mono text-2xs text-ss-ghost tracking-widest uppercase">Boards</span>
          </div>
          <h1 className="font-serif text-5xl text-ss-ink" style={{ fontWeight: 600 }}>
            Signal Boards
          </h1>
          <p className="text-sm text-ss-dim mt-2 max-w-md">
            Focused spaces for specific sonic territories. Each board is a constellation of signals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 pb-20">
          {boards.map((board, i) => (
            <div key={board.id}
              className="animate-slide-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.06}s` }}
            >
              <BoardCard board={board} onClick={() => open(board.id)} />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
