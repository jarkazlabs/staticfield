import { describe, expect, it } from 'vitest'
import {
  buildConnectionPath,
  findBestAnchors,
  getCanvasSize,
  getCardAnchors,
} from './canvasGeometry.js'

const card = {
  id: 'a',
  position: { x: 100, y: 50 },
  width: 200,
  height: 100,
}

describe('canvas geometry', () => {
  it('uses measured card height for anchor points', () => {
    expect(getCardAnchors(card, 160)).toEqual({
      top: { x: 200, y: 50 },
      bottom: { x: 200, y: 210 },
      left: { x: 100, y: 130 },
      right: { x: 300, y: 130 },
    })
  })

  it('selects the nearest pair of card sides', () => {
    const target = {
      id: 'b',
      position: { x: 500, y: 50 },
      width: 200,
      height: 100,
    }
    const result = findBestAnchors(card, target)

    expect(result.fromSide).toBe('right')
    expect(result.toSide).toBe('left')
  })

  it('builds stable connection paths and canvas bounds', () => {
    expect(buildConnectionPath(
      { x: 10, y: 20 },
      { x: 100, y: 20 },
      'right',
      'left',
    )).toBe('M10,20 C60,20 50,20 100,20')

    expect(getCanvasSize([])).toEqual({ width: 1600, height: 1000 })
    expect(getCanvasSize([{
      id: 'large',
      position: { x: 1500, y: 900 },
      width: 400,
    }], { large: 300 })).toEqual({ width: 2100, height: 1400 })
  })
})

