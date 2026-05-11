// Logo.jsx — Signal Space Wortmarke als SVG-Komponente
// Props: size ('sm' | 'md' | 'lg'), variant ('full' | 'icon')

export default function Logo({ size = 'md', variant = 'full' }) {

  // Skalierungsfaktoren
  const scales = { sm: 0.28, md: 0.38, lg: 0.55 }
  const scale = scales[size] || scales.md

  const iconW = 260  // Breite des Icon-Teils im Original
  const fullW = 820
  const fullH = 180

  if (variant === 'icon') {
    return (
      <svg
        width={Math.round(iconW * scale)}
        height={Math.round(fullH * scale)}
        viewBox={`0 0 ${iconW} ${fullH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <IconPaths />
      </svg>
    )
  }

  return (
    <svg
      width={Math.round(fullW * scale)}
      height={Math.round(fullH * scale)}
      viewBox={`0 0 ${fullW} ${fullH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <IconPaths />
      {/* Wortmarke */}
      <text
        x="300"
        y="128"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="96"
        fontWeight="400"
        fill="black"
        letterSpacing="-4"
      >
        signalspace
      </text>
    </svg>
  )
}

// Icon-Paths separat — wiederverwendbar
function IconPaths() {
  return (
    <>
      {/* Lime Dot */}
      <rect x="20"  y="74"  width="26" height="18" rx="9" fill="#D7F205"/>
      {/* Top Row */}
      <rect x="78"  y="38"  width="40" height="18" rx="9" fill="black"/>
      <rect x="132" y="38"  width="40" height="18" rx="9" fill="black"/>
      {/* Middle Top */}
      <rect x="78"  y="74"  width="40" height="18" rx="9" fill="black"/>
      <rect x="132" y="74"  width="96" height="18" rx="9" fill="black"/>
      {/* Middle Bottom */}
      <rect x="78"  y="110" width="96" height="18" rx="9" fill="black"/>
      <rect x="188" y="110" width="58" height="18" rx="9" fill="black"/>
      {/* Bottom Row */}
      <rect x="78"  y="146" width="40" height="18" rx="9" fill="black"/>
      <rect x="132" y="146" width="40" height="18" rx="9" fill="black"/>
      <rect x="186" y="146" width="40" height="18" rx="9" fill="black"/>
    </>
  )
}
