/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ss: {
          bg:       '#ffffff',
          surface:  '#f7f7f5',
          border:   '#e8e8e4',
          muted:    '#d4d4ce',
          ink:      '#111110',
          dim:      '#6b6b68',
          ghost:    '#9e9e9a',
          accent:   '#7a8c3c',
          accentBg: '#eef1e0',
        }
      },
      fontFamily: {
        sans:  ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      animation: {
        'fade-in':  'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.55s ease forwards',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
