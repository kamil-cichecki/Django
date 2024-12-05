/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        theme: '#101414',
        col1: '#008080',
        col2: '#a08cc4',
      },
      boxShadow: {
        '3xl': '0px 0px 100px -15px rgba(0.3, 0.3, 0.3, 0.3)',
      },
    },
  },
  plugins: [],
};
