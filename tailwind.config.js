/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ss: {
          bg:       '#f5f2ed',
          surface:  '#efece6',
          border:   '#e0dcd4',
          muted:    '#d4cfc7',
          ink:      '#1a1814',
          dim:      '#6b6660',
          ghost:    '#9e9890',
          accent:   '#7a8c3c',
          accentBg: '#eef1e0',
        }
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
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
