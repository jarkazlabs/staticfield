// App.jsx — Browser History Routing
// pushState bei Navigation, popstate für Zurück-Button
// GitHub Pages 404-Redirect wird via URL-Parameter aufgelöst

import { useState, useEffect } from 'react'
import Nav         from './components/Nav.jsx'
import Landing     from './pages/Landing.jsx'
import Explore     from './pages/Explore.jsx'
import Fields      from './pages/Fields.jsx'
import FieldDetail from './pages/FieldDetail.jsx'
import Manifesto   from './pages/Manifesto.jsx'
import { useStore } from './hooks/useStore.js'

const BASE = '/staticfield'

// URL → { page, fieldId }
function parseUrl() {
  // GitHub Pages 404-Redirect: /?/fields/b05
  const search = window.location.search
  if (search.startsWith('?/')) {
    const path = search.slice(2)
    return parsePath(path)
  }
  const path = window.location.pathname.replace(BASE, '').replace(/^\//, '')
  return parsePath(path)
}

function parsePath(path) {
  if (!path || path === '' || path === 'index.html') return { page: 'landing', fieldId: null }
  if (path.startsWith('field/')) return { page: 'field-detail', fieldId: path.replace('field/', '') }
  if (path === 'explore')   return { page: 'explore',   fieldId: null }
  if (path === 'fields')    return { page: 'fields',    fieldId: null }
  if (path === 'manifesto') return { page: 'manifesto', fieldId: null }
  return { page: 'landing', fieldId: null }
}

// { page, fieldId } → URL path
function toPath(page, fieldId) {
  if (page === 'landing')      return `${BASE}/`
  if (page === 'explore')      return `${BASE}/explore`
  if (page === 'fields')       return `${BASE}/fields`
  if (page === 'manifesto')    return `${BASE}/manifesto`
  if (page === 'field-detail') return `${BASE}/field/${fieldId}`
  return `${BASE}/`
}

export default function App() {
  const initial = parseUrl()
  const [page,          setPageState]    = useState(initial.page)
  const [activeFieldId, setActiveFieldId] = useState(initial.fieldId)
  const store = useStore()

  // pushState bei Navigation
  function setPage(newPage, fieldId) {
    const path = toPath(newPage, fieldId ?? activeFieldId)
    window.history.pushState({ page: newPage, fieldId: fieldId ?? activeFieldId }, '', path)
    setPageState(newPage)
    if (fieldId !== undefined) setActiveFieldId(fieldId)
    window.scrollTo(0, 0)
  }

  function setActiveFieldIdAndNav(id) {
    setActiveFieldId(id)
  }

  // Zurück/Vor-Button
  useEffect(() => {
    function onPop(e) {
      const state = e.state
      if (state) {
        setPageState(state.page)
        setActiveFieldId(state.fieldId)
      } else {
        const parsed = parseUrl()
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
  }, [])

  function openField(id) {
    setActiveFieldId(id)
    setPage('field-detail', id)
  }

  function renderPage() {
    switch (page) {
      case 'landing':
        return <Landing
          setPage={setPage}
          setActiveFieldId={id => openField(id)}
          store={store} />
      case 'explore':
        return <Explore />
      case 'fields':
        return <Fields
          fields={store.boards}
          store={store}
          setPage={setPage}
          setActiveFieldId={id => openField(id)} />
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
          setActiveFieldId={id => openField(id)}
          store={store} />
    }
  }

  return (
    <div className="bg-ss-bg min-h-screen text-ss-ink">
      <Nav page={page} setPage={setPage} />
      <main>{renderPage()}</main>
    </div>
  )
}
