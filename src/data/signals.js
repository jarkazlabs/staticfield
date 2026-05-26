// signals.js — Demo-Daten (read-only Startdaten)
// Eigene Boards/Cards werden in localStorage gespeichert

export const DEMO_BOARDS = [
  {
    id: 'b01', title: 'Late Night Eurorack',
    description: 'Patches, references and notes from sessions after midnight.',
    tags: ['eurorack', 'modular', 'ambient'],
    author: 'jarkazmusic',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=75',
    followers: 124, isDemo: true,
  },
  {
    id: 'b02', title: 'Tape Decay',
    description: 'Cassette aesthetics, reel-to-reel worship and the beauty of magnetic noise.',
    tags: ['tape', 'analog', 'lo-fi'],
    author: 'field_ghost',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75',
    followers: 87, isDemo: true,
  },
  {
    id: 'b03', title: 'Forest Signal',
    description: 'Field recording sessions. Contact mics. The world as instrument.',
    tags: ['field-recording', 'nature', 'texture'],
    author: 'ascetic',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=75',
    followers: 211, isDemo: true,
  },
  {
    id: 'b04', title: 'Cold FM',
    description: 'FM synthesis in its most clinical, crystalline form.',
    tags: ['fm', 'synthesis', 'yamaha'],
    author: 'modularmind',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=75',
    followers: 63, isDemo: true,
  },
  {
    id: 'b05', title: 'Bastl Kalimba',
    description: 'Exploring the Bastl Instruments Kalimba — a tiny digital instrument with a huge sonic character. Notes, patches, references and process.',
    tags: ['bastl', 'kalimba', 'digital', 'experimental'],
    author: 'jarkazmusic',
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=75',
    followers: 41, isDemo: true,
  },
]

