/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // if using src directory
  ],
  theme: {
    extend: {
      fontFamily: {
        'marck-script': ['var(--font-marck-script)', 'cursive'],
      },
    },
  },
  plugins: [],
}