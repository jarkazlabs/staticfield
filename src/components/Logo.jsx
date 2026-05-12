// Logo.jsx — Nur Wortmarke, keine Vektoren/Pill-Icons
// variant: 'wordmark' (default) | 'full' (mit Dot-Akzent)

export default function Logo({ size = 'md', variant = 'wordmark' }) {
  const fontSizes = { sm: 19, md: 24, lg: 35 }
  const fontSize = fontSizes[size] || fontSizes.md

  return (
    <span
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize,
        fontWeight: 400,
        letterSpacing: '-0.04em',
        color: '#111110',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        lineHeight: 1,
      }}
    >
      {variant === 'full' && (
        <span
          style={{
            display: 'inline-block',
            width: fontSize * 0.45,
            height: fontSize * 0.45,
            borderRadius: '50%',
            backgroundColor: '#D7F205',
            flexShrink: 0,
          }}
        />
      )}
      signalspace
    </span>
  )
}
