// AudioPreview.jsx — Minimales Audio-Preview-Widget
// Hover = play, click = toggle. Waveform als SVG.

import { useState, useCallback } from 'react'
import { useAudio } from '../hooks/useAudio.js'

// Statische Waveform-Balken (verschiedene Muster je Typ)
const WAVEFORMS = {
  drone:   [4,7,11,8,14,10,6,12,9,5,13,7,10,8,4,11,6,9,12,5],
  ambient: [3,6,9,5,12,8,4,11,7,5,9,6,10,4,8,13,5,7,11,6],
  tape:    [8,12,7,14,9,11,6,13,8,10,12,5,9,11,7,14,8,10,6,12],
  hiss:    [10,8,12,6,11,9,13,7,10,8,12,6,11,9,7,13,8,10,12,6],
  noise:   [14,6,12,8,10,14,5,11,9,13,7,10,12,6,14,8,9,11,5,12],
  nature:  [3,5,8,6,10,7,4,9,6,8,11,5,7,9,4,8,6,10,7,5],
  wind:    [5,8,11,9,13,10,7,12,8,6,10,9,12,7,11,8,10,13,6,9],
  water:   [6,9,7,11,8,10,6,12,9,7,11,8,10,6,9,12,7,10,8,11],
}

export function MiniWaveform({ audioType = 'ambient', playing = false, color = '#9e9e9a' }) {
  const bars = WAVEFORMS[audioType] || WAVEFORMS.ambient
  return (
    <div className="flex items-center gap-px" style={{ height: 20 }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: h,
            backgroundColor: color,
            borderRadius: 1,
            opacity: playing ? 0.9 : 0.45,
            animation: playing ? `wavePulse ${0.8 + (i % 4) * 0.2}s ease-in-out infinite alternate` : 'none',
            animationDelay: playing ? `${i * 0.04}s` : '0s',
            transition: 'opacity 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}

export default function AudioPreview({ audioType = 'ambient', compact = false }) {
  const [playing, setPlaying] = useState(false)
  const { play, stop } = useAudio()

  const toggle = useCallback((e) => {
    e.stopPropagation()
    if (playing) {
      stop()
      setPlaying(false)
    } else {
      play(audioType)
      setPlaying(true)
      // Auto-reset nach 8s
      setTimeout(() => setPlaying(false), 8000)
    }
  }, [playing, play, stop, audioType])

  if (compact) {
    // Nur ein kleiner Play-Dot für Card-Overlay
    return (
      <button
        onClick={toggle}
        className={`
          flex items-center justify-center rounded-full
          transition-all duration-200
          ${playing
            ? 'bg-ss-accent text-white w-6 h-6'
            : 'bg-white/80 text-ss-dim hover:bg-white w-6 h-6'
          }
        `}
        title={playing ? 'Stop' : 'Preview'}
      >
        <span className="text-2xs leading-none">{playing ? '■' : '▶'}</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      className={`
        flex items-center gap-2 px-2 py-1 rounded
        transition-all duration-200 group
        ${playing ? 'bg-ss-accentBg' : 'hover:bg-ss-surface'}
      `}
      title={playing ? 'Stop preview' : 'Play preview'}
    >
      <span className={`text-2xs leading-none transition-colors ${playing ? 'text-ss-accent' : 'text-ss-ghost group-hover:text-ss-dim'}`}>
        {playing ? '■' : '▶'}
      </span>
      <MiniWaveform audioType={audioType} playing={playing} color={playing ? '#7a8c3c' : '#9e9e9a'} />
    </button>
  )
}
