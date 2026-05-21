// App.jsx — Router mit Fields-Umbenennung + neue Seiten
import { useState } from 'react'
import Nav         from './components/Nav.jsx'
import Landing     from './pages/Landing.jsx'
import Explore     from './pages/Explore.jsx'
import Fields      from './pages/Fields.jsx'
import FieldDetail from './pages/FieldDetail.jsx'
import Manifesto   from './pages/Manifesto.jsx'
import { useStore } from './hooks/useStore.js'

export default function App() {
  const [page, setPage]                   = useState('landing')
  const [activeFieldId, setActiveFieldId] = useState(null)
  const store = useStore()

  function renderPage() {
    switch (page) {
      case 'landing':
        return <Landing setPage={setPage} setActiveFieldId={setActiveFieldId} store={store} />
      case 'explore':
        return <Explore />
      case 'fields':
        return <Fields fields={store.boards} store={store} setPage={setPage} setActiveFieldId={setActiveFieldId} />
      case 'field-detail':
        return <FieldDetail fieldId={activeFieldId} fields={store.boards} store={store} setPage={setPage} />
      case 'manifesto':
        return <Manifesto setPage={setPage} />
      default:
        return <Landing setPage={setPage} setActiveFieldId={setActiveFieldId} store={store} />
    }
  }

  return (
    <div className="bg-ss-bg min-h-screen text-ss-ink">
      <Nav page={page} setPage={setPage} />
      <main>{renderPage()}</main>
    </div>
  )
}
