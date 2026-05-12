// PedalIcon.jsx — Gitarren-Pedal Icon als SVG
// Basiert auf dem Screenshot: Boss-Pedal-Stil mit 3 Knöpfen oben

export default function PedalIcon({ size = 20, color = '#6b6660' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Haupt-Body */}
      <rect x="2" y="4" width="20" height="22" rx="3.5" stroke={color} strokeWidth="1.5"/>
      {/* Oberer Streifen mit Knöpfen */}
      <rect x="2" y="4" width="20" height="9" rx="3.5" stroke={color} strokeWidth="1.5"/>
      {/* 3 Knöpfe / Potis */}
      <circle cx="7.5" cy="8.5" r="2.2" stroke={color} strokeWidth="1.4"/>
      <circle cx="7.5" cy="8.5" r="0.8" fill={color}/>
      <circle cx="12"  cy="8.5" r="2.2" stroke={color} strokeWidth="1.4"/>
      <circle cx="12"  cy="8.5" r="0.8" fill={color}/>
      <circle cx="16.5" cy="8.5" r="2.2" stroke={color} strokeWidth="1.4"/>
      <circle cx="16.5" cy="8.5" r="0.8" fill={color}/>
      {/* Seiten-Buchsen */}
      <rect x="0" y="14" width="2.5" height="4" rx="1" stroke={color} strokeWidth="1.2"/>
      <rect x="21.5" y="14" width="2.5" height="4" rx="1" stroke={color} strokeWidth="1.2"/>
      {/* Linke Linie (Detail) */}
      <line x1="5.5" y1="16" x2="5.5" y2="21" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      {/* Stomp-Button */}
      <circle cx="12" cy="20" r="3.5" stroke={color} strokeWidth="1.5"/>
      <circle cx="12" cy="20" r="1.8" stroke={color} strokeWidth="1"/>
    </svg>
  )
}
