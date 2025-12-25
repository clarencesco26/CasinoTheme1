/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-green': '#4ADE80',
        'deep-charcoal': '#121212',
        'soft-black': '#1C1C1C',
        'pure-white': '#FFFFFF',
        'muted-grey': '#A1A1AA',
        // Semantic aliases
        'primary': '#4ADE80',
        'background': '#121212',
        'surface': '#1C1C1C',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA',
      },
    },
  },
  plugins: [],
}
