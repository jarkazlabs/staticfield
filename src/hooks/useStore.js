// useStore.js — Zentraler State mit localStorage-Persistenz
// Kein Redux, kein Zustand — nur React useState + localStorage

import { useState, useEffect, useCallback } from 'react'
import { DEMO_BOARDS, DEMO_CARDS, DEMO_CONNECTIONS } from '../data/signals.js'

const LS_BOARDS      = 'ss_boards'
const LS_CARDS       = 'ss_cards'
const LS_CONNECTIONS = 'ss_connections'

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

export function useStore() {
  const [boards,      setBoards]      = useState(() => load(LS_BOARDS,      DEMO_BOARDS))
  const [cards,       setCards]       = useState(() => load(LS_CARDS,       DEMO_CARDS))
  const [connections, setConnections] = useState(() => load(LS_CONNECTIONS, DEMO_CONNECTIONS))
  const [sections,    setSections]    = useState(() => load('ss_sections', []))

  // Persistieren bei jeder Änderung
  useEffect(() => save(LS_BOARDS,      boards),      [boards])
  useEffect(() => save(LS_CARDS,       cards),       [cards])
  useEffect(() => save(LS_CONNECTIONS, connections), [connections])
  useEffect(() => save('ss_sections',    sections),    [sections])

  // ─── Boards ───────────────────────────────────────────
  const addBoard = useCallback((title, description = '') => {
    const board = {
      id: 'b' + uid(),
      title,
      description,
      tags: [],
      author: 'you',
      imageUrl: '',
      followers: 0,
      isDemo: false,
    }
    setBoards(bs => [...bs, board])
    return board.id
  }, [])

  const deleteBoard = useCallback((boardId) => {
    setBoards(bs => bs.filter(b => b.id !== boardId))
    setCards(cs => cs.filter(c => c.boardId !== boardId))
    setConnections(cn => {
      const boardCardIds = cards.filter(c => c.boardId === boardId).map(c => c.id)
      return cn.filter(c => !boardCardIds.includes(c.from) && !boardCardIds.includes(c.to))
    })
  }, [cards])

  // ─── Cards ────────────────────────────────────────────
  const addCard = useCallback((boardId, type, data) => {
    const card = {
      id: 'c' + uid(),
      type,
      boardId,
      position: { x: 80 + Math.random() * 200, y: 80 + Math.random() * 100 },
      tags: [],
      ...data,
    }
    setCards(cs => [...cs, card])
    return card.id
  }, [])

  const updateCard = useCallback((cardId, updates) => {
    setCards(cs => cs.map(c => c.id === cardId ? { ...c, ...updates } : c))
  }, [])

  const moveCard = useCallback((cardId, x, y) => {
    setCards(cs => cs.map(c => c.id === cardId ? { ...c, position: { x, y } } : c))
  }, [])

  const deleteCard = useCallback((cardId) => {
    setCards(cs => cs.filter(c => c.id !== cardId))
    setConnections(cn => cn.filter(c => c.from !== cardId && c.to !== cardId))
  }, [])

  // ─── Connections ──────────────────────────────────────
  const addConnection = useCallback((fromId, toId) => {
    // Keine Duplikate
    setConnections(cn => {
      const exists = cn.some(c => (c.from === fromId && c.to === toId) || (c.from === toId && c.to === fromId))
      if (exists || fromId === toId) return cn
      return [...cn, { id: 'cn' + uid(), from: fromId, to: toId }]
    })
  }, [])

  const deleteConnection = useCallback((connId) => {
    setConnections(cn => cn.filter(c => c.id !== connId))
  }, [])

  // ─── Hilfsfunktionen ──────────────────────────────────
  const getBoardCards = useCallback((boardId) =>
    cards.filter(c => c.boardId === boardId), [cards])

  const getBoardConnections = useCallback((boardId) => {
    const ids = new Set(cards.filter(c => c.boardId === boardId).map(c => c.id))
    return connections.filter(cn => ids.has(cn.from) && ids.has(cn.to))
  }, [cards, connections])

  // ─── Sections ────────────────────────────────────────
  const addSection = (boardId, position) => {
    const section = {
      id: 's' + Math.random().toString(36).slice(2,8),
      boardId,
      label: 'Section',
      position: position || { x: 100 + Math.random() * 200, y: 100 + Math.random() * 100 },
      width: 340,
      height: 220,
      tint: 'none',
      locked: false,
      lockedCardIds: [], // Cards die beim Sperren eingefroren wurden
    }
    setSections(s => [...s, section])
  }

  const updateSection = (id, updates) => setSections(s => s.map(sec => sec.id === id ? { ...sec, ...updates } : sec))
  const deleteSection = (id)          => setSections(s => s.filter(sec => sec.id !== id))
  const getBoardSections = (boardId)  => sections.filter(s => s.boardId === boardId)

  // Beim Sperren: Cards die sich innerhalb der Section befinden einsammeln
  const lockSection = useCallback((sectionId) => {
    setSections(allSections => {
      const sec = allSections.find(s => s.id === sectionId)
      if (!sec) return allSections
      const newLocked = !sec.locked

      let lockedCardIds = sec.lockedCardIds || []

      if (newLocked) {
        // Cards finden die sich innerhalb oder überschneidend mit der Section befinden
        const boardCards = cards.filter(c => c.boardId === sec.boardId)
        lockedCardIds = boardCards
          .filter(card => {
            const cw = card.width  || 250
            const ch = card.height || 120
            // Überschneidet sich die Card mit der Section?
            return (
              card.position.x < sec.position.x + sec.width  &&
              card.position.x + cw > sec.position.x &&
              card.position.y < sec.position.y + sec.height &&
              card.position.y + ch > sec.position.y
            )
          })
          .map(c => c.id)
      }

      return allSections.map(s =>
        s.id === sectionId ? { ...s, locked: newLocked, lockedCardIds } : s
      )
    })
  }, [cards])

  // Section verschieben — lockedCards mitbewegen
  const moveSection = useCallback((id, x, y) => {
    setSections(allSections => {
      const sec = allSections.find(s => s.id === id)
      if (!sec) return allSections

      const dx = x - sec.position.x
      const dy = y - sec.position.y

      // Wenn gesperrt: Cards mitbewegen
      if (sec.locked && sec.lockedCardIds?.length > 0) {
        setCards(allCards => allCards.map(card =>
          sec.lockedCardIds.includes(card.id)
            ? { ...card, position: { x: card.position.x + dx, y: card.position.y + dy } }
            : card
        ))
      }

      return allSections.map(s =>
        s.id === id ? { ...s, position: { x, y } } : s
      )
    })
  }, [])

  return {
    boards, cards, connections, sections,
    addBoard, deleteBoard,
    addSection, updateSection, moveSection, deleteSection, lockSection,
    addCard, updateCard, moveCard, deleteCard,
    addConnection, deleteConnection,
    getBoardCards, getBoardConnections, getBoardSections,
  }
}

// ─── Sections werden separat im localStorage gespeichert ───
// Wird direkt in useStore integriert — siehe unten in BoardCanvas
