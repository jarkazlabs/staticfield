export const BACKUP_FORMAT = 'staticfield'
export const BACKUP_VERSION = 1

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

export function createFieldBackup(field, cards, connections, sections, exportedAt = new Date().toISOString()) {
  const fieldCards = cards.filter(card => card.boardId === field.id)
  const cardIds = new Set(fieldCards.map(card => card.id))

  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt,
    field: clone(field),
    cards: clone(fieldCards),
    connections: clone(connections.filter(connection =>
      cardIds.has(connection.from) && cardIds.has(connection.to)
    )),
    sections: clone(sections.filter(section => section.boardId === field.id)),
  }
}

export function validateFieldBackup(value) {
  if (!isObject(value)) throw new Error('The selected file is not a valid staticfield backup.')
  if (value.format !== BACKUP_FORMAT) throw new Error('This file is not a staticfield backup.')
  if (value.version !== BACKUP_VERSION) {
    throw new Error(`Backup version ${value.version ?? 'unknown'} is not supported.`)
  }
  if (!isObject(value.field) || typeof value.field.id !== 'string' || typeof value.field.title !== 'string') {
    throw new Error('The backup contains an invalid field.')
  }
  if (!Array.isArray(value.cards) || !Array.isArray(value.connections) || !Array.isArray(value.sections)) {
    throw new Error('The backup is incomplete.')
  }
  if (value.cards.length > 5000 || value.connections.length > 10000 || value.sections.length > 1000) {
    throw new Error('The backup is too large to import safely.')
  }

  const cardIds = new Set()
  for (const card of value.cards) {
    if (!isObject(card) || typeof card.id !== 'string' || typeof card.type !== 'string') {
      throw new Error('The backup contains an invalid signal.')
    }
    if (cardIds.has(card.id)) throw new Error('The backup contains duplicate signal IDs.')
    cardIds.add(card.id)
  }

  for (const connection of value.connections) {
    if (!isObject(connection) || !cardIds.has(connection.from) || !cardIds.has(connection.to)) {
      throw new Error('The backup contains an invalid connection.')
    }
  }

  for (const section of value.sections) {
    if (!isObject(section) || typeof section.id !== 'string') {
      throw new Error('The backup contains an invalid section.')
    }
  }

  return value
}

export function prepareImportedField(value, createId) {
  const backup = validateFieldBackup(value)
  const boardId = `b${createId()}`
  const cardIdMap = new Map(backup.cards.map(card => [card.id, `c${createId()}`]))

  return {
    field: {
      ...clone(backup.field),
      id: boardId,
      author: 'you',
      followers: 0,
      isDemo: false,
    },
    cards: backup.cards.map(card => ({
      ...clone(card),
      id: cardIdMap.get(card.id),
      boardId,
    })),
    connections: backup.connections.map(connection => ({
      ...clone(connection),
      id: `cn${createId()}`,
      from: cardIdMap.get(connection.from),
      to: cardIdMap.get(connection.to),
    })),
    sections: backup.sections.map(section => ({
      ...clone(section),
      id: `s${createId()}`,
      boardId,
    })),
  }
}

export function backupFilename(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return `${slug || 'field'}.staticfield.json`
}

export function downloadFieldBackup(backup) {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = backupFilename(backup.field.title)
  link.click()
  URL.revokeObjectURL(url)
}

