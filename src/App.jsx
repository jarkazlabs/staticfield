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
  const search = window.location.search

  // GitHub Pages 404-Redirect: /?p=/field/b05
  if (search.startsWith('?p=')) {
    const path = decodeURIComponent(search.slice(3)).replace(/^\//, '')
    // Clean up URL in browser
    window.history.replaceState(null, '', BASE + '/' + path)
    return parsePath(path)
  }

  // Legacy format: /?/field/b05
  if (search.startsWith('?/')) {
    const path = search.slice(2)
    window.history.replaceState(null, '', BASE + '/' + path)
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
  if (page === 'field-detail' && fieldId && fieldId !== 'null') return `${BASE}/field/${fieldId}`
  if (page === 'field-detail') return `${BASE}/fields` // fallback
  return `${BASE}/`
}

export default function App() {
  const initial = parseUrl()
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
