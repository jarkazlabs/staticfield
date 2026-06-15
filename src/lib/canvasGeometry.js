export const CARD_WIDTH_DEFAULT = 250
export const CARD_HEIGHT_DEFAULT = 120

export function getCardAnchors(card, measuredHeight) {
  const width = card.width || CARD_WIDTH_DEFAULT
  const height = measuredHeight || card.height || CARD_HEIGHT_DEFAULT
  const { x, y } = card.position

  return {
    top: { x: x + width / 2, y },
    bottom: { x: x + width / 2, y: y + height },
    left: { x, y: y + height / 2 },
    right: { x: x + width, y: y + height / 2 },
  }
}

export function findBestAnchors(fromCard, toCard, heights = {}) {
  const fromAnchors = getCardAnchors(fromCard, heights[fromCard.id])
  const toAnchors = getCardAnchors(toCard, heights[toCard.id])
  let best = null
  let bestDistance = Infinity

  for (const [fromSide, from] of Object.entries(fromAnchors)) {
    for (const [toSide, to] of Object.entries(toAnchors)) {
      const distance = Math.hypot(from.x - to.x, from.y - to.y)
      if (distance < bestDistance) {
        bestDistance = distance
        best = { from, to, fromSide, toSide }
      }
    }
  }

  return best
}

export function buildConnectionPath(from, to, fromSide, toSide) {
  const tension = Math.max(
    50,
    Math.min(Math.abs(to.x - from.x), Math.abs(to.y - from.y)) * 0.5 + 50,
  )
  const offsets = {
    top: [0, -tension],
    bottom: [0, tension],
    left: [-tension, 0],
    right: [tension, 0],
  }
  const [fromX, fromY] = offsets[fromSide] || [tension, 0]
  const [toX, toY] = offsets[toSide] || [-tension, 0]

  return `M${from.x},${from.y} C${from.x + fromX},${from.y + fromY} ${to.x + toX},${to.y + toY} ${to.x},${to.y}`
}

export function getCanvasSize(cards, heights = {}) {
  return {
    width: Math.max(
      1600,
      ...cards.map(card => card.position.x + (card.width || CARD_WIDTH_DEFAULT) + 200),
      100,
    ),
    height: Math.max(
      1000,
      ...cards.map(card => card.position.y + (heights[card.id] || 300) + 200),
      100,
    ),
  }
}

