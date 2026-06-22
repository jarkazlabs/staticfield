export function getYouTubeVideoId(url = '') {
  const value = url.trim()
  if (!value) return null

  try {
    const parsed = new URL(value.startsWith('http') ? value : `https://${value}`)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      return cleanId(parsed.pathname.split('/').filter(Boolean)[0])
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      if (parsed.pathname === '/watch') return cleanId(parsed.searchParams.get('v'))

      const parts = parsed.pathname.split('/').filter(Boolean)
      if (['embed', 'shorts', 'live'].includes(parts[0])) return cleanId(parts[1])
    }
  } catch {
    return null
  }

  return null
}

function cleanId(value) {
  if (!value) return null
  const match = value.match(/^[a-zA-Z0-9_-]{11}/)
  return match ? match[0] : null
}

export function getYouTubeEmbedUrl(url, { autoplay = false } = {}) {
  const id = getYouTubeVideoId(url)
  if (!id) return null

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })

  if (autoplay) {
    params.set('autoplay', '1')
    params.set('mute', '1')
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}
