import { describe, expect, it } from 'vitest'
import {
  createFieldBackup,
  prepareImportedField,
  validateFieldBackup,
} from './fieldBackup.js'

const field = { id: 'b1', title: 'My Field', author: 'me', isDemo: false }
const cards = [
  { id: 'c1', boardId: 'b1', type: 'note', title: 'Keep me' },
  { id: 'c2', boardId: 'b2', type: 'note', title: 'Ignore me' },
]
const connections = [
  { id: 'cn1', from: 'c1', to: 'c1' },
  { id: 'cn2', from: 'c1', to: 'c2' },
]
const sections = [
  { id: 's1', boardId: 'b1', label: 'Keep me' },
  { id: 's2', boardId: 'b2', label: 'Ignore me' },
]

describe('field backups', () => {
  it('exports only data that belongs to the selected field', () => {
    const backup = createFieldBackup(field, cards, connections, sections, '2026-06-15T00:00:00.000Z')

    expect(backup.cards).toHaveLength(1)
    expect(backup.connections).toHaveLength(1)
    expect(backup.sections).toHaveLength(1)
    expect(backup.exportedAt).toBe('2026-06-15T00:00:00.000Z')
  })

  it('remaps every imported id and preserves relationships', () => {
    const backup = createFieldBackup(field, cards, connections, sections)
    let id = 0
    const imported = prepareImportedField(backup, () => `new${++id}`)

    expect(imported.field.id).toBe('bnew1')
    expect(imported.field.author).toBe('you')
    expect(imported.cards[0].id).toBe('cnew2')
    expect(imported.cards[0].boardId).toBe('bnew1')
    expect(imported.connections[0]).toMatchObject({
      id: 'cnnew3',
      from: 'cnew2',
      to: 'cnew2',
    })
    expect(imported.sections[0]).toMatchObject({ id: 'snew4', boardId: 'bnew1' })
  })

  it('rejects unsupported and inconsistent files', () => {
    expect(() => validateFieldBackup({ format: 'other', version: 1 })).toThrow()
    expect(() => validateFieldBackup({
      format: 'staticfield',
      version: 1,
      field,
      cards: [],
      sections: [],
      connections: [{ id: 'x', from: 'missing', to: 'missing' }],
    })).toThrow('invalid connection')
  })
})