export const DEMO_CARDS = [
  // ── b01: Late Night Eurorack ──────────────────────────
  { id: 'c01', type: 'image', boardId: 'b01', title: 'Fog Layer, 04:17', description: 'A single long take through morning fog.', tags: ['ambient','texture'], source: 'Personal Archive', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75', position: { x: 60, y: 80 } },
  { id: 'c02', type: 'note', boardId: 'b01', title: 'On silence', description: 'The most interesting space in a patch is what you remove. Silence is not absence.', tags: ['philosophy'], position: { x: 380, y: 60 } },
  { id: 'c03', type: 'chain', boardId: 'b01', title: 'Reverb Chain', description: 'Long tail, pre-delay 40ms.', tags: ['signal-chain'], chain: ['Clouds','→','Erbe-Verb','→','Spring Tank'], position: { x: 680, y: 140 } },
  { id: 'c03b', type: 'pattern', boardId: 'b01', title: 'Chord sketch', notes: 'C4 Eb4 G4 — G4 C5', bpm: '72', scale: 'C minor', description: 'slow movement', tags: ['pattern'], position: { x: 900, y: 60 } },
  { id: 'c04', type: 'link', boardId: 'b01', title: 'ModWiggler Thread', description: 'Designing with space — minimal patches that breathe', url: 'https://modwiggler.com', tags: ['community'], position: { x: 200, y: 320 } },

  // ── b02: Tape Decay ───────────────────────────────────
  { id: 'c07', type: 'image', boardId: 'b02', title: 'Reels in Storage', description: 'Tape oxide. 7.5 ips. The hiss is the memory.', tags: ['tape','analog'], imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=75', position: { x: 60, y: 80 } },
  { id: 'c08', type: 'note', boardId: 'b02', title: 'Tape as instrument', description: 'The machine does not just record — it colors, compresses, saturates.', tags: ['process'], position: { x: 380, y: 120 } },

  // ── b03: Forest Signal ────────────────────────────────
  { id: 'c10', type: 'image', boardId: 'b03', title: 'Contact Mic Session #7', description: 'Bark, root system, frozen soil.', tags: ['field-recording'], imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75', position: { x: 100, y: 80 } },
  { id: 'c11', type: 'link', boardId: 'b03', title: 'British Library Sound Archive', description: 'Over 3.5 million recordings. Free access online.', url: 'https://sounds.bl.uk', tags: ['archive'], position: { x: 420, y: 160 } },

  // ── b04: Cold FM ──────────────────────────────────────
  { id: 'c13', type: 'note', boardId: 'b04', title: 'FM notes', description: 'Do not fight the coldness of FM. Lean into it.', tags: ['fm','process'], position: { x: 80, y: 100 } },
  { id: 'c14', type: 'chain', boardId: 'b04', title: 'FM into Space', description: 'Hard algorithms into infinite reverb.', tags: ['fm'], chain: ['TX81Z','→','OTO Boum','→','BigSky'], position: { x: 380, y: 180 } },

  // ── b05: Bastl Kalimba ────────────────────────────────

  {
    id: 'k01', type: 'note', boardId: 'b05',
    title: 'First session',
    description: 'Got it today. Tiny thing. Holds like a soap bar. But the sound — metallic, slightly detuned, somehow alive. The default patch does something with the touch sensitivity that feels almost wrong. In a good way.\n\nNote to self: don\'t clean it up too fast. The roughness is the point.',
    tint: 'paper',
    tags: ['process', 'first-impression'],
    position: { x: 60, y: 60 },
  },
  {
    id: 'k02', type: 'link', boardId: 'b05',
    title: 'Bastl Instruments — Kalimba',
    description: 'Official product page. The firmware section is worth reading — multiple modes I haven\'t tried yet.',
    url: 'https://bastl-instruments.com/instruments/kalimba',
    tags: ['reference', 'official'],
    position: { x: 380, y: 40 },
  },
  {
    id: 'k03', type: 'image', boardId: 'b05',
    title: 'Studio desk, morning',
    description: 'Kalimba next to the coffee. Best combination.',
    imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&q=75',
    tags: ['studio', 'photo'],
    position: { x: 700, y: 30 },
  },
  {
    id: 'k04', type: 'chain', boardId: 'b05',
    title: 'Live rig #1',
    description: 'Running the Kalimba into Strega for extra weirdness, then into Clouds for texture. The Strega adds warmth and unpredictability.',
    chain: ['Kalimba', '→', 'Strega', '→', 'Clouds', '→', 'Mixer'],
    tint: 'amber',
    tags: ['signal-chain', 'live'],
    position: { x: 60, y: 320 },
  },
  {
    id: 'k05', type: 'pattern', boardId: 'b05',
    title: 'Opening phrase',
    notes: 'E4 — G4 A4 — A4 E5 D5',
    bpm: '64',
    scale: 'E pentatonic',
    description: 'Works best when played slow. Leave space between the A4 and E5 — that gap is the phrase.',
    tags: ['melody', 'pattern'],
    position: { x: 420, y: 280 },
  },
  {
    id: 'k06', type: 'note', boardId: 'b05',
    title: 'Touch technique',
    description: 'The Kalimba responds to velocity AND duration. Short taps = clean attack. Slow press = smeared, almost bowed quality.\n\nTry holding a note while playing another. The interference is beautiful.',
    tint: 'sage',
    tags: ['technique'],
    position: { x: 720, y: 280 },
  },
  {
    id: 'k07', type: 'link', boardId: 'b05',
    title: 'Lines thread — Bastl Kalimba patches',
    description: 'llllllll.co community sharing custom patches and firmware notes. Some real gems in here.',
    url: 'https://llllllll.co',
    tags: ['community', 'patches'],
    position: { x: 60, y: 560 },
  },
  {
    id: 'k08', type: 'image', boardId: 'b05',
    title: 'Bastl aesthetic',
    description: 'The hardware language — raw, functional, almost brutalist. Reminds me of Soviet scientific equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75',
    tags: ['aesthetic', 'reference'],
    position: { x: 370, y: 500 },
  },
  {
    id: 'k09', type: 'note', boardId: 'b05',
    title: 'Ideas to try',
    description: '— Run into contact mic preamp reversed\n— Layer with bowed cymbal\n— Try in a reverb tank\n— Record just the mechanical click of the keys\n— Tune to match the room resonance',
    tint: 'slate',
    tags: ['ideas', 'todo'],
    position: { x: 700, y: 520 },
  },
  {
    id: 'k10', type: 'chain', boardId: 'b05',
    title: 'Minimal setup',
    description: 'Just the Kalimba, a small reverb, and silence. No processing. The space between notes matters more.',
    chain: ['Kalimba', '→', 'Microcosm', '→', 'Interface'],
    tags: ['signal-chain', 'minimal'],
    position: { x: 380, y: 750 },
  },
  {
    id: 'k11', type: 'pattern', boardId: 'b05',
    title: 'Night phrase',
    notes: 'A3 C4 — E4 — C4 A3 —',
    bpm: '52',
    scale: 'A natural minor',
    description: 'For late sessions. Don\'t rush the pauses.',
    tags: ['melody', 'ambient'],
    position: { x: 720, y: 750 },
  },
]

export const DEMO_CONNECTIONS = [
  { id: 'cn01', from: 'c01', to: 'c02' },
  { id: 'cn02', from: 'c02', to: 'c03' },
  { id: 'cn03', from: 'c07', to: 'c08' },
  { id: 'cn04', from: 'c10', to: 'c11' },
  { id: 'cn05', from: 'c13', to: 'c14' },
  { id: 'cn10', from: 'k01', to: 'k02' },
  { id: 'cn11', from: 'k01', to: 'k04' },
  { id: 'cn12', from: 'k02', to: 'k03' },
  { id: 'cn13', from: 'k04', to: 'k05' },
  { id: 'cn14', from: 'k05', to: 'k06' },
  { id: 'cn15', from: 'k06', to: 'k09' },
  { id: 'cn16', from: 'k07', to: 'k08' },
  { id: 'cn17', from: 'k04', to: 'k10' },
  { id: 'cn18', from: 'k10', to: 'k11' },
]

export const curatedStrips = [
  { id: 'b05', label: 'Bastl Kalimba',       count: 11, imageUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=75' },
  { id: 'b03', label: 'Forest Signals',      count: 23, imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=75' },
  { id: 'b02', label: 'Tape Decay',          count: 31, imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75' },
  { id: 'b04', label: 'Cold FM',             count: 18, imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=75' },
  { id: 'b01', label: 'Late Night Eurorack', count: 19, imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=75' },
]
