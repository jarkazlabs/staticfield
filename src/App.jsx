// App.jsx — Haupt-Router
import { useState } from 'react'
import Nav         from './components/Nav.jsx'
import Landing     from './pages/Landing.jsx'
import Explore     from './pages/Explore.jsx'
import Boards      from './pages/Boards.jsx'
import BoardDetail from './pages/BoardDetail.jsx'
import About       from './pages/About.jsx'

export default function App() {
  const [page, setPage] = useState('landing')
  const [activeBoardId, setActiveBoardId] = useState(null)

  function renderPage() {
    switch (page) {
      case 'landing':
        return <Landing setPage={setPage} setActiveBoardId={setActiveBoardId} />
      case 'explore':
        return <Explore />
      case 'boards':
        return <Boards setPage={setPage} setActiveBoardId={setActiveBoardId} />
      case 'board-detail':
        return <BoardDetail boardId={activeBoardId} setPage={setPage} />
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
