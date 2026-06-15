import { describe, expect, it, vi } from 'vitest'
import { parseLocation, parsePath, toPath } from './routing.js'

describe('routing', () => {
  it('parses known application paths', () => {
    expect(parsePath('')).toEqual({ page: 'landing', fieldId: null })
    expect(parsePath('/fields/')).toEqual({ page: 'fields', fieldId: null })
    expect(parsePath('field/b01')).toEqual({ page: 'field-detail', fieldId: 'b01' })
    expect(parsePath('field/')).toEqual({ page: 'fields', fieldId: null })
  })

  it('builds field URLs only with a valid field id', () => {
    expect(toPath('field-detail', 'b01')).toBe('/staticfield/field/b01')
    expect(toPath('field-detail', null)).toBe('/staticfield/fields')
    expect(toPath('field-detail', 'null')).toBe('/staticfield/fields')
  })

  it('resolves the GitHub Pages redirect format', () => {
    const replaceState = vi.fn()
    const result = parseLocation(
      { pathname: '/staticfield/', search: '?p=%2Ffield%2Fb05' },
      { replaceState },
    )

    expect(result).toEqual({ page: 'field-detail', fieldId: 'b05' })
    expect(replaceState).toHaveBeenCalledWith(null, '', '/staticfield/field/b05')
  })
})

