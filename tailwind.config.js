/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        header: '80px',
        sidebar: '292px'
      }
    }
  },
  plugins: []
};
