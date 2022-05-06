module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        fade: 'kfr1 0.2s ease-in-out',
        'fade-l': 'kfr2 0.2s ease-in-out',
        'fade-r': 'kfr3 0.2s ease-in-out',
      },
      keyframes: (_theme) => ({
        kfr1: {
          '0%': { opacity: 0.4, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        kfr2: {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(0px)' },
        },
        kfr3: {
          '0%': { transform: 'translateX(100px)' },
          '100%': { transform: 'translateX(0px)' },
        },
      }),
    },
  },
  plugins: [],
}
