// App.jsx — Browser History Routing
// pushState bei Navigation, popstate für Zurück-Button
// GitHub Pages 404-Redirect wird via URL-Parameter aufgelöst

import { useState, useEffect } from 'react'
import Nav         from './components/Nav.jsx'
import Footer      from './components/Footer.jsx'
import Landing     from './pages/Landing.jsx'
import Explore     from './pages/Explore.jsx'
import Fields      from './pages/Fields.jsx'
import FieldDetail from './pages/FieldDetail.jsx'
import Manifesto   from './pages/Manifesto.jsx'
import { useStore } from './hooks/useStore.js'
import { parseLocation, toPath } from './lib/routing.js'

export default function App() {
  const [initial] = useState(() => parseLocation(window.location, window.history))
  const [page,          setPageState]    = useState(initial.page)
  const [activeFieldId, setActiveFieldId] = useState(initial.fieldId)
  const store = useStore()

  // pushState bei Navigation
  function setPage(newPage, fieldId) {
    const resolvedId = (fieldId && fieldId !== 'null') ? fieldId : activeFieldId
    const path = toPath(newPage, resolvedId)
    window.history.pushState({ page: newPage, fieldId: resolvedId }, '', path)
    setPageState(newPage)
    if (fieldId && fieldId !== 'null') setActiveFieldId(fieldId)
    window.scrollTo(0, 0)
  }

  // Zurück/Vor-Button
  useEffect(() => {
    function onPop(e) {
      const state = e.state
      if (state) {
        setPageState(state.page)
        setActiveFieldId(state.fieldId)
      } else {
        const parsed = parseLocation(window.location, window.history)
        setPageState(parsed.page)
        setActiveFieldId(parsed.fieldId)
      }
    }
    window.addEventListener('popstate', onPop)

    // Initiale History-Entry setzen (damit man auch vom ersten Screen zurückgehen kann)
    window.history.replaceState(
      { page: initial.page, fieldId: initial.fieldId },
      '',
      toPath(initial.page, initial.fieldId)
    )

    return () => window.removeEventListener('popstate', onPop)
  }, [initial.fieldId, initial.page])

  function openField(id) {
    setActiveFieldId(id)
    setPage('field-detail', id)
  }

  function renderPage() {
    switch (page) {
      case 'landing':
        return <Landing
          setPage={setPage}
          openField={openField} />
      case 'explore':
        return <Explore />
      case 'fields':
        return <Fields
          fields={store.boards}
          store={store}
          setPage={setPage}
          openField={openField} />
      case 'field-detail':
        return <FieldDetail
          fieldId={activeFieldId}
          fields={store.boards}
          store={store}
          setPage={setPage} />
      case 'manifesto':
        return <Manifesto setPage={setPage} />
      default:
        return <Landing
          setPage={setPage}
          openField={openField} />
    }
  }

  return (
    <div className="bg-ss-bg min-h-screen text-ss-ink">
      <Nav page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      {page !== 'field-detail' && <Footer setPage={setPage} />}
    </div>
  )
}
