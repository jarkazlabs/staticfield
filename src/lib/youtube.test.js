import { describe, expect, it } from 'vitest'
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl, getYouTubeVideoId } from './youtube.js'

describe('youtube helpers', () => {
  it('extracts ids from common YouTube URLs', () => {
    expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ?t=12')).toBe('dQw4w9WgXcQ')
    expect(getYouTubeVideoId('https://youtube.com/shorts/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    expect(getYouTubeVideoId('youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
  })

  it('builds a muted autoplay embed for focus previews', () => {
    const embed = getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { autoplay: true })

    expect(embed).toContain('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?')
    expect(embed).toContain('autoplay=1')
    expect(embed).toContain('mute=1')
  })

  it('builds a stable thumbnail URL', () => {
    expect(getYouTubeThumbnailUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(
      'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
    )
  })

  it('ignores unsupported URLs', () => {
    expect(getYouTubeVideoId('https://example.com/watch?v=dQw4w9WgXcQ')).toBe(null)
    expect(getYouTubeEmbedUrl('')).toBe(null)
    expect(getYouTubeThumbnailUrl('')).toBe(null)
  })
})
