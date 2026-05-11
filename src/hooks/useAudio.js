// useAudio.js — Minimales Audio-Preview-System via Web Audio API
// Erzeugt synthetische Klang-Texturen ohne externe Audiodateien.
// Typen: 'ambient' | 'drone' | 'tape' | 'hiss' | 'noise' | 'nature' | 'wind' | 'water'

import { useRef, useCallback } from 'react'

export function useAudio() {
  const ctxRef    = useRef(null)
  const nodesRef  = useRef([])

  function getCtx() {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return ctxRef.current
  }

  const stop = useCallback(() => {
    nodesRef.current.forEach(n => {
      try { n.stop(); n.disconnect() } catch {}
    })
    nodesRef.current = []
  }, [])

  const play = useCallback((audioType = 'ambient') => {
    stop()
    const ctx = getCtx()
    if (ctx.state === 'suspended') ctx.resume()

    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.4)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 8)
    master.connect(ctx.destination)

    const nodes = []

    switch (audioType) {

      case 'drone':
      case 'ambient': {
        // Langsame Drone — zwei verstimmte Oszillatoren + LFO
        [110, 110.3, 220.1].forEach((freq, i) => {
          const osc = ctx.createOscillator()
          osc.type = i === 2 ? 'sine' : 'sawtooth'
          osc.frequency.value = freq
          const g = ctx.createGain()
          g.gain.value = i === 2 ? 0.04 : 0.06
          // Langsames Vibrato
          const lfo = ctx.createOscillator()
          lfo.frequency.value = 0.08 + i * 0.03
          const lfoGain = ctx.createGain()
          lfoGain.gain.value = 0.4
          lfo.connect(lfoGain)
          lfoGain.connect(osc.frequency)
          lfo.start()
          osc.connect(g)
          g.connect(master)
          osc.start()
          nodes.push(osc, lfo)
        })
        break
      }

      case 'tape':
      case 'hiss': {
        // Band-gefiltertes Rauschen — warmes Tape-Hiss
        const bufSize = ctx.sampleRate * 2
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
        const data = buf.getChannelData(0)
        let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0
        for (let i = 0; i < bufSize; i++) {
          const w = Math.random() * 2 - 1
          b0 = 0.99886*b0 + w*0.0555179; b1 = 0.99332*b1 + w*0.0750759
          b2 = 0.96900*b2 + w*0.1538520; b3 = 0.86650*b3 + w*0.3104856
          b4 = 0.55000*b4 + w*0.5329522; b5 = -0.7616*b5 - w*0.0168980
          data[i] = (b0+b1+b2+b3+b4+b5+b6+w*0.5362) * 0.11
          b6 = w * 0.115926
        }
        const src = ctx.createBufferSource()
        src.buffer = buf
        src.loop = true
        const bpf = ctx.createBiquadFilter()
        bpf.type = 'bandpass'
        bpf.frequency.value = 3200
        bpf.Q.value = 0.4
        src.connect(bpf)
        bpf.connect(master)
        src.start()
        nodes.push(src)
        break
      }

      case 'noise': {
        // Weißes Rauschen, hochpass — experimental texture
        const bufSize = ctx.sampleRate
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
        const data = buf.getChannelData(0)
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1
        const src = ctx.createBufferSource()
        src.buffer = buf; src.loop = true
        const hpf = ctx.createBiquadFilter()
        hpf.type = 'highpass'; hpf.frequency.value = 800
        src.connect(hpf); hpf.connect(master)
        src.start(); nodes.push(src)
        break
      }

      case 'nature': {
        // Gefilterte pinke Rauschwolken — Natur-Atmosphäre
        const bufSize = ctx.sampleRate * 3
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
        const data = buf.getChannelData(0)
        let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0
        for (let i = 0; i < bufSize; i++) {
          const w = Math.random() * 2 - 1
          b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759
          b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856
          b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980
          data[i] = (b0+b1+b2+b3+b4+b5+w*0.115926) * 0.14
        }
        const src = ctx.createBufferSource()
        src.buffer = buf; src.loop = true
        const lpf = ctx.createBiquadFilter()
        lpf.type = 'lowpass'; lpf.frequency.value = 1800
        src.connect(lpf); lpf.connect(master)
        src.start(); nodes.push(src)
        // Zirp-artige Obertöne
        const osc = ctx.createOscillator()
        osc.type = 'sine'; osc.frequency.value = 3200
        const g = ctx.createGain(); g.gain.value = 0.008
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.3
        const lg = ctx.createGain(); lg.gain.value = 800
        lfo.connect(lg); lg.connect(osc.frequency)
        osc.connect(g); g.connect(master)
        lfo.start(); osc.start(); nodes.push(src, osc, lfo)
        break
      }

      case 'wind': {
        // Gefilterte Rauschwelle mit Amplitudenmodulation — Wind
        const bufSize = ctx.sampleRate * 2
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
        const data = buf.getChannelData(0)
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1
        const src = ctx.createBufferSource()
        src.buffer = buf; src.loop = true
        const bpf = ctx.createBiquadFilter()
        bpf.type = 'bandpass'; bpf.frequency.value = 400; bpf.Q.value = 0.8
        const tremolo = ctx.createGain(); tremolo.gain.value = 0.5
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.15
        const lg = ctx.createGain(); lg.gain.value = 0.4
        lfo.connect(lg); lg.connect(tremolo.gain)
        src.connect(bpf); bpf.connect(tremolo); tremolo.connect(master)
        src.start(); lfo.start(); nodes.push(src, lfo)
        break
      }

      case 'water': {
        // Moduliertes pinkes Rauschen — Wasser
        const bufSize = ctx.sampleRate * 2
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
        const data = buf.getChannelData(0)
        let b0=0,b1=0,b2=0
        for (let i = 0; i < bufSize; i++) {
          const w = Math.random() * 2 - 1
          b0=0.99886*b0+w*0.0555179
          b1=0.99332*b1+w*0.0750759
          b2=0.96900*b2+w*0.1538520
          data[i] = (b0+b1+b2) * 0.2
        }
        const src = ctx.createBufferSource()
        src.buffer = buf; src.loop = true
        const lpf = ctx.createBiquadFilter()
        lpf.type = 'lowpass'; lpf.frequency.value = 2400
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.6
        const lg = ctx.createGain(); lg.gain.value = 400
        lfo.connect(lg); lg.connect(lpf.frequency)
        src.connect(lpf); lpf.connect(master)
        src.start(); lfo.start(); nodes.push(src, lfo)
        break
      }

      default:
        break
    }

    nodesRef.current = nodes
    // Auto-stop nach 8 Sekunden
    setTimeout(stop, 8000)
  }, [stop])

  return { play, stop }
}
