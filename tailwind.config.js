/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: '#831c1d', 50: '#fef2f2', 100: '#fce4e4', 200: '#f9cccb', 300: '#f4a8a7', 400: '#ec7574', 500: '#831c1d', 600: '#6b1516', 700: '#520f10' },
        navy: { DEFAULT: '#1f2937', 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#1f2937', 600: '#111827', 700: '#0f172a' },
        orange: { DEFAULT: '#f37021', 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f37021', 600: '#ea580c', 700: '#c2410c' },
        cream: { DEFAULT: '#f8fafc' },
        slate: { DEFAULT: '#64748b' },
      },
      fontFamily: { mulish: ['Mulish', 'Inter', 'sans-serif'] },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 2px 8px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
        'elevated': '0 20px 40px -12px rgb(0 0 0 / 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
