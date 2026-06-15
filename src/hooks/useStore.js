import { useCallback, useEffect, useRef, useState } from 'react'
import { DEMO_BOARDS, DEMO_CARDS, DEMO_CONNECTIONS } from '../data/signals.js'
import { prepareImportedField } from '../lib/fieldBackup.js'

const STORAGE_KEYS = {
  boards: 'ss_boards',
  cards: 'ss_cards',
  connections: 'ss_connections',
  sections: 'ss_sections',
}
const HISTORY_LIMIT = 60

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The app remains usable if browser storage is unavailable or full.
  }
}

function uid() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID().replaceAll('-', '').slice(0, 12)
  }
  return Math.random().toString(36).slice(2, 14)
}

function initialState() {
  return {
    boards: load(STORAGE_KEYS.boards, DEMO_BOARDS),
    cards: load(STORAGE_KEYS.cards, DEMO_CARDS),
    connections: load(STORAGE_KEYS.connections, DEMO_CONNECTIONS),
    sections: load(STORAGE_KEYS.sections, []),
  }
}

function isTextInput(target) {
  return target instanceof HTMLElement && (
    target.isContentEditable ||
    target.matches('input, textarea, select')
  )
}

export function useStore() {
  const [timeline, setTimeline] = useState(() => ({
    past: [],
    present: initialState(),
    future: [],
  }))
  const historyGroup = useRef(null)
  const { boards, cards, connections, sections } = timeline.present

  useEffect(() => save(STORAGE_KEYS.boards, boards), [boards])
  useEffect(() => save(STORAGE_KEYS.cards, cards), [cards])
  useEffect(() => save(STORAGE_KEYS.connections, connections), [connections])
  useEffect(() => save(STORAGE_KEYS.sections, sections), [sections])

  const change = useCallback((updater) => {
    const activeGroup = historyGroup.current
    setTimeline(current => {
      const next = updater(current.present)
      if (next === current.present) return current

      if (activeGroup) {
        if (activeGroup.recorded) {
          return { ...current, present: next, future: [] }
        }
        activeGroup.recorded = true
      }

      return {
        past: [...current.past, current.present].slice(-HISTORY_LIMIT),
        present: next,
        future: [],
      }
    })
  }, [])

  const beginHistoryGroup = useCallback(() => {
    if (!historyGroup.current) historyGroup.current = { recorded: false }
  }, [])

  const endHistoryGroup = useCallback(() => {
    historyGroup.current = null
  }, [])

  const undo = useCallback(() => {
    historyGroup.current = null
    setTimeline(current => {
      if (!current.past.length) return current
      const previous = current.past[current.past.length - 1]
      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future].slice(0, HISTORY_LIMIT),
      }
    })
  }, [])

  const redo = useCallback(() => {
    historyGroup.current = null
    setTimeline(current => {
      if (!current.future.length) return current
      const next = current.future[0]
      return {
        past: [...current.past, current.present].slice(-HISTORY_LIMIT),
        present: next,
        future: current.future.slice(1),
      }
    })
  }, [])

  useEffect(() => {
    function onKeyDown(event) {
      if (isTextInput(event.target) || !(event.metaKey || event.ctrlKey)) return
      const key = event.key.toLowerCase()
      if (key === 'z' && event.shiftKey) {
        event.preventDefault()
        redo()
      } else if (key === 'z') {
        event.preventDefault()
        undo()
      } else if (key === 'y') {
        event.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [redo, undo])

  const addBoard = useCallback((title, description = '') => {
    const board = {
      id: `b${uid()}`,
      title,
      description,
      tags: [],
      author: 'you',
      imageUrl: '',
      followers: 0,
      isDemo: false,
    }
    change(state => ({ ...state, boards: [...state.boards, board] }))
    return board.id
  }, [change])

  const deleteBoard = useCallback((boardId) => {
    change(state => {
      const cardIds = new Set(state.cards.filter(card => card.boardId === boardId).map(card => card.id))
      return {
        boards: state.boards.filter(board => board.id !== boardId),
        cards: state.cards.filter(card => card.boardId !== boardId),
        connections: state.connections.filter(connection =>
          !cardIds.has(connection.from) && !cardIds.has(connection.to)
        ),
        sections: state.sections.filter(section => section.boardId !== boardId),
      }
    })
  }, [change])

  const importField = useCallback((backup) => {
    const imported = prepareImportedField(backup, uid)
    const probeKey = 'ss_import_capacity_probe'
    try {
      localStorage.setItem(probeKey, JSON.stringify(imported))
      localStorage.removeItem(probeKey)
    } catch {
      localStorage.removeItem(probeKey)
      throw new Error('There is not enough local browser storage for this field.')
    }
    change(state => ({
      boards: [...state.boards, imported.field],
      cards: [...state.cards, ...imported.cards],
      connections: [...state.connections, ...imported.connections],
      sections: [...state.sections, ...imported.sections],
    }))
    return imported.field.id
  }, [change])

  const addCard = useCallback((boardId, type, data) => {
    const card = {
      id: `c${uid()}`,
      type,
      boardId,
      position: { x: 80 + Math.random() * 200, y: 80 + Math.random() * 100 },
      tags: [],
      ...data,
    }
    change(state => ({ ...state, cards: [...state.cards, card] }))
    return card.id
  }, [change])

  const updateCard = useCallback((cardId, updates) => {
    change(state => ({
      ...state,
      cards: state.cards.map(card => card.id === cardId ? { ...card, ...updates } : card),
    }))
  }, [change])

  const moveCard = useCallback((cardId, x, y) => {
    change(state => ({
      ...state,
      cards: state.cards.map(card =>
        card.id === cardId ? { ...card, position: { x, y } } : card
      ),
    }))
  }, [change])

  const deleteCard = useCallback((cardId) => {
    change(state => ({
      ...state,
      cards: state.cards.filter(card => card.id !== cardId),
      connections: state.connections.filter(connection =>
        connection.from !== cardId && connection.to !== cardId
      ),
    }))
  }, [change])

  const addConnection = useCallback((fromId, toId) => {
    change(state => {
      const exists = state.connections.some(connection =>
        (connection.from === fromId && connection.to === toId) ||
        (connection.from === toId && connection.to === fromId)
      )
      if (exists || fromId === toId) return state
      return {
        ...state,
        connections: [...state.connections, { id: `cn${uid()}`, from: fromId, to: toId }],
      }
    })
  }, [change])

  const deleteConnection = useCallback((connectionId) => {
    change(state => ({
      ...state,
      connections: state.connections.filter(connection => connection.id !== connectionId),
    }))
  }, [change])

  const addSection = useCallback((boardId, position) => {
    const section = {
      id: `s${uid()}`,
      boardId,
      label: 'Section',
      position: position || { x: 100 + Math.random() * 200, y: 100 + Math.random() * 100 },
      width: 340,
      height: 220,
      tint: 'none',
      locked: false,
    }
    change(state => ({ ...state, sections: [...state.sections, section] }))
  }, [change])

  const updateSection = useCallback((sectionId, updates) => {
    change(state => ({
      ...state,
      sections: state.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    }))
  }, [change])

  const deleteSection = useCallback((sectionId) => {
    change(state => ({
      ...state,
      sections: state.sections.filter(section => section.id !== sectionId),
    }))
  }, [change])

  const lockSection = useCallback((sectionId) => {
    change(state => ({
      ...state,
      sections: state.sections.map(section =>
        section.id === sectionId ? { ...section, locked: !section.locked } : section
      ),
    }))
  }, [change])

  const moveSection = useCallback((sectionId, x, y) => {
    change(state => ({
      ...state,
      sections: state.sections.map(section =>
        section.id === sectionId ? { ...section, position: { x, y } } : section
      ),
    }))
  }, [change])

  const getBoardCards = useCallback(
    boardId => cards.filter(card => card.boardId === boardId),
    [cards],
  )

  const getBoardConnections = useCallback((boardId) => {
    const ids = new Set(cards.filter(card => card.boardId === boardId).map(card => card.id))
    return connections.filter(connection => ids.has(connection.from) && ids.has(connection.to))
  }, [cards, connections])

  const getBoardSections = useCallback(
    boardId => sections.filter(section => section.boardId === boardId),
    [sections],
  )

  return {
    boards,
    cards,
    connections,
    sections,
    canUndo: timeline.past.length > 0,
    canRedo: timeline.future.length > 0,
    undo,
    redo,
    beginHistoryGroup,
    endHistoryGroup,
    addBoard,
    deleteBoard,
    importField,
    addCard,
    updateCard,
    moveCard,
    deleteCard,
    addConnection,
    deleteConnection,
    addSection,
    updateSection,
    moveSection,
    deleteSection,
    lockSection,
    getBoardCards,
    getBoardConnections,
    getBoardSections,
  }
}
