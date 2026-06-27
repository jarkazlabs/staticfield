// discovery.js — Kuratierte Discovery-Inhalte für den Explore-Feed

export const discoverySections = [
  {
    id: 'trending',
    label: 'Trending Signals',
    description: 'What the community is collecting right now.',
  },
  {
    id: 'ambient',
    label: 'Ambient Systems',
    description: 'Generative, slow, infinite.',
  },
  {
    id: 'tape',
    label: 'Tape & Texture',
    description: 'Magnetic hiss, oxide, drift.',
  },
  {
    id: 'forest',
    label: 'Forest Archives',
    description: 'Contact mics, bark, frozen soil.',
  },
  {
    id: 'latenight',
    label: 'Late Night Fields',
    description: 'Sessions after midnight.',
  },
  {
    id: 'modular',
    label: 'Modular Brutalism',
    description: 'Instability by design.',
  },
  {
    id: 'field',
    label: 'Field Recording Studies',
    description: 'The world as instrument.',
  },
  {
    id: 'vhs',
    label: 'VHS Artifacts',
    description: 'Glitch, noise, memory.',
  },
]

// Kuratierte Signal-Cards für den Feed
export const discoveryCards = [
  // Trending
  { id: 'd01', section: 'trending', size: 'large', type: 'image', title: 'Fog Layer, 04:17', description: 'A single long take through morning fog.', tags: ['ambient', 'texture'], imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75', hasAudio: true, audioType: 'ambient' },
  { id: 'd02', section: 'trending', size: 'small', type: 'note', title: 'On silence', description: 'The most interesting space in a patch is what you remove.', tags: ['philosophy'] },
  { id: 'd03', section: 'trending', size: 'small', type: 'image', title: 'Reels in Storage', description: 'Tape oxide. 7.5 ips.', tags: ['tape'], imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=75', hasAudio: true, audioType: 'tape' },
  { id: 'd04', section: 'trending', size: 'medium', type: 'image', title: 'Case #4, 2024', description: '9U 84hp. Buchla philosophy in Eurorack.', tags: ['eurorack'], imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=75' },

  // Ambient
  { id: 'd05', section: 'ambient', size: 'medium', type: 'image', title: 'Slow Drift, Patch 003', description: 'Rings into Clouds, sequenced by Marbles.', tags: ['generative', 'drone'], imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&q=75', hasAudio: true, audioType: 'drone' },
  { id: 'd06', section: 'ambient', size: 'large', type: 'image', title: 'Mountain Pass', description: 'Recorded at 2400m. Wind, ice, silence.', tags: ['field-recording', 'environment'], imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=75', hasAudio: true, audioType: 'wind' },
  { id: 'd07', section: 'ambient', size: 'small', type: 'note', title: 'Feedback as texture', description: 'Controlled instability is not noise. It is weather.', tags: ['process'] },

  // Tape
  { id: 'd08', section: 'tape', size: 'large', type: 'image', title: 'Cassette Wall', description: 'Every tape holds a different version of the same room.', tags: ['tape', 'archive'], imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=75', hasAudio: true, audioType: 'tape' },
  { id: 'd09', section: 'tape', size: 'small', type: 'note', title: 'Speed variation', description: '3.75 ips. The pitch drops. Time stretches. Memory softens.', tags: ['tape', 'process'] },
  { id: 'd10', section: 'tape', size: 'medium', type: 'image', title: 'Tascam 4-Track', description: 'Still the most tactile recording device made.', tags: ['gear', 'tape'], imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=75', hasAudio: true, audioType: 'hiss' },

  // Forest
  { id: 'd11', section: 'forest', size: 'large', type: 'image', title: 'Dawn Chorus, May', description: 'DPA 4060 binaural. 47 minutes. No edits.', tags: ['field-recording', 'nature'], imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=75', hasAudio: true, audioType: 'nature' },
  { id: 'd12', section: 'forest', size: 'small', type: 'note', title: 'Bark contact session', description: 'The tree is an amplifier. The root system is the reverb.', tags: ['contact-mic'] },
  { id: 'd13', section: 'forest', size: 'medium', type: 'image', title: 'Winter Silence', description: '-18°C. Snow absorbs everything above 2kHz.', tags: ['field-recording', 'winter'], imageUrl: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=600&q=75' },

  // Late Night
  { id: 'd14', section: 'latenight', size: 'medium', type: 'image', title: 'Studio at 3am', description: 'The patch makes decisions you would not make awake.', tags: ['eurorack', 'process'], imageUrl: 'https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=600&q=75', hasAudio: true, audioType: 'drone' },
  { id: 'd15', section: 'latenight', size: 'small', type: 'note', title: 'Rule of 3am', description: 'Never delete a patch before sunrise.', tags: ['philosophy'] },
  { id: 'd16', section: 'latenight', size: 'large', type: 'image', title: 'Modular Session', description: '14 modules. One voice. Four hours.', tags: ['modular', 'ambient'], imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=75', hasAudio: true, audioType: 'ambient' },

  // Modular
  { id: 'd17', section: 'modular', size: 'large', type: 'image', title: 'Feedback Network', description: 'Three oscillators. No filter. Pure self-oscillation.', tags: ['feedback', 'experimental'], imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=75', hasAudio: true, audioType: 'noise' },
  { id: 'd18', section: 'modular', size: 'small', type: 'note', title: 'West Coast logic', description: 'You do not play notes. You cultivate conditions.', tags: ['philosophy', 'modular'] },
  { id: 'd19', section: 'modular', size: 'medium', type: 'image', title: 'Buchla Influence', description: 'Function generators. Timbre. Complexity as material.', tags: ['buchla', 'history'], imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=75' },

  // Field
  { id: 'd20', section: 'field', size: 'medium', type: 'image', title: 'Hydrophone Session', description: 'Underwater contact mic. A river in January.', tags: ['hydrophone', 'water'], imageUrl: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?w=600&q=75', hasAudio: true, audioType: 'water' },
  { id: 'd21', section: 'field', size: 'large', type: 'image', title: 'Train Station, 6am', description: 'The acoustics change before the first train arrives.', tags: ['urban', 'field-recording'], imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=75', hasAudio: true, audioType: 'ambient' },
  { id: 'd22', section: 'field', size: 'small', type: 'note', title: 'Metadata matters', description: 'GPS. Humidity. Wind direction. Temperature. All of it.', tags: ['workflow', 'field-recording'] },

  // VHS
  { id: 'd23', section: 'vhs', size: 'large', type: 'image', title: 'VHS Color Bleed', description: 'Chroma noise. Luma separation. The failure is the aesthetic.', tags: ['vhs', 'analog', 'texture'], imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75' },
  { id: 'd24', section: 'vhs', size: 'small', type: 'note', title: 'Tracking errors', description: 'The tape remembers what the signal forgot.', tags: ['vhs', 'philosophy'] },
  { id: 'd25', section: 'vhs', size: 'medium', type: 'image', title: 'Lo-fi palette', description: 'Blown out highlights. Crushed blacks. Warmth.', tags: ['vhs', 'color', 'texture'], imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=75', hasAudio: true, audioType: 'hiss' },
]

// Board-Collage Elemente — mehrere Items pro Board
export const boardCollages = {
  b01: {
    images: [
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&q=70',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=70',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=70',
    ],
    notes: ['Slow Drift', 'Rings → Clouds', '23 min'],
    hasAudio: true, audioType: 'drone',
  },
  b02: {
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=70',
      'https://images.unsplash.com/photo-1574169208507-84376144848b?w=300&q=70',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70',
    ],
    notes: ['7.5 ips', 'oxide', 'hiss'],
    hasAudio: true, audioType: 'tape',
  },
  b03: {
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=70',
      'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=300&q=70',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=70',
    ],
    notes: ['DPA 4060', 'dawn chorus', 'bark'],
    hasAudio: true, audioType: 'nature',
  },
  b04: {
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=70',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=70',
    ],
    notes: ['TX81Z', '4-op FM', 'cold'],
    hasAudio: true, audioType: 'drone',
  },
  b06: {
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=70',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=70',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=70',
    ],
    notes: ['OS 2.0', 'USB audio', 'autochop'],
    hasAudio: true, audioType: 'tape',
  },
}
