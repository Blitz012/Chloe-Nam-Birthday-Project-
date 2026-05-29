/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Soft pastel-blue scheme
        'bg-light': '#F0F8FF',
        'card-blue': '#BDE0FE',
        'accent-blue': '#A2D2FF',
        'text-dark': '#2B4C7E',
        // gentle secondary pastels for cuteness / variety
        'soft-pink': '#FFC8DD',
        'soft-lav': '#CDB4DB',
        'soft-mint': '#CDEAC0',
      },
      fontFamily: {
        // rounded + bubbly display, soft body, handwritten script accent
        display: ['Fredoka', 'Quicksand', 'sans-serif'],
        body: ['Quicksand', 'Nunito', 'sans-serif'],
        script: ['Pacifico', 'cursive'],
      },
      borderRadius: {
        soft: '16px',
        cute: '24px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 10px 30px -8px rgba(43,76,126,0.25)',
        polaroid: '0 14px 34px -10px rgba(43,76,126,0.35)',
        glass: '0 8px 32px rgba(43,76,126,0.18)',
      },
      keyframes: {
        // gentle, soft motions instead of harsh jitter
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wobble: {
          '0%,100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        driftbg: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.4', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        progressfill: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        wobble: 'wobble 4s ease-in-out infinite',
        driftbg: 'driftbg 14s ease-in-out infinite',
        twinkle: 'twinkle 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
