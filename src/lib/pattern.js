const MAX_STEPS = 8

export function parseNotes(input = '') {
  if (!input.trim()) return []

  return input
    .trim()
    .split(/\s+/)
    .slice(0, MAX_STEPS)
    .map(token => {
      const isPause = token === '—' || token === '-' || token === '_'
      return { token: isPause ? '—' : token, isPause }
    })
}

export { MAX_STEPS }

