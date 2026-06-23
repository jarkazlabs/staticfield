// Logo.jsx — graain SVG als img-Tag aus public/
export default function Logo({ size = 'md' }) {
  const widths = { sm: 130, md: 170, lg: 240 }
  const w = widths[size] || widths.md
  // viewBox ist 319x73 → Verhältnis 4.37:1
  const h = Math.round(w / 4.37)

  return (
    <img
      src="/staticfield/staticfield-logo.svg"
      alt="Staticfield"
      width={w}
      height={h}
      style={{ display: 'block' }}
    />
  )
}
