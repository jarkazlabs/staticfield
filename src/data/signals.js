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
]

export const DEMO_CARDS = [
  { id: 'c01', type: 'image', boardId: 'b01', title: 'Fog Layer, 04:17', description: 'A single long take through morning fog.', tags: ['ambient','texture'], source: 'Personal Archive', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75', position: { x: 60, y: 80 } },
  { id: 'c02', type: 'note', boardId: 'b01', title: 'On silence', description: 'The most interesting space in a patch is what you remove. Silence is not absence.', tags: ['philosophy'], position: { x: 380, y: 60 } },
  { id: 'c03', type: 'chain', boardId: 'b01', title: 'Reverb Chain', description: 'Long tail, pre-delay 40ms.', tags: ['signal-chain'], chain: ['Clouds','→','Erbe-Verb','→','Spring Tank'], position: { x: 680, y: 140 } },
  { id: 'c04', type: 'link', boardId: 'b01', title: 'ModWiggler Thread', description: 'Designing with space — minimal patches that breathe', url: 'https://modwiggler.com', tags: ['community'], position: { x: 200, y: 320 } },
  { id: 'c07', type: 'image', boardId: 'b02', title: 'Reels in Storage', description: 'Tape oxide. 7.5 ips. The hiss is the memory.', tags: ['tape','analog'], imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=75', position: { x: 60, y: 80 } },
  { id: 'c08', type: 'note', boardId: 'b02', title: 'Tape as instrument', description: 'The machine does not just record — it colors, compresses, saturates.', tags: ['process'], position: { x: 380, y: 120 } },
  { id: 'c10', type: 'image', boardId: 'b03', title: 'Contact Mic Session #7', description: 'Bark, root system, frozen soil.', tags: ['field-recording'], imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=75', position: { x: 100, y: 80 } },
  { id: 'c11', type: 'link', boardId: 'b03', title: 'British Library Sound Archive', description: 'Over 3.5 million recordings. Free access online.', url: 'https://sounds.bl.uk', tags: ['archive'], position: { x: 420, y: 160 } },
  { id: 'c13', type: 'note', boardId: 'b04', title: 'FM notes', description: 'Do not fight the coldness of FM. Lean into it.', tags: ['fm','process'], position: { x: 80, y: 100 } },
  { id: 'c14', type: 'chain', boardId: 'b04', title: 'FM into Space', description: 'Hard algorithms into infinite reverb.', tags: ['fm'], chain: ['TX81Z','→','OTO Boum','→','BigSky'], position: { x: 380, y: 180 } },
]

export const DEMO_CONNECTIONS = [
  { id: 'cn01', from: 'c01', to: 'c02' },
  { id: 'cn02', from: 'c02', to: 'c03' },
  { id: 'cn03', from: 'c07', to: 'c08' },
  { id: 'cn04', from: 'c10', to: 'c11' },
  { id: 'cn05', from: 'c13', to: 'c14' },
]

export const curatedStrips = [
  { id: 'b03', label: 'Forest Signals',      count: 23, imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=75' },
  { id: 'b02', label: 'Tape Decay',          count: 31, imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=75' },
  { id: 'b04', label: 'Cold FM',             count: 18, imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=75' },
  { id: 'b01', label: 'Late Night Eurorack', count: 19, imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=75' },
]
