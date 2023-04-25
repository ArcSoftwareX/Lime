const TOOLBAR_HEIGHT = 50

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{tsx,html}'],
  theme: {
    extend: {
      height: {
        'toolbar': `${TOOLBAR_HEIGHT}px`
      },
      padding: {
        'toolbar': `${TOOLBAR_HEIGHT}px`
      }
    },
  },
  plugins: [],
}

