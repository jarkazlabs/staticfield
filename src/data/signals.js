// ─── signals.js — Demo-Daten für Signal Space ─────────────

export const allCards = [
  // Board b01 — Late Night Eurorack
  {
    id: 'c01', type: 'image', boardId: 'b01',
    title: 'Fog Layer, 04:17',
    description: 'A single long take through morning fog. No movement except breath.',
    tags: ['ambient', 'texture', 'dawn'],
    source: 'Personal Archive',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75',
    position: { x: 60,  y: 60  },
  },
  {
    id: 'c02', type: 'audio', boardId: 'b01',
    title: 'Patch 003 — Slow Drift',
    description: 'Mutable Instruments Rings into Clouds, sequenced by Marbles. 23 minutes.',
    tags: ['eurorack', 'generative', 'drone'],
    gear: ['Rings', 'Clouds', 'Marbles'],
    source: 'Late Night Session',
    position: { x: 360, y: 140 },
  },
  {
    id: 'c03', type: 'note', boardId: 'b01',
    title: 'On silence',
    description: 'The most interesting space in a patch is what you remove. Silence is not absence — it is the container everything else lives in.',
    tags: ['philosophy', 'process'],
    source: null,
    position: { x: 660, y: 70  },
  },
  {
    id: 'c04', type: 'gear', boardId: 'b01',
    title: 'Make Noise 0-Coast',
    description: 'Semi-modular. West coast synthesis voice. Perfect entry point or standalone instrument.',
    tags: ['semi-modular', 'west-coast'],
    gear: ['0-Coast'], manufacturer: 'Make Noise', price: '~$499',
    source: 'Gear Notes',
    position: { x: 920, y: 200 },
  },
  {
    id: 'c05', type: 'link', boardId: 'b01',
    title: 'Patchwork — Modular Grid Forum',
    description: 'Thread: "Designing with space — minimal patches that breathe"',
    tags: ['community', 'modular'],
    url: 'https://modwiggler.com',
    source: 'ModWiggler',
    position: { x: 200, y: 320 },
  },
  {
    id: 'c06', type: 'chain', boardId: 'b01',
    title: 'Reverb Chain',
    description: 'Clouds into Erbe-Verb into Spring Tank. Long tail, pre-delay 40ms.',
    tags: ['signal-chain', 'reverb'],
    chain: ['Clouds', '→', 'Erbe-Verb', '→', 'Spring Tank'],
    source: null,
    position: { x: 540, y: 360 },
  },

  // Board b02 — Tape Decay
  {
    id: 'c07', type: 'image', boardId: 'b02',
    title: 'Reels in Storage',
    description: 'Tape oxide. 7.5 ips. The hiss is the memory.',
    tags: ['tape', 'analog', 'texture'],
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=75',
    source: 'Personal Archive',
    position: { x: 60,  y: 80  },
  },
  {
    id: 'c08', type: 'audio', boardId: 'b02',
    title: 'Loop 12 — Warped',
    description: '4-track cassette loop with pitch drift. Recorded at 80% speed.',
    tags: ['tape', 'loop', 'lo-fi'],
    gear: ['Tascam 4-Track'],
    source: 'Tape Sessions Vol.2',
    position: { x: 360, y: 200 },
  },
  {
    id: 'c09', type: 'note', boardId: 'b02',
    title: 'Tape as instrument',
    description: 'The machine does not just record — it colors, compresses, saturates. Artifacts become aesthetics.',
    tags: ['process', 'tape', 'philosophy'],
    source: null,
    position: { x: 660, y: 100 },
  },

  // Board b03 — Forest Signal
  {
    id: 'c10', type: 'image', boardId: 'b03',
    title: 'Contact Mic Session #7',
    description: 'Bark, root system, frozen soil. DPA 4060 + Telinga parabolic.',
    tags: ['field-recording', 'contact-mic', 'nature'],
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75',
    source: 'Forest Sessions',
    position: { x: 100, y: 80  },
  },
  {
    id: 'c11', type: 'gear', boardId: 'b03',
    title: 'Sound Devices MixPre-3 II',
    description: 'Ultra-quiet preamps. 32-bit float. The reference standard for location recording.',
    tags: ['recorder', 'field-recording'],
    gear: ['MixPre-3 II'], manufacturer: 'Sound Devices', price: '~$699',
    source: 'Gear Notes',
    position: { x: 480, y: 160 },
  },
  {
    id: 'c12', type: 'video', boardId: 'b03',
    title: 'Process: Layering Field Recordings',
    description: 'Walkthrough from raw captures to a final 12-minute piece.',
    tags: ['process', 'field-recording', 'tutorial'],
    source: 'YouTube / Chris Watson',
    position: { x: 260, y: 320 },
  },

  // Board b04 — Cold FM
  {
    id: 'c13', type: 'gear', boardId: 'b04',
    title: 'Yamaha TX81Z',
    description: '4-op FM. Cold. Clinical. Inexplicably beautiful. The bass patch alone is worth finding one.',
    tags: ['fm', 'vintage', 'yamaha'],
    gear: ['TX81Z'], manufacturer: 'Yamaha', price: '~$150 used',
    source: 'FM Vault',
    position: { x: 80,  y: 100 },
  },
  {
    id: 'c14', type: 'chain', boardId: 'b04',
    title: 'FM into Space',
    description: 'TX81Z into OTO Boum into Strymon BigSky. Hard algorithms into infinite reverb.',
    tags: ['fm', 'signal-chain', 'reverb'],
    chain: ['TX81Z', '→', 'OTO Boum', '→', 'BigSky'],
    source: null,
    position: { x: 440, y: 200 },
  },
  {
    id: 'c15', type: 'note', boardId: 'b04',
    title: 'FM notes',
    description: 'Do not fight the coldness of FM. Lean into it. Layer it with tape hiss and it becomes intimacy.',
    tags: ['fm', 'process'],
    source: null,
    position: { x: 760, y: 80  },
  },

  // Board b05 — Modular Brutalism
  {
    id: 'c16', type: 'image', boardId: 'b05',
    title: 'Case #4, 2024',
    description: '9U 84hp. No VCAs visible. All logic. Buchla philosophy in Eurorack.',
    tags: ['eurorack', 'modular', 'brutalism'],
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=75',
    source: 'System Archives',
    position: { x: 60,  y: 60  },
  },
  {
    id: 'c17', type: 'audio', boardId: 'b05',
    title: 'Patch 017 — Feedback Structure',
    description: 'Pure feedback between three oscillators. Unstable. 8 minutes of contained chaos.',
    tags: ['feedback', 'noise', 'experimental'],
    gear: ['Plaits', 'Blinds', 'Maths'],
    source: 'Patch Archive',
    position: { x: 380, y: 180 },
  },

  // Board b06 — Field Recording Notes
  {
    id: 'c18', type: 'note', boardId: 'b06',
    title: 'Metadata discipline',
    description: 'Always record GPS, temperature, time of day, microphone placement. Six months later, you will not remember.',
    tags: ['process', 'field-recording', 'workflow'],
    source: null,
    position: { x: 100, y: 80  },
  },
  {
    id: 'c19', type: 'link', boardId: 'b06',
    title: 'British Library Sound Archive',
    description: 'Over 3.5 million recordings. Wildlife, environment, oral history. Free access online.',
    tags: ['archive', 'field-recording', 'resource'],
    url: 'https://sounds.bl.uk',
    source: 'British Library',
    position: { x: 460, y: 120 },
  },
  {
    id: 'c20', type: 'image', boardId: 'b06',
    title: 'Setup, Northern Finland',
    description: 'Setup for winter field recording session. -18°C. Battery life: 40 min.',
    tags: ['field-recording', 'winter', 'documentation'],
    imageUrl: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=600&q=75',
    source: 'Finland Sessions',
    position: { x: 280, y: 300 },
  },
]

