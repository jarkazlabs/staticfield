import { describe, expect, it } from 'vitest'
import { parseNotes } from '../lib/pattern.js'

describe('parseNotes', () => {
  it('normalizes pauses and limits patterns to eight steps', () => {
    expect(parseNotes('C4 - Eb4 _ G4 — A4 B4 C5 D5')).toEqual([
      { token: 'C4', isPause: false },
      { token: '—', isPause: true },
      { token: 'Eb4', isPause: false },
      { token: '—', isPause: true },
      { token: 'G4', isPause: false },
      { token: '—', isPause: true },
      { token: 'A4', isPause: false },
      { token: 'B4', isPause: false },
    ])
  })

  it('returns an empty pattern for blank input', () => {
    expect(parseNotes('   ')).toEqual([])
  })
})
