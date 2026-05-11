// App.jsx — Haupt-Router mit zentralem Store
import { useState } from 'react'
import Nav          from './components/Nav.jsx'
import Landing      from './pages/Landing.jsx'
import Explore      from './pages/Explore.jsx'
import Boards       from './pages/Boards.jsx'
import BoardDetail  from './pages/BoardDetail.jsx'
import About        from './pages/About.jsx'
import { useStore } from './hooks/useStore.js'

export default function App() {
  const [page, setPage]               = useState('landing')
  const [activeBoardId, setActiveBoardId] = useState(null)
  const store = useStore()

  function renderPage() {
    switch (page) {
      case 'landing':
        return <Landing setPage={setPage} setActiveBoardId={setActiveBoardId} />
      case 'explore':
        return <Explore />
      case 'boards':
        return <Boards boards={store.boards} store={store} setPage={setPage} setActiveBoardId={setActiveBoardId} />
      case 'board-detail':
        return <BoardDetail boardId={activeBoardId} boards={store.boards} store={store} setPage={setPage} />
      case 'about':
        return <About />
      default:
        return <Landing setPage={setPage} setActiveBoardId={setActiveBoardId} />
    }
  }

  return (
    <div className="bg-ss-bg min-h-screen text-ss-ink">
      <Nav page={page} setPage={setPage} />
      <main>{renderPage()}</main>
    </div>
  )
}