export const boards = [
  {
    id: 'b01', title: 'Late Night Eurorack',
    description: 'Patches, references and notes from sessions after midnight.',
    tags: ['eurorack', 'modular', 'ambient'],
    author: 'jarkazmusic',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=75',
    followers: 124,
  },
  {
    id: 'b02', title: 'Tape Decay',
    description: 'Cassette aesthetics, reel-to-reel worship and the beauty of magnetic noise.',
    tags: ['tape', 'analog', 'lo-fi'],
    author: 'field_ghost',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75',
    followers: 87,
  },
  {
    id: 'b03', title: 'Forest Signal',
    description: 'Field recording sessions. Contact mics. The world as instrument.',
    tags: ['field-recording', 'nature', 'texture'],
    author: 'ascetic',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=75',
    followers: 211,
  },
  {
    id: 'b04', title: 'Cold FM',
    description: 'FM synthesis in its most clinical, crystalline form.',
    tags: ['fm', 'synthesis', 'yamaha'],
    author: 'modularmind',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=75',
    followers: 63,
  },
  {
    id: 'b05', title: 'Modular Brutalism',
    description: 'Systems designed for instability. Feedback structures. Unpredictable by design.',
    tags: ['eurorack', 'experimental', 'noise'],
    author: 'voidinstruments',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=75',
    followers: 156,
  },
  {
    id: 'b06', title: 'Field Recording Notes',
    description: 'Methodology, gear and references for capturing the unnoticed world.',
    tags: ['field-recording', 'process', 'documentation'],
    author: 'signal_drift',
    imageUrl: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=800&q=75',
    followers: 98,
  },
]

// Kuratierte Signals für die Landing-Streifen-Ansicht
export const curatedStrips = [
  { id: 'b03', label: 'Forest Signals',     count: 23, imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=75' },
  { id: 'b02', label: 'Tape Decay',         count: 31, imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=75' },
  { id: 'b05', label: 'Modular Brutalism',  count: 18, imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=75' },
  { id: 'b06', label: 'Field Recordings',   count: 27, imageUrl: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=400&q=75' },
  { id: 'b01', label: 'Late Night Eurorack',count: 19, imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=75' },
  { id: 'b04', label: 'Beyond Texture',     count: 22, imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=75' },
]

export const connections = [
  { from: 'c01', to: 'c02' }, { from: 'c02', to: 'c03' },
  { from: 'c02', to: 'c06' }, { from: 'c04', to: 'c06' },
  { from: 'c07', to: 'c08' }, { from: 'c08', to: 'c09' },
  { from: 'c10', to: 'c11' }, { from: 'c10', to: 'c12' },
  { from: 'c13', to: 'c14' }, { from: 'c14', to: 'c15' },
  { from: 'c16', to: 'c17' },
  { from: 'c18', to: 'c20' }, { from: 'c19', to: 'c20' },
]

export function getCardsByBoard(boardId) {
  return allCards.filter(c => c.boardId === boardId)
}
export function getConnectionsByBoard(boardId) {
  const ids = getCardsByBoard(boardId).map(c => c.id)
  return connections.filter(cn => ids.includes(cn.from) && ids.includes(cn.to))
}
