// Logo.jsx — "graain" in Google Font "Prompt"
export default function Logo({ size = 'md' }) {
  const fontSizes = { sm: 30, md: 26, lg: 38 }
  const fontSize = fontSizes[size] || fontSizes.md

  return (
    <span style={{
      fontFamily: '"Prompt", system-ui, sans-serif',
      fontSize,
      fontWeight: 400,
      fontStyle: 'italic',
      letterSpacing: '-0.02em',
      color: '#111110',
      lineHeight: 1,
    }}>
      graain
    </span>
  )
}
