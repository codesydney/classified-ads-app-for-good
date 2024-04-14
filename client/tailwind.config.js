/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit-minmax': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [require('daisyui')],
  // daisyUI config (optional)
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#FCBF15',
          secondary: '#1E1A19',
          accent: '#666666',
          neutral: '#333E50',
          'base-100': '#FFFFFF',
        },
      },
      'light',
    ],
  },
}
