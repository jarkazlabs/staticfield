// Fields.jsx — Fields-Übersicht (ehemals Boards)
import { useState } from 'react'
import AddBoardModal from '../components/AddBoardModal.jsx'
import BoardCollage  from '../components/BoardCollage.jsx'

export default function Fields({ fields, store, setPage, setActiveFieldId }) {
  const [showModal, setShowModal] = useState(false)

  function openField(id) { setActiveFieldId(id); setPage('field-detail') }
  function handleAddField(title, description) {
    const id = store.addBoard(title, description)
    openField(id)
  }

  return (
    <div className="min-h-screen pt-14 bg-ss-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="pt-10 sm:pt-14 pb-8 border-b border-ss-border flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
              <span className="text-2xs text-ss-ghost tracking-widest uppercase font-sans">Your Fields</span>
            </div>
            <h1 className="font-sans font-bold text-3xl sm:text-5xl text-ss-ink">Signal Fields</h1>
            <p className="text-sm text-ss-dim mt-2 max-w-md">Focused spaces. Sonic territories. Signal studies.</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors self-start sm:self-auto">
            + New Field
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 py-8 pb-20">
          {fields.map((field, i) => (
            <div key={field.id} className="animate-slide-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.06}s` }}>
              <BoardCollage
                board={field}
                boardCards={store.getBoardCards(field.id)}
                onClick={() => openField(field.id)}
                onDelete={store.deleteBoard}
              />
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <AddBoardModal
          onAdd={handleAddField}
          onClose={() => setShowModal(false)}
          label="Field"
        />
      )}
    </div>
  )
}
