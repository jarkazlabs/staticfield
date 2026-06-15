// Fields.jsx — Fields-Übersicht mit Löschbestätigung
import { useRef, useState } from 'react'
import AddBoardModal    from '../components/AddBoardModal.jsx'
import BoardCollage     from '../components/BoardCollage.jsx'
import DeleteFieldModal from '../components/DeleteFieldModal.jsx'
import ImportFieldModal from '../components/ImportFieldModal.jsx'
import { validateFieldBackup } from '../lib/fieldBackup.js'

export default function Fields({ fields, store, openField }) {
  const [showAddModal,    setShowAddModal]    = useState(false)
  const [fieldToDelete,   setFieldToDelete]   = useState(null) // field-Objekt
  const [importMessage,   setImportMessage]   = useState(null)
  const [pendingImport,   setPendingImport]   = useState(null)
  const importRef = useRef(null)

  function handleAddField(title, description) {
    const id = store.addBoard(title, description)
    openField(id)
  }
  function handleDeleteConfirm() {
    store.deleteBoard(fieldToDelete.id)
    setFieldToDelete(null)
  }

  async function handleImport(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      if (file.size > 25 * 1024 * 1024) {
        throw new Error('This backup is larger than the 25 MB import limit.')
      }
      const backup = validateFieldBackup(JSON.parse(await file.text()))
      setPendingImport({ backup, fileSize: file.size })
    } catch (error) {
      setImportMessage({
        type: 'error',
        text: error instanceof SyntaxError
          ? 'The selected file does not contain valid JSON.'
          : error.message,
      })
    }
  }

  function confirmImport() {
    try {
      store.importField(pendingImport.backup)
      setPendingImport(null)
      setImportMessage({ type: 'success', text: 'Field imported successfully. You can undo this action.' })
    } catch (error) {
      setPendingImport(null)
      setImportMessage({ type: 'error', text: error.message })
    }
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
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <input
              ref={importRef}
              type="file"
              accept=".json,.staticfield.json,application/json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={() => importRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 border border-ss-border text-ss-dim text-sm font-semibold rounded-lg hover:border-ss-muted hover:text-ss-ink transition-colors"
            >
              Import
            </button>
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-ss-ink text-white text-sm font-semibold rounded-lg hover:bg-ss-dim transition-colors">
              + New Field
            </button>
          </div>
        </div>

        {importMessage && (
          <div className={`mt-5 px-4 py-3 rounded-lg border text-sm flex items-center justify-between gap-4 ${
            importMessage.type === 'error'
              ? 'bg-red-50 border-red-100 text-red-600'
              : 'bg-ss-accentBg border-ss-accent/20 text-ss-accent'
          }`}>
            <span>{importMessage.text}</span>
            <button onClick={() => setImportMessage(null)} aria-label="Dismiss import message">×</button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 py-8 pb-20">
          {fields.map((field, i) => (
            <div key={field.id} className="animate-slide-up opacity-0"
              style={{ animationFillMode: 'forwards', animationDelay: `${i * 0.06}s` }}>
              <BoardCollage
                board={field}
                boardCards={store.getBoardCards(field.id)}
                onClick={() => openField(field.id)}
                onDelete={() => setFieldToDelete(field)}
              />
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <AddBoardModal
          onAdd={handleAddField}
          onClose={() => setShowAddModal(false)}
          label="Field"
        />
      )}

      {fieldToDelete && (
        <DeleteFieldModal
          field={fieldToDelete}
          onConfirm={handleDeleteConfirm}
          onClose={() => setFieldToDelete(null)}
        />
      )}

      {pendingImport && (
        <ImportFieldModal
          backup={pendingImport.backup}
          fileSize={pendingImport.fileSize}
          onConfirm={confirmImport}
          onClose={() => setPendingImport(null)}
        />
      )}
    </div>
  )
}
