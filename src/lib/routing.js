export const BASE_PATH = '/staticfield'

export function parsePath(path = '') {
  const normalized = path.replace(/^\/+|\/+$/g, '')

  if (!normalized || normalized === 'index.html') {
    return { page: 'landing', fieldId: null }
  }
  if (normalized.startsWith('field/')) {
    const fieldId = normalized.slice('field/'.length)
    return fieldId
      ? { page: 'field-detail', fieldId }
      : { page: 'fields', fieldId: null }
  }
  if (normalized === 'field') return { page: 'fields', fieldId: null }
  if (normalized === 'explore') return { page: 'explore', fieldId: null }
  if (normalized === 'fields') return { page: 'fields', fieldId: null }
  if (normalized === 'manifesto') return { page: 'manifesto', fieldId: null }

  return { page: 'landing', fieldId: null }
}

export function toPath(page, fieldId) {
  if (page === 'landing') return `${BASE_PATH}/`
  if (page === 'explore') return `${BASE_PATH}/explore`
  if (page === 'fields') return `${BASE_PATH}/fields`
  if (page === 'manifesto') return `${BASE_PATH}/manifesto`
  if (page === 'field-detail' && fieldId && fieldId !== 'null') {
    return `${BASE_PATH}/field/${fieldId}`
  }
  if (page === 'field-detail') return `${BASE_PATH}/fields`
  return `${BASE_PATH}/`
}

export function parseLocation(location, history) {
  const search = location.search

  if (search.startsWith('?p=')) {
    const path = decodeURIComponent(search.slice(3)).replace(/^\//, '')
    history.replaceState(null, '', `${BASE_PATH}/${path}`)
    return parsePath(path)
  }

  if (search.startsWith('?/')) {
    const path = search.slice(2)
    history.replaceState(null, '', `${BASE_PATH}/${path}`)
    return parsePath(path)
  }

  const path = location.pathname.startsWith(BASE_PATH)
    ? location.pathname.slice(BASE_PATH.length)
    : location.pathname
  return parsePath(path)
}
