// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { createFieldBackup } from '../lib/fieldBackup.js'
import { useStore } from './useStore.js'

describe('useStore history', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('undoes and redoes a field creation', () => {
    const { result } = renderHook(() => useStore())
    const initialCount = result.current.boards.length

    act(() => result.current.addBoard('New field'))
    expect(result.current.boards).toHaveLength(initialCount + 1)
    expect(result.current.canUndo).toBe(true)

    act(() => result.current.undo())
    expect(result.current.boards).toHaveLength(initialCount)
    expect(result.current.canRedo).toBe(true)

    act(() => result.current.redo())
    expect(result.current.boards).toHaveLength(initialCount + 1)
  })

  it('groups a complete drag into one undo step', () => {
    const { result } = renderHook(() => useStore())
    const original = result.current.cards.find(card => card.id === 'c01').position

    act(() => {
      result.current.beginHistoryGroup()
      result.current.moveCard('c01', 100, 100)
      result.current.moveCard('c01', 200, 200)
      result.current.endHistoryGroup()
    })
    expect(result.current.cards.find(card => card.id === 'c01').position).toEqual({ x: 200, y: 200 })

    act(() => result.current.undo())
    expect(result.current.cards.find(card => card.id === 'c01').position).toEqual(original)
  })

  it('imports a field atomically and can undo the import', () => {
    const { result } = renderHook(() => useStore())
    const source = result.current.boards[0]
    const backup = createFieldBackup(
      source,
      result.current.cards,
      result.current.connections,
      result.current.sections,
    )
    const initialCount = result.current.boards.length

    act(() => result.current.importField(backup))
    expect(result.current.boards).toHaveLength(initialCount + 1)

    act(() => result.current.undo())
    expect(result.current.boards).toHaveLength(initialCount)
  })
})
