import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
  content: ['./src/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        highlight: '#FEFEFE',
        'base-text': '#999999',
        'focus-state': '#393E3F',
        'hover-state': '#292929',
        'base-bg': '#090B0D'
      }
    }
  },
  plugins: [forms]
}

export default config
